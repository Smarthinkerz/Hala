import { HeroDesk } from "./desk-mock";
import { Eyebrow, GhostCta, Proof, TrialCta } from "./primitives";

export function SalesHero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/sales/hero-clinic.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <Eyebrow>Your AI Clinic Receptionist</Eyebrow>
          <h1 className="mt-4 font-display text-4xl leading-[1.08] text-foam sm:text-5xl lg:text-6xl">
            Your clinic's front desk, always awake.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-foam/75">
            Hala answers patient questions, speaks Gulf Arabic and English the way your patients actually speak, and
            books real appointments from your live calendar, day and night.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrialCta />
            <GhostCta href="/desk">Try the Patient Desk</GhostCta>
          </div>
          <div className="mt-6">
            <Proof />
          </div>
        </div>
        <HeroDesk />
      </div>
    </section>
  );
}
