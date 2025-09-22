"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Calendar, LogOut, CreditCard, Lock, Loader2, Crown, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useSubscription } from "@/hooks/useSubscription";
import PricingModal from "@/componenets/PricingModal";

export default function Account() {
  const { user, logout, changePassword, loading } = useAuth();
  const { subscription, loading: subscriptionLoading, refetch: refetchSubscription } = useSubscription();
  const router = useRouter();
   console.log("subscription", subscription);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      // Direct redirect to home page without any messages
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
      // Still redirect even if logout fails
      router.push("/");
    }
  };

  const handlePricingModalClose = () => {
    setShowPricingModal(false);
    // Refetch subscription data in case it was updated
    refetchSubscription();
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsChangingPassword(true);

    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setIsChangingPassword(false);
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      setIsChangingPassword(false);
      return;
    }

    try {
      const { error } = await changePassword(form.currentPassword, form.newPassword, form.confirmPassword);
      if (error) {
        setError(error.message);
      } else {
        setMessage("✅ Password updated successfully");
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      const errorMessage = "Failed to change password. Please try again.";
      setError(errorMessage);
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark text-white flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-lg">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to home page immediately if no user
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2">Account Settings</h1>
        <p className="text-lg text-gray-400 mb-10">
          Manage your profile and account preferences
        </p>

        <div className="space-y-8 max-w-4xl">
          {/* Profile Information */}
          <Section title="Profile Information" icon={<User className="w-6 h-6 text-red-500" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Info label="Email Address" icon={<Mail className="w-5 h-5 text-red-500" />} value={user.email} />
              <Info
                label="Member Since"
                icon={<Calendar className="w-5 h-5 text-red-500" />}
                value={new Date(user.createdAt).toLocaleDateString()}
              />
            </div>
          </Section>

          {/* Subscription */}
          <Section title="Subscription" icon={<CreditCard className="w-6 h-6 text-red-500" />}>
            {subscriptionLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-red-500" />
                <span className="ml-3 text-white">Loading subscription...</span>
              </div>
            ) : subscription ? (
              <div className="space-y-4">
                {/* Current Plan Info */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-red-500/20">
                      <Crown className="w-6 h-6 text-red-500" />
                    </div>
              <div>
                      <p className="font-semibold text-lg text-white">
                        {subscription.plan?.name || 'Unknown Plan'}
                      </p>
                      <p className="text-gray-400">
                        {subscription.status === 'active' ? 'Active' : 
                         subscription.status === 'trial' ? 'Trial' :
                         subscription.status === 'lifetime' ? 'Lifetime' : 'Inactive'}
                        {subscription.current_period_end && 
                          ` • Renews ${new Date(subscription.current_period_end).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      subscription.status === 'active' ? 'bg-green-600 text-white' :
                      subscription.status === 'trial' ? 'bg-yellow-600 text-white' :
                      subscription.status === 'lifetime' ? 'bg-purple-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {subscription.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </div>
                </div>

                {/* Plan Features */}
                {subscription.plan?.features && (
                  <div className="p-4 rounded-lg bg-gray-800">
                    <h4 className="font-semibold text-white mb-3">Plan Features:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {subscription.plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Usage Stats */}
                {subscription.usage && (
                  <div className="p-4 rounded-lg bg-gray-800">
                    <h4 className="font-semibold text-white mb-3">Usage This Month:</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Ads Generated:</span>
                      <span className="text-white font-semibold">
                        {subscription.usage.ads_generated || 0}
                        {subscription.plan?.limits?.ads_per_month && 
                          ` / ${subscription.plan.limits.ads_per_month}`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPricingModal(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <Crown className="w-4 h-4" />
                    Upgrade Plan
                  </button>
                  
                  <button
                    onClick={async () => {
                      try {
                        // Call the portal endpoint to get the portal URL
                        const response = await fetch('/api/v1/subscriptions/portal', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                          }
                        });
                        
                        const result = await response.json();
                        if (result.success && result.data?.portal_url) {
                          window.open(result.data.portal_url, '_blank');
                        } else {
                          alert('Unable to access billing portal');
                        }
                      } catch (error) {
                        console.error('Error opening billing portal:', error);
                        alert('Unable to access billing portal');
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Manage Billing
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="p-4 rounded-lg bg-gray-800">
                  <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Active Subscription</h3>
                  <p className="text-gray-400 mb-4">
                    Choose a plan to start generating high-converting ads
                  </p>
              <button
                    onClick={() => setShowPricingModal(true)}
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors mx-auto"
              >
                    <Crown className="w-4 h-4" />
                    Choose Plan
              </button>
            </div>
              </div>
            )}
          </Section>

          {/* Account Actions */}
          <Section title="Account Actions">
            {/* Sign out */}
            <div className="flex justify-between items-center p-4 rounded-lg bg-background mb-6">
              <div>
                <p className="font-semibold text-lg">Sign Out</p>
                <p className="text-gray-400">Sign out of your account on this device</p>
              </div>
              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="flex text-brand hover:text-white items-center gap-2 px-6 py-2 border border-brand/50 rounded-lg hover:bg-brand-dark hover:border-brand-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoggingOut ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing Out...
                  </>
                ) : (
                  <>
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </>
                )}
              </button>
            </div>

            {/* Change password */}
            <div className="p-4 rounded-lg bg-bg-dark">
              <div className="mb-4">
                <p className="font-semibold text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-500" />
                  Change Password
                </p>
                <p className="text-gray-400">Update your account password</p>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <Field
                  label="Current Password"
                  type="password"
                  value={form.currentPassword}
                  onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                />
                <Field
                  label="New Password"
                  type="password"
                  value={form.newPassword}
                  onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                />
                <Field
                  label="Confirm New Password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />

                {error && <p className="text-sm text-red-400">{error}</p>}
                {message && <p className="text-sm text-green-400">{message}</p>}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="px-6 py-2 border border-brand text-brand hover:text-white rounded-lg hover:bg-brand hover:border-brand-dark"
                  >
                    {isChangingPassword ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </Section>
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricingModal}
        onClose={handlePricingModalClose}
        onPlanSelect={(plan) => {
          console.log('Selected plan:', plan);
          setShowPricingModal(false);
        }}
      />
    </div>
  );
}

/* --- Components --- */

function Section({ title, icon, children }) {
  return (
    <div className="border border-brand/20  rounded-lg bg-bg-dark p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Info({ label, icon, value }) {
  return (
    <div>
      <label className="text-base font-semibold flex items-center gap-2 mb-1 text-gray-300">
        {icon}
        {label}
      </label>
      <p className="text-white pl-7">{value}</p>
    </div>
  );
}

function Field({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-background rounded-lg border border-brand/20 focus:outline-none focus:ring-2 focus:ring-brand"
      />
    </div>
  );
}
