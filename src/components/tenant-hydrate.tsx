import { useEffect, useRef } from "react";
import { getMyClinic, getPublicClinic, publicBook, saveMyClinicState } from "@/lib/clinics";
import { clinicPayload, pauseClinicPersist, resumeClinicPersist, useClinic } from "@/lib/store";
import { LIVE_ID } from "@/lib/seed";

export function TenantHydrate({
  slug,
  mine,
}: {
  slug?: string;
  mine?: boolean;
}) {
  const loaded = useRef(false);

  useEffect(() => {
    let cancelled = false;
    pauseClinicPersist();
    (async () => {
      const data = mine ? await getMyClinic() : slug ? await getPublicClinic({ data: slug }) : null;
      if (cancelled || !data) return;
      loaded.current = true;
      useClinic.getState().hydrateTenant({
        id: data.id,
        slug: data.slug,
        state: data.state,
        entitlement: data.entitlement,
        publicDesk: !mine,
      });
    })().catch(() => {
      /* stay on demo */
    });

    return () => {
      cancelled = true;
      resumeClinicPersist();
      void useClinic.persist.rehydrate();
    };
  }, [slug, mine]);

  useEffect(() => {
    if (!mine) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const unsub = useClinic.subscribe((s) => {
      if (s.source !== "tenant" || !s.tenantId) return;
      clearTimeout(t);
      t = setTimeout(() => {
        void saveMyClinicState({ data: { state: clinicPayload(s) } });
      }, 800);
    });
    return () => {
      unsub();
      clearTimeout(t);
    };
  }, [mine]);

  useEffect(() => {
    if (mine) return;
    const unsub = useClinic.subscribe((s, prev) => {
      if (s.source !== "tenant" || !s.slug) return;
      if (s.appointments.length <= prev.appointments.length) return;
      const appointment = s.appointments[s.appointments.length - 1];
      const conversation = s.conversations.find((c) => c.id === (appointment.conversationId || LIVE_ID));
      void publicBook({ data: { slug: s.slug, appointment, conversation } });
    });
    return () => unsub();
  }, [mine]);

  return null;
}
