import { createFileRoute } from "@tanstack/react-router";
import { SalesPage } from "@/components/sales/layout";
import { PageHero, Section } from "@/components/sales/primitives";
import { EMAIL_HELLO, EMAIL_PRIVACY, EMAIL_SUPPORT } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  component: function ContactPage() {
    const cards = [
      {
        t: "Sales",
        b: "Interested in Hala for your clinic? Tell us about your clinic, how many doctors you have, and what you want your front desk to handle. We will show you exactly how Hala would work for you, in Arabic, English, or both.",
        href: `mailto:${EMAIL_HELLO}?subject=Hala%20sales`,
        cta: "Contact Sales",
      },
      {
        t: "Support",
        b: "Already using Hala? Our support team can help with account access, clinic configuration, calendar setup, Hala knowledge, booking issues, billing, subscription questions, and technical issues.",
        href: `mailto:${EMAIL_SUPPORT}?subject=Hala%20support`,
        cta: "Contact Support",
      },
      {
        t: "Partnerships",
        b: "We work with clinic groups and healthcare networks, technology partners, resellers, and strategic partners.",
        href: `mailto:${EMAIL_HELLO}?subject=Hala%20partnerships`,
        cta: "Talk to Partnerships",
      },
    ];
    return (
      <SalesPage>
        <PageHero
          kicker="Contact Hala"
          title="Have a question? Let's talk."
          body={
            <p>
              Whether you are evaluating Hala for your clinic, need help with your account, or want to discuss a
              partnership, we are here.
            </p>
          }
        />
        <Section>
          <div className="grid gap-4 md:grid-cols-3">
            {cards.map((c) => (
              <article key={c.t} className="flex flex-col rounded-2xl border border-white/10 bg-navy-mid p-5">
                <h2 className="text-xl">{c.t}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foam/70">{c.b}</p>
                <a href={c.href} className="mt-6 text-sm text-teal">
                  {c.cta} →
                </a>
              </article>
            ))}
          </div>
          <div className="mt-10 space-y-2 text-sm text-foam/70">
            <p>
              General: <a className="text-mint" href={`mailto:${EMAIL_HELLO}`}>{EMAIL_HELLO}</a>
            </p>
            <p>
              Support: <a className="text-mint" href={`mailto:${EMAIL_SUPPORT}`}>{EMAIL_SUPPORT}</a>
            </p>
            <p>
              Privacy: <a className="text-mint" href={`mailto:${EMAIL_PRIVACY}`}>{EMAIL_PRIVACY}</a>
            </p>
            <p className="pt-4">We reply as quickly as we can, in Arabic or English, whichever you prefer.</p>
          </div>
        </Section>
      </SalesPage>
    );
  },
});
