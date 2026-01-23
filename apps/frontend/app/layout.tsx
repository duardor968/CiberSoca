import type { Metadata } from "next";
import Script from "next/script";
import { cookies } from "next/headers";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "./components/layout-shell";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NEXA",
  description: "Portal educativo del IPVCE",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const resolvedTheme = cookieStore.get("theme_resolved")?.value;
  const storedTheme = cookieStore.get("theme")?.value;
  const htmlThemeClass = resolvedTheme === "dark" || storedTheme === "dark" ? "dark" : "";
  const themeInitScript = [
    "(function(){",
    "try {",
    "  var getCookie = function(name){",
    "    var match = document.cookie.split('; ').find(function(row){ return row.indexOf(name + '=') === 0; });",
    "    return match ? match.split('=')[1] : null;",
    "  };",
    "  var stored = localStorage.getItem('theme') || getCookie('theme');",
    "  var theme = stored === 'dark' || stored === 'light' ? stored : 'system';",
    "  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;",
    "  var shouldDark = theme === 'dark' || (theme === 'system' && prefersDark);",
    "  document.documentElement.classList.toggle('dark', shouldDark);",
    "  document.cookie = 'theme_resolved=' + (shouldDark ? 'dark' : 'light') + '; path=/; max-age=31536000';",
    "} catch (e) {}",
    "})();",
  ].join("");

  return (
    <html lang="es" className={htmlThemeClass} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className={`${spaceGrotesk.variable} ${fraunces.variable} min-h-screen antialiased`}>
        <div className="flex min-h-screen flex-col">
          <LayoutShell>{children}</LayoutShell>
        </div>
      </body>
    </html>
  );
}
