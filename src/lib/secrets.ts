import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

function material(): Buffer {
  const raw = process.env.HALA_SECRETS_KEY || process.env.BETTER_AUTH_SECRET || "";
  return createHash("sha256").update(raw || "hala-dev-unkeyed").digest();
}

export function encryptSecret(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", material(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}.${tag.toString("hex")}.${enc.toString("hex")}`;
}

export function decryptSecret(packed: string): string | null {
  const [ivH, tagH, dataH] = packed.split(".");
  if (!ivH || !tagH || !dataH) return null;
  try {
    const decipher = createDecipheriv("aes-256-gcm", material(), Buffer.from(ivH, "hex"));
    decipher.setAuthTag(Buffer.from(tagH, "hex"));
    return Buffer.concat([decipher.update(Buffer.from(dataH, "hex")), decipher.final()]).toString("utf8");
  } catch {
    return null;
  }
}

export function maskSecret(value: string): string {
  const v = value.trim();
  if (v.length < 8) return "••••";
  return `${v.slice(0, 4)}••••${v.slice(-4)}`;
}
