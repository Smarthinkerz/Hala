import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-opacity duration-150 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40",
  {
    variants: {
      variant: {
        primary: "bg-sage text-paper hover:opacity-90",
        ink: "bg-ink text-paper hover:opacity-90",
        ghost: "bg-transparent text-ink hover:bg-paper-deep",
        outline: "border border-line bg-surface text-ink hover:bg-paper-deep",
        danger: "bg-danger text-paper hover:opacity-90",
      },
      size: {
        sm: "h-9 px-3 text-sm rounded-sm",
        md: "h-11 px-4 text-sm rounded-md",
        lg: "h-12 px-5 text-base rounded-md",
        icon: "size-11 rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  tone = "mute",
  children,
}: {
  className?: string;
  tone?: "mute" | "sage" | "ok" | "warn" | "danger";
  children: ReactNode;
}) {
  const tones = {
    mute: "bg-paper-deep text-ink-soft",
    sage: "bg-sage-soft text-sage-deep",
    ok: "bg-sage-soft text-ok",
    warn: "bg-paper-deep text-clay",
    danger: "bg-paper-deep text-danger",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
