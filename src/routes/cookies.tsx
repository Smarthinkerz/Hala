import { createFileRoute } from "@tanstack/react-router";
import { SalesPage } from "@/components/sales/layout";
import { PageHero, Prose } from "@/components/sales/primitives";

export const Route = createFileRoute("/cookies")({
  component: function CookiesPage() {
    return (
      <SalesPage band={false}>
        <PageHero kicker="Cookies" title="How Hala uses cookies." />
        <Prose>
          <p>
            We use necessary cookies to keep clinic users signed in and to protect the session. These cookies are
            required for My Desk and payment return to work.
          </p>
          <p>
            We may use limited analytics cookies to understand how the marketing site is used and to improve it. Where
            required by law, we ask before setting non essential cookies.
          </p>
          <p>
            Hala does not use patient conversations for advertising, and we do not place advertising cookies on the
            Patient Desk.
          </p>
          <p>
            You can control cookies in your browser. Blocking necessary cookies will prevent sign in. See the{" "}
            <a className="text-mint" href="/privacy">
              Privacy Policy
            </a>{" "}
            for how information is handled.
          </p>
        </Prose>
      </SalesPage>
    );
  },
});
