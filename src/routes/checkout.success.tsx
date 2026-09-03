import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { HalaMark } from "@/components/mark";
import { Button } from "@/components/ui";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { confirmCheckout } from "@/lib/clinics";
import { t } from "@/lib/i18n";
import { useClinic } from "@/lib/store";

export const Route = createFileRoute("/checkout/success")({
  validateSearch: (s: Record<string, unknown>) => ({
    ref: typeof s.ref === "string" ? s.ref : undefined,
    tap_id: typeof s.tap_id === "string" ? s.tap_id : undefined,
  }),
  component: function Success() {
    const lang = useClinic((s) => s.uiLang);
    const { ref, tap_id } = Route.useSearch();
    const { user, isPending } = useCurrentUserState();
    const signedIn = Boolean(user);

    useEffect(() => {
      if (!ref && !tap_id) return;
      void confirmCheckout({ data: { reference: ref, chargeId: tap_id, paidHint: true } }).catch(() => undefined);
    }, [ref, tap_id]);

    return (
      <main className="grid min-h-dvh place-items-center bg-paper px-4 text-ink">
        <div className="w-full max-w-sm space-y-4 text-center">
          <HalaMark className="mx-auto size-12" />
          <h1 className="font-display text-3xl">{t(lang, "paymentOk")}</h1>
          <p className="text-sm text-ink-soft">{t(lang, "tapYouPaid")}</p>
          {isPending ? (
            <p className="text-sm text-muted">{t(lang, "sessionWait")}</p>
          ) : signedIn ? (
            <Link to="/console">
              <Button className="w-full">{t(lang, "openDesk")}</Button>
            </Link>
          ) : (
            <Link to="/login" search={{ next: "/console", paid: "1" }}>
              <Button className="w-full">{t(lang, "paidSignIn")}</Button>
            </Link>
          )}
        </div>
      </main>
    );
  },
});
