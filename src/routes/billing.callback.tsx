import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/billing/callback")({
  validateSearch: (s: Record<string, unknown>) => ({
    tap_id: typeof s.tap_id === "string" ? s.tap_id : undefined,
    charge_id: typeof s.charge_id === "string" ? s.charge_id : undefined,
  }),
  component: function LegacyCallback() {
    const { tap_id, charge_id } = Route.useSearch();
    return <Navigate to="/checkout/return" search={{ tap_id, charge_id }} />;
  },
});
