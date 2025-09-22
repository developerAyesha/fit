"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useAdGeneration } from "@/hooks/useAdGeneration";
import { useOnboarding } from "@/hooks/useOnboarding";
import {
  ArrowLeft,
  Loader2,
  CheckCircle,
  Copy,
  Lightbulb,
  Target,
  MessageSquare,
  Users,
  Settings,
  Save,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Globe,
  DollarSign,
  Calendar,
  User,
  RefreshCw
} from "lucide-react";
import Button from "@/utils/Button";
import { facebookService } from "@/services/facebookService";

const FiveAdTypesGenerator = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { brandData, loading: onboardingLoading } = useOnboarding();
  const { campaigns, generateFiveAdTypes, generateContent, loading } = useAdGeneration();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});
  const [regeneratingStates, setRegeneratingStates] = useState({});
  const [showRegeneratedContent, setShowRegeneratedContent] = useState({});
  const [formData, setFormData] = useState({
    daily_budget: "",
    campaign_objective: "",
    geo_location: [],
    age_min: "",
    age_max: ""
  });
  const [selectedContent, setSelectedContent] = useState({
    campaign_name: "",
    generated_headline: "",
    generated_description: "",
    adset_name: "",
    ad_name: ""
  });

  // Prefer onboarding brand data; fallback to minimal safe defaults
  console.log("brandData",brandData); 
  const effectiveBrandData = brandData || {
    business_name: "",
    business_type: "",
    business_city: "",
    target_market: "",
    voice_tone_style: "",
    coaching_style: "",
    brand_words: "",
    words_to_avoid: "",
    main_problem: "",
    failed_solutions: "",
    client_words: "",
    magic_wand_result: "",
    website_url: ""
  };

  // Campaign objectives
  const campaignObjectives = [
    "CONVERSIONS",
    "TRAFFIC",
    "ENGAGEMENT",
    "AWARENESS",
    "LEAD_GENERATION",
    "SALES",
    "APP_INSTALLS",
    "REACH"
  ];

  // Countries list
  const countries = [
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "NL", name: "Netherlands" },
    { code: "SE", name: "Sweden" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCountryToggle = (countryCode) => {
    setFormData(prev => ({
      ...prev,
      geo_location: prev.geo_location.includes(countryCode)
        ? prev.geo_location.filter(code => code !== countryCode)
        : [...prev.geo_location, countryCode]
    }));
  };

  const handleGenerateFiveAdTypes = async () => {
    if (!selectedCampaign) {
      alert('Please select a campaign first');
      return;
    }
    
    try {
      setIsGenerating(true);
      
      const result = await generateFiveAdTypes(
        selectedCampaign._id, 
        effectiveBrandData
      );
      
      setGeneratedContent(result);
      setSelectedContent({
        campaign_name: result.campaign_name || "",
        generated_headline: result.generated_headline || "",
        generated_description: result.generated_description || "",
        adset_name: result.adset_name || "",
        ad_name: result.ad_name || ""
      });
      // Don't show AI content initially - only show text fields
      setShowRegeneratedContent({});
      setCurrentStep(2);
      
    } catch (error) {
      console.error('Error generating five ad types:', error);
      alert('Error generating content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async (adType) => {
    if (!selectedCampaign) return;
    
    try {
      setRegeneratingStates(prev => ({ ...prev, [adType]: true }));
      
      // Map UI keys to backend enum ad types
      const adTypeMap = {
        generated_headline: 'ad_headline',
        generated_description: 'ad_description',
        campaign_name: 'campaign_name',
        adset_name: 'adset_name',
        ad_name: 'ad_name'
      };
      const backendAdType = adTypeMap[adType] || adType;

      const result = await generateContent(backendAdType, selectedCampaign._id, effectiveBrandData);
      console.log("result of ai generation",result);      
      // The API returns an object with a 'content' property
      let newContent;
      if (result && typeof result === 'object' && result.content) {
        // Parse the content to get the first meaningful item
        const parsedItems = result.content.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => line.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim())
          .filter(line => line.length > 10);
        
        newContent = parsedItems.length > 0 ? parsedItems[0] : result.content.trim();
      } else if (typeof result === 'string') {
        // Fallback if result is directly a string
        const parsedItems = result.split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .map(line => line.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '').trim())
          .filter(line => line.length > 10);
        
        newContent = parsedItems.length > 0 ? parsedItems[0] : result.trim();
      } else {
        // Final fallback
        newContent = String(result).trim();
      }
      
      setGeneratedContent(prev => ({
        ...prev,
        [adType]: newContent
      }));
      
      // Show the regenerated content below the text field
      setShowRegeneratedContent(prev => ({
        ...prev,
        [adType]: newContent
      }));
      
    } catch (error) {
      console.error(`Error regenerating ${adType}:`, error);
      alert(`Error regenerating ${adType}. Please try again.`);
    } finally {
      setRegeneratingStates(prev => ({ ...prev, [adType]: false }));
    }
  };

  const handleCopy = async (content, type) => {
    if (content) {
      await navigator.clipboard.writeText(content);
      setCopiedStates(prev => ({ ...prev, [type]: true }));
      
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
    }
  };

  const handleUseThis = (content, type) => {
    // Apply the AI content to the text field
    setSelectedContent(prev => ({
      ...prev,
      [type]: content
    }));
  };

  const handleContentChange = (type, value) => {
    setSelectedContent(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setSelectedCampaign(null);
      setGeneratedContent(null);
      setSelectedContent({
        campaign_name: "",
        generated_headline: "",
        generated_description: "",
        adset_name: "",
        ad_name: ""
      });
      setCopiedStates({});
      setRegeneratingStates({});
      setShowRegeneratedContent({});
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSave = async () => {
    try {
      // Map campaign objective to backend-accepted values
      const objectiveMap = {
        CONVERSIONS: 'OUTCOME_SALES',
        TRAFFIC: 'OUTCOME_TRAFFIC',
        ENGAGEMENT: 'OUTCOME_ENGAGEMENT',
        AWARENESS: 'OUTCOME_TRAFFIC',
        LEAD_GENERATION: 'OUTCOME_LEADS',
        SALES: 'OUTCOME_SALES',
        APP_INSTALLS: 'OUTCOME_TRAFFIC',
        REACH: 'OUTCOME_TRAFFIC'
      };

      const mappedObjective = objectiveMap[formData.campaign_objective] || 'OUTCOME_TRAFFIC';

      // Ensure daily budget is in pence (backend expects min 500)
      const dailyBudgetNumber = Number(formData.daily_budget || 0);
      const dailyBudgetPence = Math.round(dailyBudgetNumber * 100);

      // Enforce headline <= 40 chars as validator requires
      const safeHeadline = (selectedContent.generated_headline || '').trim().slice(0, 40);

      const payload = {
        campaign_name: selectedContent.campaign_name,
        adset_name: selectedContent.adset_name,
        ad_name: selectedContent.ad_name,
        website_url: effectiveBrandData.website_url || "https://example.com",
        daily_budget: dailyBudgetPence,
        generated_headline: safeHeadline,
        generated_description: selectedContent.generated_description,
        generated_call_to_action: "SHOP_NOW", // TODO: add selector if needed
        campaign_objective: mappedObjective,
        targeting_config: {
          geo_locations: {
            countries: formData.geo_location && formData.geo_location.length > 0 ? formData.geo_location : ["GB"]
          },
          age_min: Number(formData.age_min || 25),
          age_max: Number(formData.age_max || 55)
        }
      };

      const { data, error } = await facebookService.createAd(payload);
      if (error) throw new Error(error.message);

      alert("Ad creation started successfully!");
      console.log("Facebook Ad creation response:", data);
    } catch (err) {
      console.error("Failed to create Facebook Ad:", err);
      alert(`Failed to create Facebook Ad: ${err.message}`);
    }
  };

  const isStep1Valid = () => {
    return formData.daily_budget && 
           formData.campaign_objective && 
           formData.geo_location.length > 0 && 
           formData.age_min && 
           formData.age_max;
  };

  const isStep2Valid = () => {
    return selectedContent.campaign_name && 
           selectedContent.generated_headline && 
           selectedContent.generated_description && 
           selectedContent.adset_name && 
           selectedContent.ad_name;
  };

  const renderField = (type, label, icon, placeholder) => {
    const content = generatedContent?.[type] || "";
    const regeneratedContent = showRegeneratedContent[type] || "";
    const isRegenerating = regeneratingStates[type] || false;
    
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon}
            <h4 className="text-lg font-semibold text-white">{label}</h4>
          </div>
          <button
            onClick={() => handleRegenerate(type)}
            disabled={isRegenerating}
            className="text-gray-400 hover:text-white flex items-center gap-1 text-sm disabled:opacity-50"
          >
            {isRegenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {isRegenerating ? 'Regenerating...' : 'Regenerate'}
          </button>
        </div>
        
        {/* Text Input Field */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Your {label}:</label>
          <textarea
            value={selectedContent[type] || ""}
            onChange={(e) => handleContentChange(type, e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none resize-none"
            rows={type === 'generated_description' ? 4 : 2}
          />
        </div>
        
        {/* Regenerated Content Display - Only show after regenerate */}
        {regeneratedContent && (
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-400">AI Generated:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(regeneratedContent, `${type}-regenerated`)}
                  className="text-gray-400 hover:text-white flex items-center gap-1 text-xs"
                >
                  {copiedStates[`${type}-regenerated`] ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
                <button
                  onClick={() => handleUseThis(regeneratedContent, type)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 text-xs font-medium"
                >
                  <Plus className="w-3 h-3" />
                  Use This
                </button>
              </div>
            </div>
            <p className="text-white text-sm">{regeneratedContent}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-4xl font-extrabold text-white bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Ad Generator
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Generate personalized ads
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-red-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-16">
            <span className={`text-sm ${currentStep === 1 ? 'text-red-400' : 'text-gray-500'}`}>
              Campaign Settings
            </span>
            <span className={`text-sm ${currentStep === 2 ? 'text-red-400' : 'text-gray-500'}`}>
              Generate & Customize
            </span>
            <span className={`text-sm ${currentStep === 3 ? 'text-red-400' : 'text-gray-500'}`}>
              Review & Save
            </span>
          </div>
        </div>

        {!selectedCampaign ? (
          <>
            {/* Campaign Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Select a Campaign Template</h2>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-red-500" />
                  <span className="ml-2 text-gray-400">Loading campaigns...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign._id}
                      onClick={() => setSelectedCampaign(campaign)}
                      className="p-6 border-2 rounded-lg cursor-pointer transition-all bg-gray-800 hover:border-red-500 hover:bg-gray-700"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Target className="w-8 h-8 text-red-500" />
                        <h3 className="text-xl font-semibold text-white">
                          {campaign.name}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        {campaign.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{campaign.category}</span>
                        <span>{campaign.target_audience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Brand Data from Onboarding */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Brand Data</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Business:</span>
                  <span className="text-white ml-2">{effectiveBrandData.business_name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white ml-2">{effectiveBrandData.business_city}</span>
                </div>
                <div>
                  <span className="text-gray-400">Target Market:</span>
                  <span className="text-white ml-2">{effectiveBrandData.target_market}</span>
                </div>
                <div>
                  <span className="text-gray-400">Voice Tone:</span>
                  <span className="text-white ml-2">{effectiveBrandData.voice_tone_style}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Selected Campaign */}
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-red-500" />
                  <h2 className="text-2xl font-bold text-white">
                    {selectedCampaign.name}
                  </h2>
                </div>
                <button
                  onClick={handleBack}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-300 mb-4">
                {selectedCampaign.description}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Category:</span>
                  <span className="text-red-400 font-medium">{selectedCampaign.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Target:</span>
                  <span className="text-red-400 font-medium">{selectedCampaign.target_audience}</span>
                </div>
              </div>
            </div>

            {/* Step 1: Campaign Settings */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Campaign Settings</h3>
                
                {/* Daily Budget */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-red-500" />
                    <h4 className="text-lg font-semibold text-white">Daily Budget</h4>
                  </div>
                  <input
                    type="number"
                    value={formData.daily_budget}
                    onChange={(e) => handleInputChange('daily_budget', e.target.value)}
                    placeholder="Enter daily budget (e.g., 50)"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                  />
                </div>

                {/* Campaign Objective */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-red-500" />
                    <h4 className="text-lg font-semibold text-white">Campaign Objective</h4>
                  </div>
                  <select
                    value={formData.campaign_objective}
                    onChange={(e) => handleInputChange('campaign_objective', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                  >
                    <option value="">Select campaign objective</option>
                    {campaignObjectives.map((objective) => (
                      <option key={objective} value={objective}>
                        {objective.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Geo Location */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-red-500" />
                    <h4 className="text-lg font-semibold text-white">Target Countries</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {countries.map((country) => (
                      <label key={country.code} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.geo_location.includes(country.code)}
                          onChange={() => handleCountryToggle(country.code)}
                          className="w-4 h-4 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                        />
                        <span className="text-white text-sm">{country.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Age Range */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-6 h-6 text-red-500" />
                    <h4 className="text-lg font-semibold text-white">Age Range</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Minimum Age</label>
                      <input
                        type="number"
                        value={formData.age_min}
                        onChange={(e) => handleInputChange('age_min', e.target.value)}
                        placeholder="18"
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Maximum Age</label>
                      <input
                        type="number"
                        value={formData.age_max}
                        onChange={(e) => handleInputChange('age_max', e.target.value)}
                        placeholder="65"
                        className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end">
                  <button
                    onClick={handleGenerateFiveAdTypes}
                    disabled={!isStep1Valid() || isGenerating}
                    className="flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Generate & Customize */}
            {currentStep === 2 && generatedContent && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Customize Your Ad Content</h3>
                
                {/* Campaign Name */}
                {renderField(
                  'campaign_name',
                  'Campaign Name',
                  <Settings className="w-6 h-6 text-red-500" />,
                  'Enter your campaign name...'
                )}

                {/* Headline */}
                {renderField(
                  'generated_headline',
                  'Headline',
                  <Target className="w-6 h-6 text-red-500" />,
                  'Enter your headline...'
                )}

                {/* Description */}
                {renderField(
                  'generated_description',
                  'Description',
                  <MessageSquare className="w-6 h-6 text-red-500" />,
                  'Enter your ad description...'
                )}

                {/* Adset Name */}
                {renderField(
                  'adset_name',
                  'Adset Name',
                  <Users className="w-6 h-6 text-red-500" />,
                  'Enter your adset name...'
                )}

                {/* Ad Name */}
                {renderField(
                  'ad_name',
                  'Ad Name',
                  <Target className="w-6 h-6 text-red-500" />,
                  'Enter your ad name...'
                )}

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Settings
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={!isStep2Valid()}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Review & Save
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Save */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Review Your Campaign</h3>
                
                {/* Campaign Settings Summary */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Campaign Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Daily Budget:</span>
                      <span className="text-white ml-2">${formData.daily_budget}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Objective:</span>
                      <span className="text-white ml-2">{formData.campaign_objective}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Countries:</span>
                      <span className="text-white ml-2">{formData.geo_location.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Age Range:</span>
                      <span className="text-white ml-2">{formData.age_min} - {formData.age_max}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Content Summary */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Ad Content</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-400 text-sm">Campaign Name:</span>
                      <p className="text-white font-medium">{selectedContent.campaign_name}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Headline:</span>
                      <p className="text-white font-medium">{selectedContent.generated_headline}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Description:</span>
                      <p className="text-white font-medium">{selectedContent.generated_description}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Adset Name:</span>
                      <p className="text-white font-medium">{selectedContent.adset_name}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Ad Name:</span>
                      <p className="text-white font-medium">{selectedContent.ad_name}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Customize
                  </button>
                  
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    Create Ad
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FiveAdTypesGenerator;