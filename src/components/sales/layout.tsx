import type { ReactNode } from "react";
import { useClinic } from "@/lib/store";
import { FinalBand, SalesFooter } from "./footer";
import { SalesNav } from "./nav";

export function SalesPage({ children, band = true }: { children: ReactNode; band?: boolean }) {
  const lang = useClinic((s) => s.uiLang);
  return (
    <div className="sales min-h-dvh overflow-x-hidden" lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <SalesNav />
      {children}
      {band ? <FinalBand /> : null}
      <SalesFooter />
    </div>
  );
}
