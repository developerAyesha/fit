import { useState, useEffect } from 'react';
import adGenerationService from '@/services/adGenerationService';
import { useAuth } from '@/context/authContext';

export const useAdGeneration = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [adTypes, setAdTypes] = useState([]);
  const [topAds, setTopAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load campaigns
  const loadCampaigns = async (category = null) => {
    try {
      setLoading(true);
      setError(null);
      const data = await adGenerationService.getCampaignTemplates(category);
      setCampaigns(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load ad types
  const loadAdTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adGenerationService.getAdTypes();
      setAdTypes(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading ad types:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load top performing ads for a campaign
  const loadTopAds = async (campaignId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await adGenerationService.getTopPerformingAds(campaignId);
      setTopAds(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading top ads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Generate ad content
  const generateContent = async (adType, campaignId, brandData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Call the real API
      const data = await adGenerationService.generateAdContent(adType, campaignId, brandData);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error generating content:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Generate complete ad campaign
  const generateCompleteCampaign = async (campaignId, brandData, campaignSettings) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await adGenerationService.generateCompleteAdCampaign(campaignId, brandData, campaignSettings);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error generating complete campaign:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Generate five specific ad types
  const generateFiveAdTypes = async (campaignId, brandData) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await adGenerationService.generateFiveAdTypes(campaignId, brandData);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error generating five ad types:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    if (user) {
      loadCampaigns();
      loadAdTypes();
    }
  }, [user]);

  return {
    campaigns,
    adTypes,
    topAds,
    loading,
    error,
    loadCampaigns,
    loadAdTypes,
    loadTopAds,
    generateContent,
    generateCompleteCampaign,
    generateFiveAdTypes
  };
};
