'use client'
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { useAuth } from "@/context/authContext";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");

  const { resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError("Invalid or missing reset token");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await resetPassword(token, password, confirmPassword);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/auth");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex relative"
      style={{
        backgroundImage: `url('/lovable-uploads/c2ac9539-dfe7-4758-a5a0-46a4b95f3b84.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/15"></div>

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-white/5 backdrop-blur-sm relative">
        <div className="absolute inset-0 opacity-10 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-gray-500/20"></div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          <div className="flex items-center mb-16">
            <img
              src="/lovable-uploads/1b22bfb8-d910-46a5-bc37-d85de327a193.png"
              alt="Logo"
              className="w-12 h-12 mr-3 object-contain"
            />
            <span className="text-2xl font-bold text-white">FITNESSADS.AI</span>
          </div>

          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Reset Your Password
          </h1>

          <div className="flex items-center space-x-4 mt-8">
            <div className="h-1 w-16 bg-[#fa2a00]"></div>
            <div className="h-1 w-8 bg-[#fa2a00]"></div>
            <div className="h-1 w-4 bg-[#fa2a00]"></div>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="absolute top-6 left-6 flex items-center text-gray-300 hover:text-indigo-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>
      </div>

      {/* Right Side */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          <button
            onClick={() => router.push("/")}
            className="lg:hidden flex items-center text-gray-400 hover:text-indigo-500 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>

          <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-xl p-8 hover:bg-gray-700/30 transition-all">
            <div className="text-center mb-8">
              <Lock className="w-12 h-12 text-[#fa2a00] mx-auto mb-4" />
              <p className="text-sm text-gray-400 mb-2">RESET PASSWORD</p>
              <h2 className="text-3xl font-bold text-white">
                Create New Password
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-200"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    required
                    className="w-full h-12 px-4 pr-12 rounded-md bg-gray-900/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-200"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    required
                    className="w-full h-12 px-4 pr-12 rounded-md bg-gray-900/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-md bg-red-500/20 text-red-300 text-sm border border-red-400/40">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 rounded-md bg-green-500/20 text-green-300 text-sm border border-green-400/40">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full h-12 text-base font-medium bg-[#fa2a00] hover:bg-[#fa2a00e6] text-white rounded-md transition disabled:opacity-50"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-gray-400 text-sm">Remember your password? </span>
              <button
                type="button"
                onClick={() => router.push("/auth")}
                className="text-[#fa2a00] hover:underline font-medium text-sm"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
