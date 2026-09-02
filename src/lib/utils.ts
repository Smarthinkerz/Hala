import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid(prefix = "id"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function detectLang(text: string): "ar" | "en" {
  const arabic = (text.match(/[\u0600-\u06FF]/g) || []).length;
  return arabic >= Math.max(1, text.length * 0.15) ? "ar" : "en";
}
