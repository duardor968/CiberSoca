import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Educativo IPVCE",
  description: "Portal educativo del IPVCE para estudiantes y personal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} ${fraunces.variable} antialiased`}>
        <div className="page-shell">
          <SiteHeader />
          <main className="page-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
