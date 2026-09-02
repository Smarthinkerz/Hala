import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { HalaMark } from "@/components/mark";
import { Button, Field, Input } from "@/components/ui";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { t } from "@/lib/i18n";
import { useClinic } from "@/lib/store";

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): { next?: string; paid?: string } => ({
    next: typeof s.next === "string" ? s.next : undefined,
    paid: typeof s.paid === "string" ? s.paid : undefined,
  }),
  component: Login,
});

function Login() {
  const next = Route.useSearch().next ?? "/console";
  const paid = Route.useSearch().paid === "1";
  const { user, isPending } = useCurrentUserState();
  const lang = useClinic((s) => s.uiLang);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const dir = lang === "ar" ? "rtl" : "ltr";

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({ email, password, name: email.split("@")[0], callbackURL: next });
        if (res.error) throw new Error(res.error.message);
      } else {
        const res = await authClient.signIn.email({ email, password, callbackURL: next });
        if (res.error) throw new Error(res.error.message);
      }
      window.location.href = next.startsWith("/") ? next : "/console";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  if (!isPending && user) return <Navigate to="/console" />;

  return (
    <main dir={dir} lang={lang} className="grid min-h-dvh place-items-center bg-paper px-4 text-ink">
      <div className="w-full max-w-sm space-y-5">
        <Link to="/" className="flex items-center gap-2 text-ink">
          <HalaMark />
          <span className="font-display text-xl">Hala</span>
        </Link>
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-sage">My Desk</p>
          <h1 className="mt-2 font-display text-3xl tracking-tight">
            {paid ? "Payment received." : "Welcome back."}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {paid ? "Sign in to enter the tier you bought." : "Access your Hala clinic workspace."}
          </p>
        </div>
        {authEnabled ? (
          <div className="grid gap-2">
            {GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => void signIn(p.providerId, { callbackURL: next, errorCallbackURL: "/login" })}
              >
                {lang === "ar" ? `المتابعة عبر ${p.label}` : `Continue with ${p.label}`}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
        <p className="text-center text-xs uppercase tracking-widest text-muted">{t(lang, "orContinue")}</p>
        <form onSubmit={(e) => void onEmail(e)} className="grid gap-3">
          <Field label={t(lang, "email")}>
            <Input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label={t(lang, "password")}>
            <Input
              type="password"
              autoComplete={mode === "up" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </Field>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={busy}>
            {mode === "up" ? t(lang, "signUp") : "Sign In"}
          </Button>
          <a className="text-sm text-sage" href={`mailto:support@smarthinkerz.com?subject=Forgot%20Hala%20password`}>
            Forgot your password?
          </a>
          <button type="button" className="text-sm text-sage" onClick={() => setMode(mode === "up" ? "in" : "up")}>
            {mode === "up" ? t(lang, "haveAccount") : t(lang, "needAccount")}
          </button>
        </form>
        <p className="text-sm text-muted">
          Don't have a Hala account?{" "}
          <Link to="/start" className="text-sage">
            Start Your 14 Day Trial
          </Link>
        </p>
      </div>
    </main>
  );
}
