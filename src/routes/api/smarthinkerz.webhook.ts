import { createFileRoute } from "@tanstack/react-router";
import { applyPartnerPaid } from "@/lib/orders";
import { verifyPartnerSignature, type PartnerPaidPayload } from "@/lib/partner-webhook";

export const Route = createFileRoute("/api/smarthinkerz/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const secret = process.env.SMARTHINKERZ_PARTNER_SECRET ?? "";
        if (secret) {
          const header = request.headers.get("x-smarthinkerz-signature");
          if (!verifyPartnerSignature(raw, header, secret)) {
            return Response.json({ error: "invalid signature" }, { status: 401 });
          }
        }
        let body: PartnerPaidPayload = {};
        try {
          body = JSON.parse(raw) as PartnerPaidPayload;
        } catch {
          return Response.json({ error: "invalid json" }, { status: 400 });
        }
        const event = body.event || body.type || request.headers.get("x-smarthinkerz-event") || "";
        if (event && event !== "order.paid") {
          return Response.json({ received: true, ignored: event });
        }
        const result = await applyPartnerPaid({
          reference: body.reference || body.external_ref,
          chargeId: body.tap_id || body.chargeId || body.order_id,
          clinicId: body.clinicId || body.clinic_id,
          email: body.email || body.customer_email,
        });
        return Response.json({ received: true, ...result });
      },
    },
  },
});
