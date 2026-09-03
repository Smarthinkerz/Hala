export const TZ = "Asia/Muscat";

type Parts = {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  weekday: string;
};

function partsOf(date: Date): Parts {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  });
  const bag: Record<string, string> = {};
  for (const p of fmt.formatToParts(date)) {
    if (p.type !== "literal") bag[p.type] = p.value;
  }
  return bag as Parts;
}

export function muscatNow(date = new Date()): { date: string; time: string; weekday: string } {
  const p = partsOf(date);
  return {
    date: `${p.year}-${p.month}-${p.day}`,
    time: `${p.hour}:${p.minute}`,
    weekday: p.weekday,
  };
}

export function weekdayIndex(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 8, 0, 0)).getUTCDay();
}

export function addDays(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n, 8, 0, 0));
  return dt.toISOString().slice(0, 10);
}

export function timeToMin(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function minToTime(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function formatDate(dateStr: string, lang: "en" | "ar"): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 8, 0, 0));
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-OM" : "en-GB", {
    timeZone: TZ,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(dt);
}

export function formatTime(hhmm: string, lang: "en" | "ar"): string {
  const [h, m] = hhmm.split(":").map(Number);
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-OM" : "en-GB", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(Date.UTC(2026, 0, 1, h, m, 0)));
}

export function formatOMR(n: number, lang: "en" | "ar"): string {
  const formatted = n.toFixed(n % 1 === 0 ? 0 : 2);
  return lang === "ar" ? `${formatted} ر.ع.` : `OMR ${formatted}`;
}

const WEEKDAYS_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export function weekdayName(index: number, lang: "en" | "ar"): string {
  return (lang === "ar" ? WEEKDAYS_AR : WEEKDAYS_EN)[index] ?? "";
}

export function isBefore(date: string, time: string, nowDate: string, nowTime: string): boolean {
  if (date < nowDate) return true;
  if (date > nowDate) return false;
  return time <= nowTime;
}
