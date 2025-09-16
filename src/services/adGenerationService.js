import Axios from '@/Config/Axios';

// Base URL for your backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class AdGenerationService {
  // Get all campaign templates
  async getCampaignTemplates(category = null) {
    try {
      const params = category ? { category } : {};
      const response = await Axios.get(`/campaign-templates`, { params });
      // Extract the campaigns array from the paginated response
      return response.data.data.data || response.data.data; // Handle both paginated and non-paginated responses
    } catch (error) {
      console.error('Error fetching campaign templates:', error);
      throw error;
    }
  }

  // Get top performing ads for a specific campaign
  async getTopPerformingAds(campaignId) {
    try {
      const response = await Axios.get(`/ad-generation/campaigns/${campaignId}/top-ads`);
      // Extract the ads array from the paginated response
      return response.data.data.data || response.data.data;
    } catch (error) {
      console.error('Error fetching top performing ads:', error);
      throw error;
    }
  }

  // Get all available ad types
  async getAdTypes() {
    try {
      const response = await Axios.get(`/ad-generation/ad-types`);
      // Extract the ad types array from the paginated response
      return response.data.data.data || response.data.data;
    } catch (error) {
      console.error('Error fetching ad types:', error);
      throw error;
    }
  }

  // Generate ad content
  async generateAdContent(adType, campaignId, brandData) {
    try {
      const response = await Axios.post(`/ad-generation/generate`, {
        adType,
        campaignId,
        brandData
      });
      return response.data.data;
    } catch (error) {
      console.error('Error generating ad content:', error);
      throw error;
    }
  }

  // Get ad generation stats
  async getStats() {
    try {
      const response = await Axios.get(`/ad-generation/stats`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
}

export default new AdGenerationService();
