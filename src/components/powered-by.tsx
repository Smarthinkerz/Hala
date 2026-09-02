import { Link } from "@tanstack/react-router";
import { t } from "@/lib/i18n";
import { useClinic } from "@/lib/store";

export function PoweredBy() {
  const lang = useClinic((s) => s.uiLang);
  const hide = useClinic((s) => s.entitlement.hidePoweredBy);
  if (hide) return null;
  return (
    <Link
      to="/"
      className="block border-t border-line bg-paper px-3 py-2 text-center text-[11px] tracking-wide text-muted hover:text-sage"
    >
      {t(lang, "poweredBy")}
    </Link>
  );
}
