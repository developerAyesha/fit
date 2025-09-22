// Token management utilities

export const TokenManager = {
  // Store access token in localStorage
  setAccessToken: (token) => {
    try {
      if (!token) {
        console.error("❌ Cannot store empty token");
        return false;
      }
      
      localStorage.setItem('accessToken', token);
      console.log("✅ Access token stored successfully");
      console.log("✅ Token preview:", token.substring(0, 20) + "...");
      return true;
    } catch (error) {
      console.error("❌ Failed to store access token:", error);
      return false;
    }
  },

  // Get access token from localStorage
  getAccessToken: () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        console.log("🔍 Token retrieved from localStorage:", token.substring(0, 20) + "...");
      } else {
        console.log("🔍 No token found in localStorage");
      }
      return token;
    } catch (error) {
      console.error("❌ Failed to get access token:", error);
      return null;
    }
  },

  // Remove access token from localStorage
  removeAccessToken: () => {
    try {
      localStorage.removeItem('accessToken');
      console.log("✅ Access token removed successfully");
    } catch (error) {
      console.error("❌ Failed to remove access token:", error);
    }
  },

  // Check if access token exists
  hasAccessToken: () => {
    const token = TokenManager.getAccessToken();
    return !!token;
  },

  // Clear all authentication data
  clearAuth: () => {
    TokenManager.removeAccessToken();
    // Add other auth-related localStorage items here if needed
  },

  // Test function to verify token system
  testTokenSystem: () => {
    console.log("🧪 [TokenManager] Testing token system...");
    
    const currentToken = TokenManager.getAccessToken();
    console.log("🧪 [TokenManager] Current token:", currentToken ? "EXISTS" : "NOT FOUND");
    
    if (currentToken) {
      console.log("🧪 [TokenManager] Token preview:", currentToken.substring(0, 20) + "...");
      console.log("🧪 [TokenManager] Token length:", currentToken.length);
    }
    
    return {
      hasToken: !!currentToken,
      tokenLength: currentToken?.length || 0,
      tokenPreview: currentToken?.substring(0, 20) + "..." || "No token"
    };
  }
};

export default TokenManager;
