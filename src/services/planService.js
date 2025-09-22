import Axios from "@/Config/Axios";

export const planService = {
  // Get all active plans
  getPlans: async () => {
    try {
      const response = await Axios.get("/plans");
      // Extract the data array from the API response
      return { data: response.data.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to fetch plans",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Get single plan by ID
  getPlanById: async (planId) => {
    try {
      const response = await Axios.get(`/plans/${planId}`);
      return { data: response.data.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to fetch plan details",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Get current user's subscription
  getCurrentSubscription: async () => {
    try {
      const response = await Axios.get("/subscriptions/current");
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to fetch subscription",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Create checkout session
  createCheckout: async (planId) => {
    try {
      const response = await Axios.post("/subscriptions/checkout", { plan_id: planId });
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to create checkout session",
          status: error.response?.status || 500
        }
      };
    }
  },

  // Create customer portal session
  createPortalSession: async () => {
    try {
      const response = await Axios.post("/subscriptions/portal");
      return { data: response.data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: {
          message: error.response?.data?.message || "Failed to create portal session",
          status: error.response?.status || 500
        }
      };
    }
  }
};

