export type Lang = "en" | "ar";

export type Service = {
  id: string;
  nameEn: string;
  nameAr: string;
  durationMin: number;
  priceOmr: number;
  category: "exam" | "hygiene" | "cosmetic" | "restorative" | "surgical" | "ortho" | "emergency";
};

export type Staff = {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  languages: Lang[];
  serviceIds: string[];
  color: string;
};

export type DayHours = {
  weekday: number;
  open: string | null;
  close: string | null;
};

export type Faq = {
  id: string;
  qEn: string;
  qAr: string;
  aEn: string;
  aAr: string;
};

export type Appointment = {
  id: string;
  serviceId: string;
  staffId: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  notes: string;
  status: "booked" | "cancelled" | "completed" | "no-show";
  channel: "web" | "whatsapp" | "voice";
  conversationId: string;
  createdAt: string;
};

export type ChatRole = "patient" | "hala" | "staff" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  lang: Lang;
  at: string;
  appointmentId?: string;
};

export type Conversation = {
  id: string;
  channel: "web" | "whatsapp" | "voice";
  patientName: string;
  patientPhone: string;
  startedAt: string;
  updatedAt: string;
  status: "open" | "booked" | "handed-off" | "closed";
  messages: ChatMessage[];
  draft: BookingDraft;
};

export type BookingDraft = {
  serviceId?: string;
  staffId?: string;
  date?: string;
  time?: string;
  patientName?: string;
  patientPhone?: string;
  notes?: string;
};

export type AgentConfig = {
  nameEn: string;
  nameAr: string;
  greetingEn: string;
  greetingAr: string;
  afterHoursEn: string;
  afterHoursAr: string;
  handoffPhone: string;
  handoffName: string;
  voiceEnabled: boolean;
  requirePhone: boolean;
  personality: string;
};

export type ClinicProfile = {
  nameEn: string;
  nameAr: string;
  areaEn: string;
  areaAr: string;
  cityEn: string;
  cityAr: string;
  phone: string;
  whatsapp: string;
  addressEn: string;
  addressAr: string;
  parkingEn: string;
  parkingAr: string;
};

export type ClinicState = {
  clinic: ClinicProfile;
  services: Service[];
  staff: Staff[];
  hours: DayHours[];
  faqs: Faq[];
  insurance: string[];
  appointments: Appointment[];
  conversations: Conversation[];
  agent: AgentConfig;
  liveConversationId: string;
  uiLang: Lang;
};
