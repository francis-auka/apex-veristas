import type { Metadata } from "next";
import HeroSection    from "@/components/public/HeroSection";
import SolutionCards  from "@/components/public/SolutionCards";
import HowItWorks     from "@/components/public/HowItWorks";
import IndustriesGrid from "@/components/public/IndustriesGrid";
import Testimonials   from "@/components/public/Testimonials";
import CTABanner      from "@/components/public/CTABanner";

export const metadata: Metadata = {
  title: "Apex Veritas | Virtual HSEQ Solutions — Safety Without Borders",
  description:
    "Apex Veritas is the leading virtual HSEQ compliance platform for companies in Kenya and UAE. Manage safety, environment, quality and health compliance from one powerful dashboard.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SolutionCards />
      <HowItWorks />
      <IndustriesGrid />
      <Testimonials />
      <CTABanner />
    </>
  );
}
