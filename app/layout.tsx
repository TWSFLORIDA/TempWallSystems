import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "TWS South Florida — ICRA Containment, Treasure Coast to the Keys",
  description:
    "Modular temporary walls for occupied renovations. ICRA-rated containment for healthcare, plus airports, labs, retail, and more. Serving the Treasure Coast down to the Florida Keys.",
  metadataBase: new URL("https://twssouthflorida.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
