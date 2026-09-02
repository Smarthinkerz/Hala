import { createFileRoute } from "@tanstack/react-router";
import { SalesPage } from "@/components/sales/layout";
import { PageHero, Prose } from "@/components/sales/primitives";
import { EMAIL_HELLO } from "@/lib/site";

export const Route = createFileRoute("/accessibility")({
  component: function AccessibilityPage() {
    return (
      <SalesPage band={false}>
        <PageHero kicker="Accessibility" title="Hala should be usable." />
        <Prose>
          <p>
            Hala is built as a web application so patients and clinic teams can use it in a browser, on a phone or a
            computer, without installing an app.
          </p>
          <p>
            We aim for clear type, sufficient contrast, visible focus, keyboard access to primary actions, and language
            switching between English and Arabic, including right to left layout.
          </p>
          <p>
            The Patient Desk is conversational. If a patient prefers to type, they can. Voice is optional and only on
            plans that include it.
          </p>
          <p>
            If you find a barrier, write to{" "}
            <a className="text-mint" href={`mailto:${EMAIL_HELLO}`}>
              {EMAIL_HELLO}
            </a>{" "}
            and describe the page and what you were trying to do.
          </p>
        </Prose>
      </SalesPage>
    );
  },
});
