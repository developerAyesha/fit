'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Mail } from "lucide-react";
import { useAuth } from "@/context/authContext";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const { signIn, signUp, forgotPassword, resetPassword, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");;
  }, [user]);

//   const checkOnboardingStatus = async (userId) => {
//     const { data, error } = await supabase
//       .from("user_onboarding")
//       .select("completed_at")
//       .eq("user_id", userId)
//       .single();

//     if (error && error.code !== "PGRST116") {
//       console.error("Error checking onboarding status:", error);
//       return false;
//     }
//     return data?.completed_at !== null;
//   };


const handleGoogleSignIn = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api/v1";
  window.location.href = `${baseUrl}/auth/google`;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          router.push("/dashboard");
        }
      } else {
        // Validate password confirmation for registration
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(email, password, fullName, confirmPassword);
        if (error) {
          setError(error.message);
        } else {
          setSuccess("Account created successfully! Please check your email to verify your account.");
          setTimeout(() => router.push("/onboarding"), 2000);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { error } = await forgotPassword(email);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Password reset email sent! Please check your inbox.");
        setShowForgotPassword(false);
      }
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await resetPassword(resetToken, newPassword, confirmNewPassword);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Password reset successfully! You can now log in with your new password.");
        setShowForgotPassword(false);
        setIsLogin(true);
        setResetToken("");
        setNewPassword("");
        setConfirmNewPassword("");
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
      {/* Much lighter overlay for better background visibility */}
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
            Your Brand. Your Voice. AI Generated Campaigns That{" "}
            <span className="text-[#fa2a00]">Perform</span>
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
              <p className="text-sm text-gray-400 mb-2">
                {isLogin ? "WELCOME BACK" : "GET STARTED"}
              </p>
              <h2 className="text-3xl font-bold text-white">
                {isLogin ? "Log in to FitnessAds.ai" : "Create your account"}
              </h2>
            </div>

            {!showForgotPassword ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <label
                      htmlFor="fullName"
                      className="text-sm font-medium text-gray-200"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full h-12 px-4 rounded-md bg-gray-900/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johnsondoe@nomail.com"
                    required
                    className="w-full h-12 px-4 rounded-md bg-gray-900/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-200"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••••••"
                      required
                      className="w-full h-12 px-4 pr-12 rounded-md bg-gray-900/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

                {!isLogin && (
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-200"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••••••"
                        required
                        className="w-full h-12 px-4 pr-12 rounded-md bg-gray-900/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                )}

                {isLogin && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-[#fa2a00] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

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
                  disabled={loading}
                  className="w-full h-12 text-base font-medium bg-[#fa2a00] hover:bg-[#fa2a00e6] text-white rounded-md transition disabled:opacity-50"
                >
                  {loading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
                </button>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full h-12 mt-4 text-base font-medium bg-white text-black border border-gray-300 hover:bg-gray-100 rounded-md flex items-center justify-center gap-2"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google logo"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </button>
              </form>
            ) : (
              <form onSubmit={resetToken ? handleResetPassword : handleForgotPassword} className="space-y-6">
                <div className="text-center mb-6">
                  <Mail className="w-12 h-12 text-[#fa2a00] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {resetToken ? "Reset Your Password" : "Forgot Password?"}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {resetToken 
                      ? "Enter your new password below" 
                      : "Enter your email address and we'll send you a reset link"
                    }
                  </p>
                </div>

                {resetToken && (
                  <>
                    <div className="space-y-2">
                      <label
                        htmlFor="newPassword"
                        className="text-sm font-medium text-gray-200"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
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
                        htmlFor="confirmNewPassword"
                        className="text-sm font-medium text-gray-200"
                      >
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmNewPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                  </>
                )}

                {!resetToken && (
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-200"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="johnsondoe@nomail.com"
                      required
                      className="w-full h-12 px-4 rounded-md bg-gray-900/40 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fa2a00]"
                    />
                  </div>
                )}

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
                  disabled={loading}
                  className="w-full h-12 text-base font-medium bg-[#fa2a00] hover:bg-[#fa2a00e6] text-white rounded-md transition disabled:opacity-50"
                >
                  {loading ? "Loading..." : resetToken ? "Reset Password" : "Send Reset Email"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetToken("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                    setError("");
                    setSuccess("");
                  }}
                  className="w-full h-12 text-base font-medium bg-gray-600 hover:bg-gray-700 text-white rounded-md transition"
                >
                  Back to {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <span className="text-gray-400 text-sm">
                {isLogin ? "New User? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                  setFullName("");
                }}
                className="text-[#fa2a00] hover:underline font-medium text-sm"
              >
                {isLogin ? "SIGN UP HERE" : "SIGN IN HERE"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
