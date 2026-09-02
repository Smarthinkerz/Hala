import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LangToggle } from "@/components/auth-slot";
import { HalaMark } from "@/components/mark";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useClinic } from "@/lib/store";
import { TrialCta } from "./primitives";

const LINKS = [
  { href: "/patient-desk", label: "Patient Desk" },
  { href: "/my-desk", label: "My Desk" },
  { href: "/pricing", label: "Pricing" },
  { href: "/night-desk", label: "Night Desk" },
];

export function SalesNav() {
  const [open, setOpen] = useState(false);
  const { user } = useCurrentUserState();
  const lang = useClinic((s) => s.uiLang);
  const setUiLang = useClinic((s) => s.setUiLang);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-navy/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-foam">
          <HalaMark className="size-8 text-teal" />
          <span className="leading-tight">
            <span className="block font-semibold tracking-tight">HALA</span>
            <span className="hidden text-[10px] uppercase tracking-[0.16em] text-foam/50 sm:block">
              AI Clinic Receptionist
            </span>
          </span>
        </Link>
        <nav className="ms-8 hidden items-center gap-6 text-sm text-foam/70 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-mint">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-2">
          <LangToggle lang={lang} onChange={setUiLang} />
          <Link
            to={user ? "/console" : "/login"}
            search={user ? undefined : { next: "/console" }}
            className="hidden text-sm text-foam/80 hover:text-mint sm:inline"
          >
            Sign In
          </Link>
          <TrialCta className="hidden h-10 px-4 sm:inline-flex" />
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-white/8 bg-navy px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-foam/80">
                {l.label}
              </a>
            ))}
            <Link to="/login" search={{ next: "/console" }} className="py-2">
              Sign In
            </Link>
            <TrialCta className="w-full" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
