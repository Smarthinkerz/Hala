import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HalaMark } from "@/components/mark";
import { Button } from "@/components/ui";
import { pollCheckout } from "@/lib/clinics";
import { t } from "@/lib/i18n";
import { useClinic } from "@/lib/store";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

const STORE = "hala.hubCheckout";

export const Route = createFileRoute("/checkout/pending")({
  validateSearch: (s: Record<string, unknown>) => ({
    ref: typeof s.ref === "string" ? s.ref : undefined,
  }),
  component: function Pending() {
    const lang = useClinic((s) => s.uiLang);
    const { ref } = Route.useSearch();
    const { user } = useCurrentUserState();
    const [paid, setPaid] = useState(false);
    const [payUrl, setPayUrl] = useState("");

    useEffect(() => {
      try {
        const raw = sessionStorage.getItem(STORE);
        if (!raw) return;
        const stored = JSON.parse(raw) as { url?: string; reference?: string };
        if (stored.url && (!ref || stored.reference === ref)) setPayUrl(stored.url);
      } catch {
        /* ignore */
      }
    }, [ref]);

    useEffect(() => {
      if (!user) return;
      let alive = true;
      const tick = () => {
        void pollCheckout({ data: { reference: ref } })
          .then((res) => {
            if (alive && res.status === "paid") setPaid(true);
          })
          .catch(() => undefined);
      };
      tick();
      const id = window.setInterval(tick, 2500);
      const onShow = () => {
        if (document.visibilityState === "visible") tick();
      };
      document.addEventListener("visibilitychange", onShow);
      window.addEventListener("focus", onShow);
      return () => {
        alive = false;
        window.clearInterval(id);
        document.removeEventListener("visibilitychange", onShow);
        window.removeEventListener("focus", onShow);
      };
    }, [user, ref]);

    if (paid) return <Navigate to="/checkout/success" search={{ ref }} />;

    return (
      <main className="grid min-h-dvh place-items-center bg-paper px-4 text-ink">
        <div className="w-full max-w-sm space-y-4 text-center">
          <HalaMark className="mx-auto size-12" />
          <h1 className="font-display text-3xl">{t(lang, "checkoutPending")}</h1>
          <p className="text-sm text-ink-soft">{t(lang, "hubPendingLead")}</p>
          {payUrl ? (
            <Button className="w-full" onClick={() => window.open(payUrl, "smarthinkerz-pay")}>
              {t(lang, "reopenPay")}
            </Button>
          ) : null}
          <Link to="/login" search={{ next: "/console" }}>
            <Button className="w-full" variant={payUrl ? "outline" : "primary"}>
              {t(lang, "myDesk")}
            </Button>
          </Link>
        </div>
      </main>
    );
  },
});
