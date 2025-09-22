"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const { data, error } = await authService.getProfile();
      if (error) {
        console.log(error)
        setUser(null);
      } else {
        setUser(data.data.user);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
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
      const { data, error } = await authService.login(email, password);
      if (error) {
        return { error };
      }
      // After successful login, fetch user profile
      await fetchUser();
      return { data, error: null };
    } catch (err) {
      console.error("Login error:", err);
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
      return { success: true };
    } catch (err) {
      console.error("Logout failed", err);
      setUser(null); // Still clear user even if API call fails
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
