"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/authService";
import TokenManager from "@/utils/tokenManager.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      // Check if we have a token before making the request
      if (!TokenManager.hasAccessToken()) {
        console.log("No access token found, skipping user fetch");
        setUser(null);
        setLoading(false);
        return;
      }

      const { data, error } = await authService.getProfile();
      if (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
        // Clear token if profile fetch fails (token might be invalid)
        TokenManager.removeAccessToken();
      } else {
        setUser(data.data.user);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
      TokenManager.removeAccessToken();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Register
  const signUp = async (email, password, name, confirmPassword) => {
    try {
      const { data, error } = await authService.register({ email, password, name, confirmPassword });
      if (error) {
        return { error };
      }
      // After successful registration, fetch user profile
      await fetchUser();
      return { data, error: null };
    } catch (err) {
      console.error("Registration error:", err);
      return { error: { message: "Registration failed" } };
    }
  };

  // Login
  const signIn = async (email, password) => {
    try {
      console.log("🔐 [AuthContext] Starting login process...");
      const { data, error } = await authService.login(email, password);
      
      if (error) {
        console.error("❌ [AuthContext] Login failed:", error);
        return { error };
      }
      
      console.log("✅ [AuthContext] Login successful, data received:", {
        hasData: !!data,
        hasAccessToken: !!data?.data?.accessToken,
        userEmail: data?.data?.user?.email
      });
      
      // After successful login, fetch user profile
      console.log("🔐 [AuthContext] Fetching user profile...");
      await fetchUser();
      return { data, error: null };
    } catch (err) {
      console.error("❌ [AuthContext] Login error:", err);
      return { error: { message: "Login failed" } };
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const { data, error } = await authService.forgotPassword(email);
      return { data, error };
    } catch (err) {
      console.error("Forgot password error:", err);
      return { error: { message: "Failed to send reset email" } };
    }
  };

  // Reset password
  const resetPassword = async (token, password, confirmPassword) => {
    try {
      const { data, error } = await authService.resetPassword(token, password, confirmPassword);
      return { data, error };
    } catch (err) {
      console.error("Reset password error:", err);
      return { error: { message: "Password reset failed" } };
    }
  };

  // Change password
  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    try {
      const { data, error } = await authService.changePassword(currentPassword, newPassword, confirmPassword);
      return { data, error };
    } catch (err) {
      console.error("Change password error:", err);
      return { error: { message: "Password change failed" } };
    }
  };

  // Update profile
  const updateProfile = async (profileData) => {
    try {
      const { data, error } = await authService.updateProfile(profileData);
      if (error) {
        return { error };
      }
      // After successful update, fetch user profile
      await fetchUser();
      return { data, error: null };
    } catch (err) {
      console.error("Update profile error:", err);
      return { error: { message: "Profile update failed" } };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      TokenManager.clearAuth(); // Clear all auth data
      return { success: true };
    } catch (err) {
      console.error("Logout failed", err);
      setUser(null); // Still clear user even if API call fails
      TokenManager.clearAuth(); // Clear auth data even if API call fails
      throw err; // Re-throw to let the component handle the error
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        fetchUser, 
        logout, 
        signUp, 
        signIn, 
        forgotPassword, 
        resetPassword, 
        changePassword, 
        updateProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
