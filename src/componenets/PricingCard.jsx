"use client";

import { Check } from "lucide-react";

const PricingCard = ({
  title,
  price,
  period,
  features,
  highlight,
  highlightLabel,
  buttonText,
  buttonStyle,
  className = "",
}) => (
  <div
    className={`p-8 rounded-xl border bg-[#141416] relative overflow-hidden transition-all duration-300 ${className}`}
  >
    {highlight && (
      <div className="absolute top-0 right-0 bg-[#FE0010] text-white px-3 py-1 text-xs font-medium">
        {highlightLabel}
      </div>
    )}

    <div className="text-center mb-6 mt-4">
      <h3
        className={`text-xl font-bold mb-2 ${
          highlight ? "text-[#FE0010]" : "text-white"
        }`}
      >
        {title}
      </h3>
      <div
        className={`text-4xl font-black mb-2 ${
          highlight ? "text-[#FE0010]" : "text-white"
        }`}
      >
        {price}
      </div>
      <p
        className={`text-sm ${
          highlight ? "text-[#FE0010]/80" : "text-gray-400"
        }`}
      >
        {period}
      </p>
    </div>

    {/* Features */}
    <div className="space-y-3 mb-8">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              highlight ? "bg-[#FE0010]" : "bg-[#FE0010]/20"
            }`}
          >
            <Check
              className={`w-3 h-3 ${
                highlight ? "text-white" : "text-[#FE0010]"
              }`}
            />
          </div>
          <span className="text-sm text-gray-300">{feature}</span>
        </div>
      ))}
    </div>

    {/* Button */}
    <button
      className={`w-full py-3 px-4 rounded-lg font-medium transition ${
        buttonStyle ||
        (highlight
          ? "bg-[#FE0010] text-white hover:bg-[#FE0010]/90"
          : "border border-gray-700 text-white hover:border-white/40")
      }`}
    >
      {buttonText}
    </button>
  </div>
);

export default function PricingSection() {
  return (
    <section className="py-16 px-4 bg-[#0F0F12]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
            Professional Ads at a Fraction of Traditional Costs.
          </h2>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Pro Plan */}
          <PricingCard
            title="Pro"
            price="£99"
            period="per month"
            features={[
              "Unlimited ad generation",
              "Basic analytics",
              "Single user account",
            ]}
            buttonText="Get Started"
          />

          {/* Scale Plan */}
          <PricingCard
            title="Scale"
            price="£199"
            period="per month"
            features={[
              "Everything in Pro",
              "Advanced analytics",
              "Team accounts",
              "Multi-location support",
            ]}
            highlight
            highlightLabel="POPULAR"
            buttonText="Get Started"
          />

          {/* Lifetime Deal */}
          <PricingCard
            title="Lifetime Deal"
            price="£499"
            period="one-time payment"
            features={[
              "Everything in Scale",
              "Lifetime access",
              "Priority support",
              "Future updates included",
            ]}
            highlight
            highlightLabel="LIMITED SPOTS"
            buttonText="Claim Your Spot"
            buttonStyle="bg-[#FE0010] text-white hover:bg-[#FE0010]/90"
            className="border-2 border-[#FE0010] bg-[#FE0010]/5"
          />
        </div>

        {/* Reassurance */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-400">
            Start small. Test with £5/day. See results before you scale.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="px-6 py-3 rounded-lg bg-[#FE0010] text-white font-bold text-lg hover:bg-[#FE0010]/90 transition">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
