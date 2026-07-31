import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoTicker } from "@/components/LogoTicker";
import { VideoBand } from "@/components/VideoBand";
import { Industries } from "@/components/Industries";
import { Gallery } from "@/components/Gallery";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { QuoteFlowModal } from "@/components/QuoteFlowModal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <LogoTicker />
      <VideoBand />
      <Industries />
      <Gallery />
      <CTABand />
      <Footer />
      <ExitIntentModal />
      <QuoteFlowModal />
    </main>
  );
}
