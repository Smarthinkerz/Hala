import { createFileRoute } from "@tanstack/react-router";
import { SalesPage } from "@/components/sales/layout";
import { PageHero, Section } from "@/components/sales/primitives";
import { DOC_SECTIONS } from "@/lib/docs";

export const Route = createFileRoute("/docs")({
  component: function DocsPage() {
    return (
      <SalesPage>
        <PageHero
          kicker="Hala Documentation"
          title="Everything you need to configure, operate, and get the most from your Hala AI clinic receptionist."
          body={
            <p>
              The Help Center answers "how do I fix or use something." Documentation explains how Hala works and how to
              configure it properly.
            </p>
          }
        />
        <Section>
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10">
            {DOC_SECTIONS.map((s) => (
              <details key={s.title} className="px-5 py-5">
                <summary className="cursor-pointer list-none text-base font-medium text-foam">{s.title}</summary>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-foam/70">
                  {s.body.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </Section>
      </SalesPage>
    );
  },
});
