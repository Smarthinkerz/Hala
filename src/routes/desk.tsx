import { createFileRoute, Link } from "@tanstack/react-router";
import { Receptionist } from "@/components/desk/receptionist";
import { useClinic } from "@/lib/store";

export const Route = createFileRoute("/desk")({ component: DeskPage });

function DeskPage() {
  const lang = useClinic((s) => s.uiLang);
  const setUiLang = useClinic((s) => s.setUiLang);
  return (
    <div className="relative min-h-dvh bg-paper" lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="absolute start-3 top-3 z-10 flex gap-2">
        <Link to="/" className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink">
          {lang === "ar" ? "هلا" : "Hala"}
        </Link>
        <Link to="/console" className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink">
          {lang === "ar" ? "الكونسول" : "Console"}
        </Link>
      </div>
      <div className="absolute end-3 top-3 z-10 flex rounded-full border border-line bg-surface p-0.5 text-xs">
        <button type="button" onClick={() => setUiLang("en")} className={`rounded-full px-2 py-1 ${lang === "en" ? "bg-ink text-paper" : "text-muted"}`}>
          EN
        </button>
        <button type="button" onClick={() => setUiLang("ar")} className={`rounded-full px-2 py-1 ${lang === "ar" ? "bg-ink text-paper" : "text-muted"}`}>
          ع
        </button>
      </div>
      <div className="mx-auto min-h-dvh max-w-lg">
        <Receptionist variant="page" />
      </div>
    </div>
  );
}
