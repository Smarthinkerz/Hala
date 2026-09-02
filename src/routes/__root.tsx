import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { AppErrorComponent } from "@/lib/error-component";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { HydrateClinic } from "@/components/hydrate-clinic";
import appCss from "../styles.css?url";

const APP_NAME = "Hala";

export const Route = createRootRoute({
  errorComponent: AppErrorComponent,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hala — AI Clinic Receptionist" },
      { name: "theme-color", content: "#071318" },
      {
        name: "description",
        content:
          "Hala is the bilingual AI clinic receptionist. Answers patients, books real appointments, never sleeps. Gulf Arabic and English.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600&family=Noto+Kufi+Arabic:wght@500;600;700&family=Noto+Naskh+Arabic:wght@400;500&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <HydrateClinic />
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
