"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { planService } from "@/services/planService";
import { Check, ArrowLeft, CreditCard, Shield, Clock } from "lucide-react";
import Button from "@/utils/Button";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
      return;
    }

    const planId = searchParams.get("plan");
    if (planId) {
      fetchPlan(planId);
    } else {
      setError("No plan selected");
      setLoading(false);
    }
  }, [authLoading, user, searchParams, router]);

  const fetchPlan = async (planId) => {
    try {
      setLoading(true);
      const { data, error } = await planService.getPlanById(planId);
      
      if (error) {
        setError(error.message);
        return;
      }

      if (data) {
        setSelectedPlan(data);
      } else {
        setError("Plan not found");
      }
    } catch (err) {
      setError("Failed to load plan details");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!selectedPlan) return;

    try {
      setCheckoutLoading(true);
      setError("");

      const { data, error } = await planService.createCheckout(selectedPlan._id);
      
      if (error) {
        setError(error.message);
        return;
      }

      // Redirect to Stripe checkout
      if (data.data?.checkout_url) {
        window.location.href = data.data.checkout_url;
      } else {
        setError("Checkout URL not available");
      }
    } catch (err) {
      setError("Failed to create checkout session");
    } finally {
      setCheckoutLoading(false);
    }
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
      'GBP': '£', 'USD': '$', 'EUR': '€', 'CAD': 'C$', 'AUD': 'A$',
      'JPY': '¥', 'KRW': '₩', 'INR': '₹', 'BRL': 'R$', 'MXN': '$',
      'CHF': 'CHF', 'SEK': 'kr', 'NOK': 'kr', 'DKK': 'kr'
    };
    return symbols[currency] || currency;
  };

  const formatPeriod = (billingPeriod) => {
    switch (billingPeriod) {
      case 'monthly': return 'per month';
      case 'yearly': return 'per year';
      case 'one_time': return 'one-time payment';
      default: return billingPeriod;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 max-w-md w-full text-center">
          <div className="text-red-400 text-xl mb-4">Error</div>
          <p className="text-gray-300 mb-6">{error}</p>
          <Button
            variant="primary"
            onClick={() => router.push("/")}
          >
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 max-w-md w-full text-center">
          <div className="text-gray-400 text-xl mb-4">No Plan Selected</div>
          <Button
            variant="primary"
            onClick={() => router.push("/")}
          >
            Choose a Plan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold">Complete Your Purchase</h1>
          <p className="text-gray-400 mt-2">You're almost ready to start creating amazing ads!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Plan Summary</h2>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{selectedPlan.name}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {formatPrice(selectedPlan.price, selectedPlan.currency)}
                  </div>
                  <div className="text-sm text-gray-400">
                    {formatPeriod(selectedPlan.billing_period)}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">{selectedPlan.description}</p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="font-semibold">What's included:</h4>
              {selectedPlan.features?.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            
            {/* Security Features */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Secure payment powered by Stripe</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CreditCard className="h-4 w-4 text-blue-400" />
                <span>All major credit cards accepted</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Clock className="h-4 w-4 text-yellow-400" />
                <span>Instant access after payment</span>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Checkout Button */}
            <Button
              variant="primary"
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full py-3 text-lg font-semibold"
            >
              {checkoutLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay {formatPrice(selectedPlan.price, selectedPlan.currency)}
                </>
              )}
            </Button>

            {/* Terms */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By proceeding, you agree to our Terms of Service and Privacy Policy.
              You can cancel your subscription at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

