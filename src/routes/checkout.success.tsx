import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/success")({
  beforeLoad: () => {
    throw redirect({ to: "/login", search: { paid: "1" } });
  },
});
