"use client";

import HeroSection from "@/componenets/home/HeroSection";
import ProofTilesSection from "@/componenets/home/ProofTilesSection";
import AIExplainerSection from "@/componenets/home/AIExplainerSection";
import ResultsShowcase from "@/componenets/home/ResultsShowcase";
import ChatGPTDriveSection from "@/componenets/home/ChatgptDriven";
import AdCostSection from "@/componenets/home/AdCostSection";
import ComparisonTable from "@/componenets/home/ComparisonTable";
import WhoItsForSection from "@/componenets/home/WHOITIS";
import PricingSection from "@/componenets/home/PricingCard";
import FAQ from "@/componenets/home/FAQ";
import FinalCTA from "@/componenets/home/CTA";
import Footer from "@/componenets/home/Footer";

export default function Hero() {

  return (
    <div className="bg-background">
      <HeroSection />
      <ProofTilesSection />
      <AIExplainerSection />
      <ResultsShowcase />
      <ChatGPTDriveSection />
      <AdCostSection />
      <ComparisonTable />
      <WhoItsForSection />
      <PricingSection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
