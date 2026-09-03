# Hala

Your AI Clinic Receptionist. Hala answers patients, speaks Gulf Arabic and English, checks real appointment availability, and books into the clinic calendar, 24/7.

Production URL: https://hala.eqence.com

Payments: clinic owners do not paste Tap keys. Hala POSTs SmarThinkerz Hub `/api/checkout` with slugs `hala-essential` ($300), `hala-plus` ($600), `hala-premium` ($1200). After Tap, Hub should send the owner to `https://hala.eqence.com/checkout/return`. Partner paid ping: `POST /api/smarthinkerz/webhook`.

Stack: React 19, TanStack Start, Tailwind v4, Better Auth, Postgres/Neon, Vercel. Time zone Asia/Muscat.
