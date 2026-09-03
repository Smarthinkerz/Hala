import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HalaMark } from "@/components/mark";
import { Button } from "@/components/ui";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { confirmCheckout } from "@/lib/clinics";
import { t } from "@/lib/i18n";
import { useClinic } from "@/lib/store";

export const Route = createFileRoute("/checkout/return")({
  validateSearch: (s: Record<string, unknown>) => ({
    tap_id: typeof s.tap_id === "string" ? s.tap_id : undefined,
    charge_id: typeof s.charge_id === "string" ? s.charge_id : undefined,
    ref: typeof s.ref === "string" ? s.ref : typeof s.external_ref === "string" ? s.external_ref : undefined,
    status: typeof s.status === "string" ? s.status : undefined,
  }),
  component: CheckoutReturn,
});

function CheckoutReturn() {
  const { tap_id, charge_id, ref, status: qStatus } = Route.useSearch();
  const { user, isPending } = useCurrentUserState();
  const lang = useClinic((s) => s.uiLang);
  const [status, setStatus] = useState<"wait" | "paid" | "initiated" | "cancelled" | "failed">("wait");
  const [error, setError] = useState("");
  const chargeId = tap_id || charge_id;
  const paidHint = ["paid", "captured", "authorized", "success"].includes((qStatus ?? "").toLowerCase());

  useEffect(() => {
    if (!chargeId && !ref) {
      setStatus("failed");
      setError("Missing charge");
      return;
    }
    void confirmCheckout({ data: { chargeId, reference: ref, paidHint } })
      .then((res) => {
        if (res.status === "paid") setStatus("paid");
        else if (res.status === "initiated") setStatus("initiated");
        else if (res.status === "cancelled") setStatus("cancelled");
        else {
          setStatus("failed");
          setError("error" in res && res.error ? res.error : "");
        }
      })
      .catch((err: unknown) => {
        setStatus("failed");
        setError(err instanceof Error ? err.message : "Failed");
      });
  }, [chargeId, ref, paidHint]);

  if (status === "initiated") return <Navigate to="/checkout/pending" search={{ ref }} />;
  if (status === "cancelled") return <Navigate to="/checkout/cancelled" />;
  if (status === "paid" && !isPending && user) return <Navigate to="/console" />;
  if (status === "paid" && !isPending && !user) {
    return <Navigate to="/login" search={{ next: "/console", paid: "1" }} />;
  }

  return (
    <main className="grid min-h-dvh place-items-center bg-paper px-4 text-ink">
      <div className="w-full max-w-sm space-y-4 text-center">
        <HalaMark className="mx-auto size-12" />
        <h1 className="font-display text-3xl">
          {status === "wait" ? t(lang, "callbackWait") : t(lang, "paymentFail")}
        </h1>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        {status !== "wait" ? (
          <Link to="/login" search={{ next: "/console" }}>
            <Button className="w-full">{t(lang, "myDesk")}</Button>
          </Link>
        ) : null}
      </div>
    </main>
  );
}
