import { createFileRoute } from "@tanstack/react-router";
import { SalesPage } from "@/components/sales/layout";
import { PageHero, Prose, TrialCta } from "@/components/sales/primitives";

export const Route = createFileRoute("/about")({
  component: function AboutPage() {
    return (
      <SalesPage>
        <PageHero kicker="About Hala" title="Healthcare reception should be available when patients are ready." />
        <Prose>
          <h2 className="text-2xl text-foam">The gap we close</h2>
          <p>Clinics have opening hours. Patients don't.</p>
          <p>
            A patient may have a question during lunch, search for a service after work, or decide they want an
            appointment late at night. In those moments, most clinics are silent, and the patient either waits, gives
            up, or books somewhere that answered.
          </p>
          <p>
            Hala was built to close that gap. It gives clinics a digital receptionist that answers questions,
            communicates naturally in Gulf Arabic and English, and helps patients book real appointments around the
            clock.
          </p>
          <h2 className="text-2xl text-foam">Our mission</h2>
          <p>Make every clinic more available without making healthcare less human.</p>
          <p>
            Hala is not designed to replace the people who care for patients. It is designed to absorb the repetitive
            front desk conversations, the hours question, the price question, the "do you have anything tomorrow"
            question, so your team can give their attention to the patients standing in front of them.
          </p>
          <h2 className="text-2xl text-foam">What Hala believes</h2>
          <ul className="list-disc space-y-2 ps-5">
            <li>Patients should be able to ask.</li>
            <li>Clinics should be able to respond.</li>
            <li>Appointments should be easy to book.</li>
            <li>AI should remain under human control.</li>
            <li>Technology should make healthcare more accessible, not more complicated.</li>
          </ul>
          <h2 className="text-2xl text-foam">Built for the Gulf</h2>
          <p>
            Hala starts with the Gulf because language, culture, communication style, and patient expectations matter.
            Gulf Arabic is not English translated into Arabic. It has its own greetings, its own courtesy, its own
            rhythm, and its own habit of weaving English into the middle of a sentence. Hala is designed around that
            reality, so conversations feel familiar from the first word.
          </p>
          <p className="text-gold">Built for the Gulf. Designed for the world.</p>
          <h2 className="text-2xl text-foam">The name</h2>
          <p>
            Hala is the word a Gulf receptionist says first. It means you are welcome here. That is the entire product
            in one word.
          </p>
          <div className="pt-4">
            <TrialCta />
          </div>
        </Prose>
      </SalesPage>
    );
  },
});
