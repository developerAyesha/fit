import Axios from "@/Config/Axios";

export const facebookService = {
  // Get Facebook connection URL
  getConnectURL: async () => {
    try {
      const response = await Axios.get("/facebook/connect");
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to get Facebook connect URL",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Handle Facebook callback
  handleCallback: async (code, state) => {
    try {
      const response = await Axios.get(`/facebook/callback?code=${code}&state=${state}`);
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to handle Facebook callback",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Get Facebook accounts
  getAccounts: async () => {
    try {
      const response = await Axios.get("/facebook/accounts");
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to get Facebook accounts",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Get account currency information
  getAccountInfo: async (adAccountId) => {
    try {
      console.log("🔍 [Frontend] Calling getAccountInfo for adAccountId:", adAccountId);
      const response = await Axios.get(`/facebook/account/${adAccountId}/info`);
      console.log("✅ [Frontend] getAccountInfo response:", response.data);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("❌ [Frontend] getAccountInfo error:", error);
      console.error("❌ [Frontend] Error response:", error.response?.data);
      console.error("❌ [Frontend] Error status:", error.response?.status);
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to get account information",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Select Facebook account
  selectAccount: async (adAccountId, pageId) => {
    try {
      const response = await Axios.post("/facebook/select-account", {
        ad_account_id: adAccountId,
        page_id: pageId
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to select Facebook account",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Check Facebook connection status
  checkConnectionStatus: async () => {
    try {
      const response = await Axios.get("/facebook/accounts");
      return { 
        data: { 
          isConnected: true, 
          accounts: response.data.data 
        }, 
        error: null 
      };
    } catch (error) {
      if (error.response?.status === 400) {
        return { 
          data: { 
            isConnected: false, 
            accounts: null 
          }, 
          error: null 
        };
      }
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to check Facebook connection",
          status: error.response?.status || 500
        }
      };
    }
  }
  ,

  // Create Facebook Ad
  createAd: async (payload, mediaFile = null) => {
    try {
      console.log("🚀 Sending ad creation request to:", "/facebook/create-ad-with-media");
      console.log("📦 Payload:", JSON.stringify(payload, null, 2));
      console.log("📁 Media File:", mediaFile ? { name: mediaFile.name, size: mediaFile.size, type: mediaFile.type } : "No media file");
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add all payload fields to FormData
      Object.keys(payload).forEach(key => {
        if (payload[key] !== null && payload[key] !== undefined) {
          if (typeof payload[key] === 'object') {
            formData.append(key, JSON.stringify(payload[key]));
          } else {
            formData.append(key, payload[key]);
          }
        }
      });
      
      // Add media file if provided
      if (mediaFile) {
        formData.append('media', mediaFile);
      }
      
      const response = await Axios.post("/facebook/create-ad-with-media", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log("✅ Ad creation response:", response.data);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("❌ Ad creation error:", error);
      console.error("❌ Error response:", error.response?.data);
      console.error("❌ Error status:", error.response?.status);
      console.error("❌ Error headers:", error.response?.headers);
      
      // Extract currency-specific error information
      const errorData = error.response?.data?.error || {};
      let errorMessage = errorData.message || "Failed to create Facebook ad";
      
      // Handle budget-related errors with currency information
      if (errorData.error_subcode === 1885272 && errorData.error_user_msg) {
        errorMessage = `Budget Error: ${errorData.error_user_msg}. Please increase your daily budget to meet the minimum requirement for your account's currency.`;
      }
      
      return {
        data: null,
        error: {
          message: errorMessage,
          status: error.response?.status || 500,
          details: error.response?.data || error.message,
          currency_info: errorData.error_user_msg || null
        }
      };
    }
  }
};






