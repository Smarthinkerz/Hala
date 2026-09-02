export type PlanId = "essential" | "plus" | "premium";
export type BillingStatus = "demo" | "trialing" | "active" | "past_due" | "canceled";

export const TRIAL_DAYS = 14;
export const REFERRAL_BONUS_DAYS = 30;

export type PlanDef = {
  id: PlanId;
  usd: number;
  omr: number;
  labelEn: string;
  labelAr: string;
  highlight: boolean;
  featuresEn: string[];
  featuresAr: string[];
};

export const PLANS: Record<PlanId, PlanDef> = {
  essential: {
    id: "essential",
    usd: 300,
    omr: 115,
    labelEn: "Essential",
    labelAr: "أساسي",
    highlight: false,
    featuresEn: [
      "1 public clinic desk",
      "Gulf Arabic + English receptionist",
      "Real calendar — no invented slots",
      "Inbox and evening board",
      "Booked with Hala branding",
    ],
    featuresAr: [
      "مكتب عيادة عام واحد",
      "استقبال بالخليجي والإنجليزي",
      "تقويم حقيقي — بلا مواعيد مختَرعة",
      "صندوق وارد ولوحة المساء",
      "علامة «حُجز عبر هلا»",
    ],
  },
  plus: {
    id: "plus",
    usd: 600,
    omr: 230,
    labelEn: "Plus",
    labelAr: "بلس",
    highlight: true,
    featuresEn: [
      "Everything in Essential",
      "Up to 4 doctors",
      "In-browser voice",
      "After-hours booking",
      "Analytics on the board",
      "Instagram bio + WhatsApp share",
    ],
    featuresAr: [
      "كل ما في أساسي",
      "حتى 4 أطباء",
      "صوت داخل المتصفح",
      "حجز بعد الدوام",
      "تحليلات على اللوحة",
      "مشاركة إنستغرام وواتساب",
    ],
  },
  premium: {
    id: "premium",
    usd: 1200,
    omr: 460,
    labelEn: "Premium",
    labelAr: "بريميوم",
    highlight: false,
    featuresEn: [
      "Everything in Plus",
      "Multi-location ready",
      "Remove Booked with Hala",
      "Featured on Night desks",
      "Referral: 30 extra days when a clinic pays",
      "Priority onboarding",
    ],
    featuresAr: [
      "كل ما في بلس",
      "جاهز لعدة مواقع",
      "إخفاء «حُجز عبر هلا»",
      "تمييز في مكاتب الليل",
      "دعوة: 30 يوماً إضافية عند دفع عيادة",
      "تجهيز بأولوية",
    ],
  },
};

export function normalizePlan(plan?: string | null): PlanId {
  if (plan === "plus" || plan === "practice") return "plus";
  if (plan === "premium" || plan === "group") return "premium";
  return "essential";
}

export type Entitlement = {
  status: BillingStatus;
  plan: PlanId;
  bookingAllowed: boolean;
  trialEndsAt: string | null;
  periodEndsAt: string | null;
  daysLeft: number;
  referralCode: string;
  hidePoweredBy: boolean;
};

export function computeEntitlement(row: {
  status: string;
  plan: string;
  trial_ends_at: string | Date;
  period_ends_at: string | Date | null;
  referral_code: string;
  hide_powered_by?: boolean;
}): Entitlement {
  const plan = normalizePlan(row.plan);
  const trialEnds = new Date(row.trial_ends_at).getTime();
  const periodEnds = row.period_ends_at ? new Date(row.period_ends_at).getTime() : 0;
  const now = Date.now();
  let status = row.status as BillingStatus;
  if (status === "active" && periodEnds && periodEnds < now) status = "past_due";
  if (status === "trialing" && trialEnds < now) status = "past_due";
  const bookingAllowed = status === "active" ? periodEnds > now : status === "trialing" && trialEnds > now;
  const until = status === "active" ? periodEnds : trialEnds;
  const daysLeft = Math.max(0, Math.ceil((until - now) / 86400000));
  return {
    status,
    plan,
    bookingAllowed,
    trialEndsAt: new Date(row.trial_ends_at).toISOString(),
    periodEndsAt: row.period_ends_at ? new Date(row.period_ends_at).toISOString() : null,
    daysLeft,
    referralCode: row.referral_code,
    hidePoweredBy: Boolean(row.hide_powered_by) || plan === "premium",
  };
}

export const DEMO_ENTITLEMENT: Entitlement = {
  status: "demo",
  plan: "essential",
  bookingAllowed: true,
  trialEndsAt: null,
  periodEndsAt: null,
  daysLeft: 999,
  referralCode: "",
  hidePoweredBy: false,
};
