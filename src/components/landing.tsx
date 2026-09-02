import { Receptionist } from "@/components/desk/receptionist";
import { FinalBand, SalesFooter } from "@/components/sales/footer";
import { SalesHero } from "@/components/sales/hero";
import { SalesNav } from "@/components/sales/nav";
import { Eyebrow, GhostCta, Section, TrialCta } from "@/components/sales/primitives";
import { useClinic } from "@/lib/store";

export function Landing() {
  const lang = useClinic((s) => s.uiLang);
  return (
    <div className="sales min-h-dvh overflow-x-hidden" lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <SalesNav />
      <SalesHero />

      <Section>
        <Eyebrow>The clinic desk</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
          Your patients decide to book at 10:47 PM. Your reception desk opens at 8:00 AM.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foam/70">
          Every missed call, unanswered message, and after hours question is a patient who may book somewhere else. Hala
          closes that gap with a receptionist that never goes home.
        </p>
      </Section>

      <Section id="how">
        <Eyebrow>How Hala works</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">Three steps to a digital front desk.</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            [
              "1",
              "Teach Hala your clinic",
              "Add your services, prices, doctors, hours, insurance details, and answers to common questions. Hala speaks only from the knowledge you give it.",
            ],
            [
              "2",
              "Connect your calendar",
              "Hala checks real availability before offering a time. It never invents an open slot.",
            ],
            [
              "3",
              "Share your Hala Desk",
              "Put the link on your website, Instagram bio, WhatsApp status, and Google profile. Patients tap, ask, and book.",
            ],
          ].map(([n, t, b]) => (
            <article key={n} className="rounded-2xl border border-white/10 bg-navy-mid p-6">
              <p className="text-teal">{n}</p>
              <h3 className="mt-3 text-xl">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foam/70">{b}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="patients">
        <Eyebrow>A conversation, not a form</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">Patients open your Hala Desk and simply talk.</h2>
        <p className="mt-3 max-w-xl text-sm text-foam/70">
          Patients do not download an app or create an account. Hala follows the conversation naturally in Gulf Arabic,
          English, or both mixed together, exactly the way your patients speak.
        </p>
        <div className="mt-8 max-w-lg space-y-3 rounded-2xl border border-white/10 bg-navy-mid p-5">
          <p className="rounded-2xl bg-white/10 px-4 py-2 text-sm" dir="auto">
            السلام عليكم، I need a cleaning appointment tomorrow.
          </p>
          <p className="rounded-2xl bg-teal/15 px-4 py-2 text-sm text-mint" dir="auto">
            أهلا وسهلا! متوفر بكرة الساعة 4:30 أو 6:00 مساءً. أي وقت يناسبك؟
          </p>
        </div>
      </Section>

      <Section>
        <Eyebrow>Real bookings, not promises</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">Every offered time comes from your live calendar.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foam/70">
          Hala identifies the service, matches the right doctor, checks the live calendar, offers only genuinely open
          times, confirms the patient's name and mobile number, and writes the appointment into your calendar. If a slot
          is taken while the patient is deciding, Hala apologizes and offers the next available time.
        </p>
      </Section>

      <Section id="console">
        <Eyebrow>My Desk</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">Your clinic stays in control.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foam/70">
          My Desk is your private workspace. Watch conversations in the Inbox and take over whenever a human touch is
          needed. Update a price once and Hala uses it in the very next conversation. Set the greeting, tone, and
          personality so Hala sounds like your clinic, not like a robot.
        </p>
        <a href="/my-desk" className="mt-6 inline-block text-sm text-teal">
          Explore My Desk →
        </a>
      </Section>

      <Section>
        <Eyebrow>Built for the Gulf</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">Gulf Arabic is not English translated into Arabic.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foam/70">
          Hala is built around the real conversational rhythm of the region: the greetings, the courtesy, the mixing of
          languages mid sentence, and the expectations patients bring when they contact a clinic.
        </p>
        <p className="mt-4 font-medium text-gold">Built for the Gulf. Designed for the world.</p>
      </Section>

      <Section id="pricing">
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">
          Plans start at OMR 115 per month, with a 14 day trial and no long setup project.
        </h2>
        <p className="mt-3 text-sm text-foam/70">Most clinics go live in under an hour.</p>
        <div className="mt-8">
          <GhostCta href="/pricing">See Pricing</GhostCta>
        </div>
      </Section>

      <Section id="demo">
        <Eyebrow>Try the demo</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl">Talk to Hala as a patient.</h2>
        <p className="mt-3 text-sm text-foam/70">Al Noor Dental Studio · Qurum · Interactive Demo, not a live clinic.</p>
        <div className="mt-8 max-w-[340px] overflow-hidden rounded-[28px] border border-white/10 bg-paper">
          <Receptionist variant="phone" />
        </div>
        <p className="mt-6 text-sm text-foam/80">Want this for your clinic?</p>
        <div className="mt-3">
          <TrialCta />
        </div>
      </Section>

      <FinalBand />
      <SalesFooter />
    </div>
  );
}
