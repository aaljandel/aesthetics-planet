import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Aesthetics Planet";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aesthetics Planet — Aesthetic medicine in Marylebone & Chelsea" },
      {
        name: "description",
        content:
          "A sample doctor-led London practice site for neuromodulators, hyaluronic acid fillers, ultrasound, light, and medical skincare. Named products, licensed uses, downtime, and room pricing in pounds.",
      },
      { name: "theme-color", content: "#f3f0ea" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "var(--color-ink)",
              color: "var(--color-foam)",
              border: "1px solid var(--color-ink-2)",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
        <Scripts />
      </body>
    </html>
  ),
});

export { APP_NAME };
