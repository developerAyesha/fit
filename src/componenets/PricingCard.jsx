"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePlans } from "@/hooks/usePlans";

const PricingCard = ({
  plan,
  highlight,
  highlightLabel,
  buttonText,
  buttonStyle,
  className = "",
  onSelectPlan,
  
}) => {
  // Format price based on currency
  const formatPrice = (price, currency) => {
    // Currencies that use subdivision (100 units = 1 main unit)
    const subdividedCurrencies = ['GBP', 'USD', 'EUR', 'CAD', 'AUD', 'NZD', 'CHF', 'SEK', 'NOK', 'DKK'];
    
    if (subdividedCurrencies.includes(currency)) {
      const mainAmount = price / 100;
      return `${getCurrencySymbol(currency)}${mainAmount.toFixed(0)}`;
    } else {
      // For currencies without subdivision (JPY, KRW, etc.)
      return `${getCurrencySymbol(currency)}${price}`;
    }
  };

  // Get currency symbol
  const getCurrencySymbol = (currency) => {
    const symbols = {
      'GBP': '£',
      'USD': '$',
      'EUR': '€',
      'CAD': 'C$',
      'AUD': 'A$',
      'JPY': '¥',
      'KRW': '₩',
      'INR': '₹',
      'BRL': 'R$',
      'MXN': '$',
      'CHF': 'CHF',
      'SEK': 'kr',
      'NOK': 'kr',
      'DKK': 'kr'
    };
    return symbols[currency] || currency;
  };

  // Format billing period
  const formatPeriod = (billingPeriod) => {
    switch (billingPeriod) {
      case 'monthly':
        return 'per month';
      case 'yearly':
        return 'per year';
      case 'one_time':
        return 'one-time payment';
      default:
        return billingPeriod;
    }
  };

  return (
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
          {plan.name}
        </h3>
         <div
           className={`text-4xl font-black mb-2 ${
             highlight ? "text-[#FE0010]" : "text-white"
           }`}
         >
           {formatPrice(plan.price, plan.currency)}
         </div>
        <p
          className={`text-sm ${
            highlight ? "text-[#FE0010]/80" : "text-gray-400"
          }`}
        >
          {formatPeriod(plan.billing_period)}
        </p>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-8">
        {plan.features?.map((feature, idx) => (
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
        onClick={() => onSelectPlan && onSelectPlan(plan)}
        className={`w-full py-3 px-4 rounded-lg font-medium transition ${
          buttonStyle ||
          (highlight
            ? "bg-[#FE0010] text-white hover:bg-[#FE0010]/90"
            : "border border-gray-700 text-white hover:border-white/40")
        }`}
      >
        {buttonText || "Get Started"}
      </button>
    </div>
  );
};

export default function PricingSection() {
  const { plans, loading, error } = usePlans();
  const router = useRouter();

  const handleSelectPlan = (plan) => {
    // Redirect to checkout page with plan ID
    router.push(`/checkout?plan=${plan._id}`);
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-[#0F0F12]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-white text-xl">Loading plans...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-[#0F0F12]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-red-400 text-xl">Error loading plans: {error}</div>
          </div>
        </div>
      </section>
    );
  }

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
          {plans.map((plan, index) => {
            const isPopular = plan.is_popular;
            const isLifetime = plan.billing_period === 'one_time';
            
            return (
              <PricingCard
                key={plan._id}
                plan={plan}
                highlight={isPopular || isLifetime}
                highlightLabel={isPopular ? "POPULAR" : isLifetime ? "LIMITED SPOTS" : null}
                buttonText={isLifetime ? "Claim Your Spot" : "Get Started"}
                buttonStyle={isLifetime ? "bg-[#FE0010] text-white hover:bg-[#FE0010]/90" : undefined}
                className={isLifetime ? "border-2 border-[#FE0010] bg-[#FE0010]/5" : ""}
                onSelectPlan={handleSelectPlan}
              />
            );
          })}
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
