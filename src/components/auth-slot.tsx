import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { t } from "@/lib/i18n";
import { useClinic } from "@/lib/store";
import type { Lang } from "@/lib/types";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  const lang = useClinic((s) => s.uiLang);
  if (isPending) return <div className="h-9 w-20 animate-pulse rounded-full bg-paper-deep" />;
  if (user) {
    return (
      <div className="flex items-center gap-2 text-ink">
        <Link
          to="/console"
          className="rounded-full bg-sage px-2.5 py-1 text-[11px] font-medium uppercase tracking-widest text-paper"
        >
          {t(lang, "myDesk")}
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    );
  }
  return (
    <SignedOut>
      <Link to="/login" search={{ next: "/console" }} className="rounded-full border border-line px-3 py-1.5 text-xs text-ink">
        {t(lang, "myDesk")}
      </Link>
    </SignedOut>
  );
}

export function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div className="flex rounded-full border border-line p-0.5 text-xs">
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`rounded-full px-2.5 py-1 ${lang === "en" ? "bg-ink text-paper" : "text-muted"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("ar")}
        className={`rounded-full px-2.5 py-1 ${lang === "ar" ? "bg-ink text-paper" : "text-muted"}`}
      >
        ع
      </button>
    </div>
  );
}
