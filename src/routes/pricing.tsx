import { createFileRoute } from "@tanstack/react-router";
import { PricingBlock } from "@/components/sales/convert";
import { SalesPage } from "@/components/sales/layout";

export const Route = createFileRoute("/pricing")({
  component: function PricingPage() {
    return (
      <SalesPage>
        <PricingBlock />
      </SalesPage>
    );
  },
});
