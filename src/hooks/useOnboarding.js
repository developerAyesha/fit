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

    return {
      business_name: business.business_name || "",
      business_type: business.business_type || "",
      business_city: business.business_city || "",
      target_market: customer.target_market || "",
      voice_tone_style: visual.voice_tone_style || brand.voice_tone_style || "",
      coaching_style: brand.coaching_style || "",
      brand_words: Array.isArray(brand.brand_words) ? brand.brand_words.join(", ") : (brand.brand_words || ""),
      words_to_avoid: Array.isArray(brand.words_to_avoid) ? brand.words_to_avoid.join(", ") : (brand.words_to_avoid || ""),
      main_problem: customer.main_problem || "",
      failed_solutions: customer.failed_solutions || "",
      client_words: customer.client_words || "",
      magic_wand_result: customer.magic_wand_result || "",
      website_url: business.website_url || ""
    };
  }, [onboarding]);

  return { onboarding, brandData, loading, error };
};











