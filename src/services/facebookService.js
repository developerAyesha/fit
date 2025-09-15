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
};


