import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Receptionist } from "@/components/desk/receptionist";
import { TenantHydrate } from "@/components/tenant-hydrate";
import { getPublicClinic } from "@/lib/clinics";
import { t } from "@/lib/i18n";
import { useClinic } from "@/lib/store";

export const Route = createFileRoute("/c/$slug")({ component: PublicDesk });

function PublicDesk() {
  const { slug } = Route.useParams();
  const lang = useClinic((s) => s.uiLang);
  const setUiLang = useClinic((s) => s.setUiLang);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    void getPublicClinic({ data: slug }).then((c) => {
      if (!c) setMissing(true);
    });
  }, [slug]);

  if (missing) {
    return (
      <main className="grid min-h-dvh place-items-center bg-paper px-4 text-ink">
        <div className="text-center">
          <p className="font-display text-3xl">Hala</p>
          <p className="mt-2 text-sm text-muted">{t(lang, "noClinics")}</p>
          <Link to="/start" className="mt-4 inline-block text-sage">
            {t(lang, "startClinic")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="relative min-h-dvh bg-paper" lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <TenantHydrate slug={slug} />
      <div className="absolute start-3 top-3 z-10 flex gap-2">
        <Link to="/" className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-ink">
          Hala
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
