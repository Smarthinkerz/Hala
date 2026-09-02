import { HalaMark } from "@/components/mark";
import { EMAIL_HELLO, EMAIL_PRIVACY, EMAIL_SUPPORT, PROOF } from "@/lib/site";
import { GhostCta, Proof, TrialCta } from "./primitives";

const COLS: { title: string; rows: [string, string][] }[] = [
  {
    title: "Product",
    rows: [
      ["/patient-desk", "Patient Desk"],
      ["/my-desk", "My Desk"],
      ["/pricing", "Pricing"],
      ["/night-desk", "Night Desk"],
    ],
  },
  {
    title: "Company",
    rows: [
      ["/about", "About Hala"],
      ["/contact", "Contact"],
      ["/privacy", "Privacy"],
      ["/terms", "Terms"],
    ],
  },
  {
    title: "Clinic",
    rows: [
      ["/login", "Sign In"],
      ["/my-desk", "My Desk"],
      ["/start", "Start Trial"],
    ],
  },
  {
    title: "Support",
    rows: [
      ["/help", "Help Center"],
      ["/docs", "Documentation"],
      ["/contact", "Contact Support"],
    ],
  },
];

export function FinalBand() {
  return (
    <section className="border-y border-white/10 bg-navy-mid">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="max-w-2xl font-display text-4xl sm:text-5xl">
          Your clinic does not have to stop when the reception desk does.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-foam/70">
          Let Hala answer, understand, and book, around the clock.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TrialCta />
          <GhostCta href="/patient-desk">See Hala in Action</GhostCta>
        </div>
        <div className="mt-6">
          <Proof />
        </div>
      </div>
    </section>
  );
}

export function SalesFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div>
            <div className="flex items-center gap-2">
              <HalaMark className="size-8 text-teal" />
              <span className="font-semibold">HALA</span>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-foam/50">AI Clinic Receptionist</p>
            <p className="mt-4 text-sm leading-relaxed text-foam/70">
              Your clinic's digital front desk for answering patients, understanding conversations, and booking real
              appointments 24/7.
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-mint/80">{PROOF}</p>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-foam/45">{col.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-foam/75">
                {col.rows.map(([href, label]) => (
                  <li key={label + href}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-white/10 bg-navy-mid p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">Need Help?</p>
          <p className="mt-2 text-sm text-foam/80">We're here to help.</p>
          <ul className="mt-3 space-y-1 text-sm text-foam/65">
            <li>
              Account, billing, setup, calendar, booking, or technical questions:{" "}
              <a className="text-mint" href={`mailto:${EMAIL_SUPPORT}`}>
                {EMAIL_SUPPORT}
              </a>
            </li>
            <li>
              General inquiries and partnerships:{" "}
              <a className="text-mint" href={`mailto:${EMAIL_HELLO}`}>
                {EMAIL_HELLO}
              </a>
            </li>
            <li>
              Privacy related requests:{" "}
              <a className="text-mint" href={`mailto:${EMAIL_PRIVACY}`}>
                {EMAIL_PRIVACY}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8 px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-xs text-foam/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Hala. All rights reserved.</p>
          <p>AI Clinic Receptionist · Built for the Gulf · Designed for the world</p>
          <p className="flex flex-wrap gap-3">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
            <a href="/accessibility">Accessibility</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
