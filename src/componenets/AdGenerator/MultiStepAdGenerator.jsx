"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useAdGeneration } from "@/hooks/useAdGeneration";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  CheckCircle,
  Copy,
  RotateCcw,
  Save,
  Target,
  Users,
  MapPin,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Zap,
  Eye,
  Settings,
  Play
} from "lucide-react";
import Button from "@/utils/Button";

const MultiStepAdGenerator = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { campaigns, adTypes, generateContent, loading } = useAdGeneration();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState({});
  const [copiedStates, setCopiedStates] = useState({});
  
  const [formData, setFormData] = useState({
    // Step 1: Campaign Selection
    selected_campaign: null,
    campaign_name: "",
    campaign_objective: "OUTCOME_TRAFFIC",
    website_url: "",
    
    // Step 2: Adset Configuration
    adset_name: "",
    daily_budget: 1000,
    
    // Step 3: Ad Details
    ad_name: "",
    generated_headline: "",
    generated_description: "",
    generated_call_to_action: "SHOP_NOW",
    
    // Step 4: Targeting
    targeting_config: {
      geo_locations: {
        countries: ["GB"]
      },
      age_min: 25,
      age_max: 55,
      interests: [],
      behaviors: []
    }
  });

  const steps = [
    {
      id: 1,
      title: "Select Campaign",
      description: "Choose a campaign template to base your ad on",
      icon: <Play className="w-6 h-6" />,
      fields: ["selected_campaign"]
    },
    {
      id: 2,
      title: "Campaign Basics",
      description: "Set up your campaign foundation",
      icon: <Target className="w-6 h-6" />,
      fields: ["campaign_name", "campaign_objective", "website_url"]
    },
    {
      id: 3,
      title: "Adset Configuration",
      description: "Configure your ad set and budget",
      icon: <DollarSign className="w-6 h-6" />,
      fields: ["adset_name", "daily_budget"]
    },
    {
      id: 4,
      title: "Ad Content",
      description: "Generate and customize your ad content",
      icon: <MessageSquare className="w-6 h-6" />,
      fields: ["ad_name", "generated_headline", "generated_description", "generated_call_to_action"]
    },
    {
      id: 5,
      title: "Targeting",
      description: "Define your target audience",
      icon: <Users className="w-6 h-6" />,
      fields: ["targeting_config"]
    },
    {
      id: 6,
      title: "Review & Create",
      description: "Review your ad configuration",
      icon: <Eye className="w-6 h-6" />,
      fields: []
    }
  ];

  const campaignObjectives = [
    { value: "OUTCOME_TRAFFIC", label: "Traffic", description: "Drive traffic to your website" },
    { value: "OUTCOME_LEADS", label: "Leads", description: "Generate leads for your business" },
    { value: "OUTCOME_SALES", label: "Sales", description: "Drive sales and conversions" },
    { value: "OUTCOME_ENGAGEMENT", label: "Engagement", description: "Increase post engagement" },
    { value: "OUTCOME_AWARENESS", label: "Awareness", label: "Increase brand awareness" }
  ];

  const callToActionOptions = [
    "SHOP_NOW", "LEARN_MORE", "SIGN_UP", "DOWNLOAD", "GET_QUOTE", 
    "CONTACT_US", "BOOK_NOW", "APPLY_NOW", "GET_STARTED", "SEE_MORE"
  ];

  const countries = [
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "ES", name: "Spain" },
    { code: "IT", name: "Italy" }
  ];

  const interests = [
    "Fitness", "Health", "Weight Loss", "Gym", "Personal Training",
    "Nutrition", "Wellness", "Sports", "Running", "Yoga"
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleGenerateContent = async (contentType) => {
    if (!user || !formData.selected_campaign) {
      alert('Please select a campaign first');
      return;
    }
    
    try {
      setIsGenerating(true);
      
      const brandData = {
        business_name: user.business_name || "Fitness Business",
        business_city: user.business_city || "Your City",
        target_market: user.target_market || "Fitness enthusiasts",
        voice_tone_style: user.voice_tone_style || "Energetic",
        words_to_avoid: user.words_to_avoid || "diet, quick fix",
        coaching_style: user.coaching_style || "Motivational",
        brand_words: user.brand_words || "transform, results, confidence",
        main_problem: user.main_problem || "Lack of motivation and direction",
        failed_solutions: user.failed_solutions || "Generic programs that don't work",
        client_words: user.client_words || "I want to feel confident and strong",
        magic_wand_result: user.magic_wand_result || "Complete transformation and confidence"
      };
        console.log("content type",contentType);
        console.log("selected camoaign",formData.selected_campaign);
        console.log("brand data",brandData);
        
        
      const result = await generateContent(contentType, formData.selected_campaign._id, brandData);
      
      setGeneratedContent(prev => ({
        ...prev,
        [contentType]: result.content
      }));

      // Auto-fill the generated content
      if (contentType === 'headline') {
        handleInputChange('generated_headline', result.content);
      } else if (contentType === 'ad_descriptions') {
        handleInputChange('generated_description', result.content);
      }
      
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Error generating content. Please try again.');
    } finally {
      setIsGenerating(false);
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

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically save the ad configuration
      console.log('Ad Configuration:', formData);
      alert('Ad configuration saved successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving ad configuration:', error);
      alert('Error saving ad configuration. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Select a Campaign Template *
              </label>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-red-500" />
                  <span className="ml-2 text-gray-400">Loading campaigns...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign._id}
                      onClick={() => handleInputChange('selected_campaign', campaign)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.selected_campaign?._id === campaign._id
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {campaign.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {campaign.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {campaign.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {campaign.target_audience}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={formData.campaign_name}
                onChange={(e) => handleInputChange('campaign_name', e.target.value)}
                placeholder="e.g., Summer Sale 2024"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Campaign Objective *
              </label>
              <select
                value={formData.campaign_objective}
                onChange={(e) => handleInputChange('campaign_objective', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
              >
                {campaignObjectives.map((obj) => (
                  <option key={obj.value} value={obj.value}>
                    {obj.label} - {obj.description}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Website URL *
              </label>
              <input
                type="url"
                value={formData.website_url}
                onChange={(e) => handleInputChange('website_url', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Adset Name *
              </label>
              <input
                type="text"
                value={formData.adset_name}
                onChange={(e) => handleInputChange('adset_name', e.target.value)}
                placeholder="e.g., UK Audience Adset"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Daily Budget (in cents) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={formData.daily_budget}
                  onChange={(e) => handleInputChange('daily_budget', parseInt(e.target.value))}
                  placeholder="1000"
                  min="100"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                  required
                />
              </div>
              <p className="text-sm text-gray-400 mt-1">
                Minimum: $1.00 (100 cents) per day
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ad Name *
              </label>
              <input
                type="text"
                value={formData.ad_name}
                onChange={(e) => handleInputChange('ad_name', e.target.value)}
                placeholder="e.g., Summer Sale Ad 1"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Headline
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.generated_headline}
                    onChange={(e) => handleInputChange('generated_headline', e.target.value)}
                    placeholder="e.g., Amazing Summer Deals!"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleGenerateContent('ad_headline')}
                    disabled={isGenerating}
                    className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                    Generate
                  </button>
                </div>
                {generatedContent.headline && (
                  <div className="bg-gray-800 border border-orange-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-400">AI Generated:</span>
                      <button
                        onClick={() => handleCopy(generatedContent.headline, 'headline')}
                        className="text-gray-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedStates.headline ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedStates.headline ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-white">{generatedContent.headline}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <textarea
                    value={formData.generated_description}
                    onChange={(e) => handleInputChange('generated_description', e.target.value)}
                    placeholder="e.g., Don't miss out on our incredible summer sale with up to 50% off selected items."
                    rows={3}
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-red-500 focus:outline-none resize-none"
                  />
                  <button
                    onClick={() => handleGenerateContent('ad_descriptions')}
                    disabled={isGenerating}
                    className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lightbulb className="w-4 h-4" />}
                    Generate
                  </button>
                </div>
                {generatedContent.ad_descriptions && (
                  <div className="bg-gray-800 border border-orange-500/30 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-gray-400">AI Generated:</span>
                      <button
                        onClick={() => handleCopy(generatedContent.ad_descriptions, 'description')}
                        className="text-gray-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedStates.description ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedStates.description ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-white">{generatedContent.ad_descriptions}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Call to Action
              </label>
              <select
                value={formData.generated_call_to_action}
                onChange={(e) => handleInputChange('generated_call_to_action', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
              >
                {callToActionOptions.map((cta) => (
                  <option key={cta} value={cta}>
                    {cta.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Countries
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {countries.map((country) => (
                  <label key={country.code} className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={formData.targeting_config.geo_locations.countries.includes(country.code)}
                      onChange={(e) => {
                        const countries = formData.targeting_config.geo_locations.countries;
                        if (e.target.checked) {
                          handleInputChange('targeting_config.geo_locations.countries', [...countries, country.code]);
                        } else {
                          handleInputChange('targeting_config.geo_locations.countries', countries.filter(c => c !== country.code));
                        }
                      }}
                      className="rounded border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm">{country.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Minimum Age
                </label>
                <input
                  type="number"
                  value={formData.targeting_config.age_min}
                  onChange={(e) => handleInputChange('targeting_config.age_min', parseInt(e.target.value))}
                  min="13"
                  max="65"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Maximum Age
                </label>
                <input
                  type="number"
                  value={formData.targeting_config.age_max}
                  onChange={(e) => handleInputChange('targeting_config.age_max', parseInt(e.target.value))}
                  min="13"
                  max="65"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Interests
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {interests.map((interest) => (
                  <label key={interest} className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={formData.targeting_config.interests.includes(interest)}
                      onChange={(e) => {
                        const interests = formData.targeting_config.interests;
                        if (e.target.checked) {
                          handleInputChange('targeting_config.interests', [...interests, interest]);
                        } else {
                          handleInputChange('targeting_config.interests', interests.filter(i => i !== interest));
                        }
                      }}
                      className="rounded border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Campaign Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Selected Campaign:</span>
                  <span className="text-white">{formData.selected_campaign?.name || 'None selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Campaign Name:</span>
                  <span className="text-white">{formData.campaign_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Objective:</span>
                  <span className="text-white">{formData.campaign_objective}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Website:</span>
                  <span className="text-white">{formData.website_url}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Adset Name:</span>
                  <span className="text-white">{formData.adset_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Daily Budget:</span>
                  <span className="text-white">${(formData.daily_budget / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Ad Name:</span>
                  <span className="text-white">{formData.ad_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Headline:</span>
                  <span className="text-white">{formData.generated_headline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Description:</span>
                  <span className="text-white">{formData.generated_description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Call to Action:</span>
                  <span className="text-white">{formData.generated_call_to_action}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Target Countries:</span>
                  <span className="text-white">{formData.targeting_config.geo_locations.countries.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Age Range:</span>
                  <span className="text-white">{formData.targeting_config.age_min} - {formData.targeting_config.age_max}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Interests:</span>
                  <span className="text-white">{formData.targeting_config.interests.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
              Multi-Step Ad Generator
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Create professional Facebook ads with step-by-step guidance
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-red-600 border-red-600 text-white' 
                    : 'border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-red-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-400">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-800 rounded-xl p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              disabled={currentStep === 1 && !formData.selected_campaign}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Create Ad
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepAdGenerator;
