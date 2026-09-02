import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/success")({
  component: () => <Navigate to="/console" />,
});
