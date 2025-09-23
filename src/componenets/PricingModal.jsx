"use client";

import { X, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePlans } from "@/hooks/usePlans";
import { useSubscription } from "@/hooks/useSubscription";

const PricingModal = ({ isOpen, onClose, onPlanSelect }) => {
  const router = useRouter();
  const { plans, loading: plansLoading } = usePlans();
  const { subscription, loading: subscriptionLoading } = useSubscription();


  if (!isOpen) return null;

  const handleUpgrade = (plan) => {
    // Don't allow upgrading to the same plan
    if (isCurrentPlan(plan._id)) {
      return;
    }

    // Close the modal first
    onClose();
    
    // Redirect to checkout page with plan ID
    router.push(`/checkout?plan=${plan._id}`);
  };

  const formatPrice = (price, currency) => {
    const subdividedCurrencies = ['GBP', 'USD', 'EUR', 'CAD', 'AUD', 'NZD', 'CHF', 'SEK', 'NOK', 'DKK'];
    
    if (subdividedCurrencies.includes(currency)) {
      const mainAmount = price / 100;
      return `${getCurrencySymbol(currency)}${mainAmount.toFixed(0)}`;
    } else {
      return `${getCurrencySymbol(currency)}${price}`;
    }
  };

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

  const isCurrentPlan = (planId) => {
    // Check if the plan ID matches the current subscription plan
    if (!subscription?.plan?.name || !plans.length) return false;
    
    // Find the plan in the plans array that matches the current subscription plan name
    const currentPlan = plans.find(plan => plan.name === subscription.plan.name);
    return currentPlan?._id === planId;
  };

  const getButtonText = (plan) => {
    if (isCurrentPlan(plan._id)) {
      return "Current Plan";
    }
    return "Upgrade";
  };

  const getButtonStyle = (plan) => {
    if (isCurrentPlan(plan._id)) {
      return "bg-green-600 text-white cursor-not-allowed";
    }
    return "bg-red-600 hover:bg-red-700 text-white";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Choose Your Plan</h2>
            <p className="text-gray-400 mt-1">Upgrade to unlock more features</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {plansLoading || subscriptionLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-red-500" />
              <span className="ml-3 text-white">Loading plans...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className={`p-6 rounded-xl border transition-all duration-300 ${
                    isCurrentPlan(plan._id)
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-red-500'
                  }`}
                >
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    {isCurrentPlan(plan._id) && (
                      <div className="bg-green-600 text-white text-xs px-3 py-1 rounded-full mb-3 inline-block">
                        Current Plan
                      </div>
                    )}
                    <h3 className={`text-xl font-bold mb-2 ${
                      isCurrentPlan(plan._id) ? 'text-green-400' : 'text-white'
                    }`}>
                      {plan.name}
                    </h3>
                    <div className={`text-4xl font-black mb-2 ${
                      isCurrentPlan(plan._id) ? 'text-green-400' : 'text-white'
                    }`}>
                      {formatPrice(plan.price, plan.currency)}
                    </div>
                    <p className={`text-sm ${
                      isCurrentPlan(plan._id) ? 'text-green-400/80' : 'text-gray-400'
                    }`}>
                      {formatPeriod(plan.billing_period)}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features?.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isCurrentPlan(plan._id) ? 'bg-green-600' : 'bg-red-600'
                        }`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleUpgrade(plan)}
                    disabled={isCurrentPlan(plan._id)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition ${getButtonStyle(plan)}`}
                  >
                    {getButtonText(plan)}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-gray-800/50">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              All plans include secure payment processing via Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
