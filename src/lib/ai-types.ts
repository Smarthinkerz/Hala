import type { Lang } from "./types";

export type HalaIntent =
  | "greeting"
  | "faq"
  | "booking"
  | "reschedule"
  | "cancel"
  | "emergency"
  | "handoff"
  | "after_hours"
  | "other";

export type HalaBooking = {
  action: "create" | "reschedule" | "cancel";
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  notes: string;
  appointmentId?: string;
};

export type HalaReply = {
  reply: string;
  language: Lang;
  intent: HalaIntent;
  needsHuman: boolean;
  booking: HalaBooking | null;
  askedFor: string[];
};
