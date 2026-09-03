import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyPartnerSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!secret || !header) return false;
  const provided = header.replace(/^sha256=/i, "").trim().toLowerCase();
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  if (provided.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(provided, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}

export type PartnerPaidPayload = {
  event?: string;
  type?: string;
  reference?: string;
  external_ref?: string;
  order_id?: string;
  tap_id?: string;
  chargeId?: string;
  clinicId?: string;
  clinic_id?: string;
  email?: string;
  customer_email?: string;
};
