import { createFileRoute, Navigate } from "@tanstack/react-router";
import { SalesPage } from "@/components/sales/layout";
import { GhostCta, PageHero, Section, TrialCta } from "@/components/sales/primitives";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/my-desk")({ component: MyDeskPage });

function MyDeskPage() {
  const { user, isPending } = useCurrentUserState();
  if (!isPending && user) return <Navigate to="/console" />;

  const areas = [
    ["Overview", "Today's appointments, new bookings, open conversations, answer rate, upcoming appointments, booking activity, and clinic status. Open My Desk with your morning coffee and know exactly how the night went."],
    ["Inbox", "Every conversation between patients and Hala. Read threads as they happen, take over when human assistance is required, and continue from the clinic side without the patient losing context."],
    ["Calendar", "Upcoming, booked, canceled, completed, and no shows, plus doctor and service schedules. The calendar Hala reads is the calendar you see."],
    ["Knowledge", "Clinic information, services, prices, duration, doctors, languages, hours including Friday, location, parking, insurance, and FAQs. Change Dental Cleaning from OMR 18 to OMR 20, press save, and Hala quotes OMR 20 in the very next conversation."],
    ["Agent", "Greeting, personality, tone, language behavior, voice on plans that include it, required patient details, and booking confirmation style."],
    ["Analytics", "Conversation volume, Arabic versus English usage, appointment requests, completed bookings, most requested services, busy periods, answer rate, and patient engagement. These numbers describe your patients, not an industry average."],
    ["Clinic settings", "Clinic profile, account, subscription and billing, calendar connection, public desk visibility and link, referral code, security, and notifications."],
  ];

  return (
    <SalesPage>
      <PageHero
        kicker="My Desk"
        title="Your Clinic. Your Hala. One Digital Front Desk."
        body={
          <p>
            Everything you need to run your AI receptionist. My Desk is your private clinic workspace. It is where you
            decide how Hala represents your clinic, what it knows, how it sounds, and how it handles every patient
            conversation and appointment. One login, seven areas, complete control.
          </p>
        }
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {areas.map(([t, b]) => (
            <article key={t} className="rounded-2xl border border-white/10 bg-navy-mid p-5">
              <h2 className="text-xl">{t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-foam/70">{b}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-foam/70">
          The principle is simple: Hala answers from the clinic knowledge you provide. Nothing more, nothing less.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostCta href="/login?next=/console">Sign In to My Desk</GhostCta>
          <TrialCta>Start Your 14 Day Trial</TrialCta>
        </div>
      </Section>
    </SalesPage>
  );
}
