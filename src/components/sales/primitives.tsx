import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PROOF } from "@/lib/site";

export const TRIAL = "/start";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">{children}</p>
  );
}

export function TrialCta({
  className,
  children = "Start Your 14 Day Trial",
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link
      to={TRIAL}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-teal px-6 text-sm font-semibold text-navy transition-opacity hover:opacity-90",
        className,
      )}
    >
      {children} <ArrowRight className="size-4" />
    </Link>
  );
}

export function GhostCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-medium text-foam transition-colors hover:border-teal/50 hover:text-mint"
    >
      {children}
    </a>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-24", className)}>
      {children}
    </section>
  );
}

export function Proof() {
  return <p className="text-xs font-medium uppercase tracking-[0.18em] text-mint/80">{PROOF}</p>;
}

export function PageHero({
  kicker,
  title,
  body,
}: {
  kicker?: string;
  title: string;
  body?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-6 pt-16 sm:px-6">
      {kicker ? <Eyebrow>{kicker}</Eyebrow> : null}
      <h1 className={`font-display text-4xl leading-[1.1] sm:text-5xl ${kicker ? "mt-4" : ""}`}>{title}</h1>
      {body ? <div className="mt-5 space-y-4 text-base leading-relaxed text-foam/75">{body}</div> : null}
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl space-y-5 px-4 pb-16 text-sm leading-relaxed text-foam/75 sm:px-6">{children}</div>;
}
