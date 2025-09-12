import Axios from "@/Config/Axios";

export const authService = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await Axios.post("/auth/register", userData);
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Registration failed",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await Axios.post("/auth/login", { email, password });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Login failed",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await Axios.post("/auth/forgot-password", { email });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to send reset email",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Reset password
  resetPassword: async (token, password, confirmPassword) => {
    try {
      const response = await Axios.post("/auth/reset-password", { token, password, confirmPassword });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Password reset failed",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Change password (requires authentication)
  changePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      const response = await Axios.post("/auth/change-password", { 
        currentPassword, 
        newPassword,
        confirmPassword
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Password change failed",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Get user profile
  getProfile: async () => {
    console.log("get profile called");
    
    try {
      const response = await Axios.get("/auth/profile");
      console.log("profile response:", response);
      
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to fetch profile",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Update profile
  updateProfile: async (profileData) => {
    try {
      const response = await Axios.put("/auth/profile", profileData);
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Profile update failed",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await Axios.post("/auth/logout");
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Logout failed",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await Axios.get(`/auth/verify-email/${token}`);
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Email verification failed",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Resend verification email
  resendVerification: async (email) => {
    try {
      const response = await Axios.post("/auth/resend-verification", { email });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to resend verification email",
          status: error.response?.status || 500
        }
      };
    }
  }
};
