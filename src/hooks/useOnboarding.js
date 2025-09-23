"use client";

import { useEffect, useState, useMemo } from "react";
import Axios from "@/Config/Axios";

export const useOnboarding = () => {
  const [onboarding, setOnboarding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await Axios.get("/onboarding/get-Onboarding-Info");
        if (!isMounted) return;
        if (res?.data?.success) {
          setOnboarding(res.data.data?.data || null);
        } else {
          setError("Failed to load onboarding data");
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err?.response?.data?.message || "Failed to load onboarding data");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const brandData = useMemo(() => {
    const ob = onboarding || {};
    const business = ob.business || {};
    const visual = ob.visual || {};
    const brand = ob.brand || {};
    const customer = ob.customer || {};
    const campaign = ob.campaign || {};
    const social = ob.social || {};

    return {
      business_name: business.business_name || "",
      business_type: business.business_type || "",
      business_city: business.business_city || "",
      website_url: business.website_url || "",
      brand_colors: Array.isArray(visual.brand_colors) ? visual.brand_colors : (visual.brand_colors || []),
      target_market: customer.target_market || "",
      voice_tone_style: visual.voice_tone_style || brand.voice_tone_style || "",
      coaching_style: brand.coaching_style || "",
      brand_words: Array.isArray(brand.brand_words) ? brand.brand_words.join(", ") : (brand.brand_words || ""),
      words_to_avoid: Array.isArray(brand.words_to_avoid) ? brand.words_to_avoid.join(", ") : (brand.words_to_avoid || ""),
      main_problem: customer.main_problem || "",
      failed_solutions: customer.failed_solutions || "",
      client_words: customer.client_words || "",
      magic_wand_result: customer.magic_wand_result || "",
      campaign_types: Array.isArray(campaign.campaign_types) ? campaign.campaign_types : (campaign.campaign_types || []),
      seasonal_launch_options: Array.isArray(campaign.seasonal_launch_options) ? campaign.seasonal_launch_options : (campaign.seasonal_launch_options || []),
      instagram_reel_url: social.instagram_reel_url || "",
      meta_account: social.meta_account || "",
      competitor_urls: Array.isArray(social.competitor_urls) ? social.competitor_urls : (social.competitor_urls || []),
    };
  }, [onboarding]);

  return { onboarding, brandData, loading, error };
};












