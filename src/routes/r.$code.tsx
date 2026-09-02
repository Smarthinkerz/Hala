import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/r/$code")({ component: ReferralLanding });

function ReferralLanding() {
  const { code } = Route.useParams();
  useEffect(() => {
    try {
      sessionStorage.setItem("hala-ref", code.toUpperCase());
    } catch {
      /* ignore */
    }
  }, [code]);
  return <Navigate to="/start" />;
}
