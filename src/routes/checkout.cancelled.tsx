import { createFileRoute, Link } from "@tanstack/react-router";
import { HalaMark } from "@/components/mark";
import { Button } from "@/components/ui";
import { t } from "@/lib/i18n";
import { useClinic } from "@/lib/store";

export const Route = createFileRoute("/checkout/cancelled")({
  component: function Cancelled() {
    const lang = useClinic((s) => s.uiLang);
    return (
      <main className="grid min-h-dvh place-items-center bg-paper px-4 text-ink">
        <div className="w-full max-w-sm space-y-4 text-center">
          <HalaMark className="mx-auto size-12" />
          <h1 className="font-display text-3xl">{t(lang, "checkoutCancelled")}</h1>
          <Link to="/subscribe" search={{ plan: "plus" }}>
            <Button className="w-full">{t(lang, "payTap")}</Button>
          </Link>
        </div>
      </main>
    );
  },
});
