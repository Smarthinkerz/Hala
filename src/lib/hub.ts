import { PLANS, type PlanId } from "./plans";

/** SmarThinkerz Hub — Tap keys live here, not on Hala. */
export const HUB_ORIGIN = (
  (typeof process !== "undefined" ? process.env.SMARTHINKERZ_HUB_ORIGIN : "") || "https://smarthinkerz.com"
).replace(/\/$/, "");
export const HUB_CHECKOUT = `${HUB_ORIGIN}/api/checkout`;

export const HUB_PLAN_ID: Record<PlanId, string> = {
  essential: "hala-essential",
  plus: "hala-plus",
  premium: "hala-premium",
};

export function hubPlanId(plan: PlanId): string {
  return HUB_PLAN_ID[plan];
}

export function safePublicOrigin(origin?: string): string {
  const raw = (origin ?? "").trim();
  if (!/^https?:\/\//i.test(raw)) return "";
  try {
    const u = new URL(raw);
    if (u.username || u.password) return "";
    return `${u.protocol}//${u.host}`;
  } catch {
    return "";
  }
}

export async function startHubCheckout(fields: Record<string, string>): Promise<{ url: string } | { error: string }> {
  const res = await fetch(HUB_CHECKOUT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/html",
    },
    body: new URLSearchParams(fields),
    redirect: "manual",
  });
  const location = res.headers.get("location");
  if ((res.status === 303 || res.status === 302 || res.status === 301) && location) {
    return { url: location };
  }
  const text = await res.text().catch(() => "");
  if (text.includes("Unknown plan")) return { error: "hub_plan_missing" };
  if (res.status >= 400) return { error: "Check first name, email, and phone" };
  return { error: "SmarThinkerz checkout could not start" };
}

export function hubCheckoutFields(input: {
  plan: PlanId;
  firstName: string;
  lastName?: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  reference: string;
  clinicId: string;
  origin?: string;
}): Record<string, string> {
  const origin = safePublicOrigin(input.origin);
  const ref = encodeURIComponent(input.reference);
  const returnUrl = origin ? `${origin}/checkout/return?ref=${ref}` : "";
  const successUrl = origin ? `${origin}/checkout/success?ref=${ref}` : "";
  const cancelUrl = origin ? `${origin}/checkout/cancelled` : "";
  const pendingUrl = origin ? `${origin}/checkout/pending?ref=${ref}` : "";
  const fields: Record<string, string> = {
    plan: hubPlanId(input.plan),
    cycle: "monthly",
    firstName: input.firstName,
    lastName: (input.lastName ?? "").trim() || "Owner",
    email: input.email,
    phoneCode: input.phoneCode,
    phoneNumber: input.phoneNumber,
    product: "Hala",
    display: "Hala",
    plan_name: PLANS[input.plan].labelEn,
    reference: input.reference,
    clinic_id: input.clinicId,
    partner: "hala",
    source: "hala",
  };
  if (returnUrl) {
    Object.assign(fields, {
      returnUrl,
      return_url: returnUrl,
      redirectUrl: returnUrl,
      redirect_url: returnUrl,
      success_url: successUrl,
      successUrl,
      cancel_url: cancelUrl,
      cancelUrl,
      next: successUrl,
      origin,
      pending_url: pendingUrl,
    });
  }
  return fields;
}
