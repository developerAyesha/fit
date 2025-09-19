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
  Target,
  Users,
  MapPin,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Eye,
  Play,
  Save,
  RotateCcw
} from "lucide-react";
import Button from "@/utils/Button";

const CompleteAdGenerator = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { campaigns, generateCompleteCampaign, generateFiveAdTypes, loading } = useAdGeneration();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});
  
  const [formData, setFormData] = useState({
    // Step 1: Campaign Settings
    selected_campaign: null,
    daily_budget: 1000,
    campaign_objective: "OUTCOME_TRAFFIC",
    geo_location: ["GB"],
    age_min: 25,
    age_max: 55,
  });

  const steps = [
    {
      id: 1,
      title: "Campaign Settings",
      description: "Configure your campaign basics and targeting",
      icon: <Target className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Generate Ads",
      description: "Generate all ad content using AI",
      icon: <Lightbulb className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Review & Finalize",
      description: "Review and save your complete ad campaign",
      icon: <Eye className="w-6 h-6" />,
    }
  ];

  const campaignObjectives = [
    { value: "OUTCOME_TRAFFIC", label: "Traffic", description: "Drive traffic to your website" },
    { value: "OUTCOME_LEADS", label: "Leads", description: "Generate leads for your business" },
    { value: "OUTCOME_SALES", label: "Sales", description: "Drive sales and conversions" },
    { value: "OUTCOME_ENGAGEMENT", label: "Engagement", description: "Increase post engagement" },
    { value: "OUTCOME_AWARENESS", label: "Awareness", description: "Increase brand awareness" }
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCountryChange = (countryCode, checked) => {
    setFormData(prev => ({
      ...prev,
      geo_location: checked 
        ? [...prev.geo_location, countryCode]
        : prev.geo_location.filter(code => code !== countryCode)
    }));
  };

  const handleGenerateCompleteCampaign = async () => {
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

      // Use the new five ad types API for better performance
      const result = await generateFiveAdTypes(
        formData.selected_campaign._id, 
        brandData
      );
      
      // Transform the result to match the expected format
      const transformedResult = {
        campaign_info: {
          id: formData.selected_campaign._id,
          name: formData.selected_campaign.name,
          description: formData.selected_campaign.description,
          target_audience: formData.selected_campaign.target_audience,
          generated_campaign_name: result.campaign_name
        },
        campaign_settings: {
          daily_budget: formData.daily_budget,
          campaign_objective: formData.campaign_objective,
          geo_location: formData.geo_location,
          age_min: formData.age_min,
          age_max: formData.age_max
        },
        generated_content: {
          campaign_name: result.campaign_name,
          headlines: result.generated_headline,
          descriptions: result.generated_description,
          adset_names: result.adset_name,
          ad_names: result.ad_name
        },
        brand_data: brandData,
        generation_metadata: {
          generated_at: new Date().toISOString(),
          top_ads_used: 0,
          campaign_canonical_name: formData.selected_campaign.canonical_name
        }
      };
      
      setGeneratedCampaign(transformedResult);
      setCurrentStep(2);
      
    } catch (error) {
      console.error('Error generating complete campaign:', error);
      alert('Error generating campaign. Please try again.');
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

  const handleSaveCampaign = async () => {
    try {
      // Here you would typically save the campaign to your backend
      console.log('Complete Campaign:', generatedCampaign);
      alert('Campaign saved successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Error saving campaign. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Campaign Selection */}
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

            {/* Campaign Objective */}
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

            {/* Daily Budget */}
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

            {/* Target Countries */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Countries
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {countries.map((country) => (
                  <label key={country.code} className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={formData.geo_location.includes(country.code)}
                      onChange={(e) => handleCountryChange(country.code, e.target.checked)}
                      className="rounded border-gray-600 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm">{country.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Minimum Age
                </label>
                <input
                  type="number"
                  value={formData.age_min}
                  onChange={(e) => handleInputChange('age_min', parseInt(e.target.value))}
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
                  value={formData.age_max}
                  onChange={(e) => handleInputChange('age_max', parseInt(e.target.value))}
                  min="13"
                  max="65"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Next Button - Just save data and move to step 2 */}
            <div className="pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!formData.selected_campaign}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-semibold"
              >
                <ArrowRight className="w-6 h-6" />
                Continue to Generate Ads
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Generate Button for Step 2 */}
            {!generatedCampaign && (
              <div className="text-center py-8">
                <div className="bg-gray-800 rounded-lg p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Ready to Generate Your Complete Ad Campaign</h3>
                  <p className="text-gray-400 mb-6">
                    Click the button below to generate all ad components using AI based on your campaign settings.
                  </p>
                  <button
                    onClick={handleGenerateCompleteCampaign}
                    disabled={isGenerating}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-semibold mx-auto"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Generating Complete Campaign...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="w-6 h-6" />
                        Generate Complete Campaign
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {generatedCampaign ? (
              <>
                {/* Campaign Info */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Generated Campaign</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Campaign Name:</span>
                      <span className="text-white">{generatedCampaign.generated_content.campaign_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Template:</span>
                      <span className="text-white">{generatedCampaign.campaign_info.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Objective:</span>
                      <span className="text-white">{generatedCampaign.campaign_settings.campaign_objective}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Daily Budget:</span>
                      <span className="text-white">${(generatedCampaign.campaign_settings.daily_budget / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Generated Headlines */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Generated Headlines</h3>
                  <div className="space-y-3">
                    {generatedCampaign.generated_content.headlines.map((headline, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-400">Headline {index + 1}:</span>
                          <button
                            onClick={() => handleCopy(headline, `headline-${index}`)}
                            className="text-gray-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedStates[`headline-${index}`] ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedStates[`headline-${index}`] ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-white">{headline}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generated Descriptions */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Generated Descriptions</h3>
                  <div className="space-y-3">
                    {generatedCampaign.generated_content.descriptions.map((description, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-400">Description {index + 1}:</span>
                          <button
                            onClick={() => handleCopy(description, `description-${index}`)}
                            className="text-gray-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedStates[`description-${index}`] ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedStates[`description-${index}`] ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-white">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generated Adset Names */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Generated Adset Names</h3>
                  <div className="space-y-3">
                    {generatedCampaign.generated_content.adset_names.map((adsetName, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-400">Adset {index + 1}:</span>
                          <button
                            onClick={() => handleCopy(adsetName, `adset-${index}`)}
                            className="text-gray-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedStates[`adset-${index}`] ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedStates[`adset-${index}`] ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-white">{adsetName}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generated Ad Names */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Generated Ad Names</h3>
                  <div className="space-y-3">
                    {generatedCampaign.generated_content.ad_names.map((adName, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-400">Ad {index + 1}:</span>
                          <button
                            onClick={() => handleCopy(adName, `ad-${index}`)}
                            className="text-gray-400 hover:text-white flex items-center gap-1"
                          >
                            {copiedStates[`ad-${index}`] ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedStates[`ad-${index}`] ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <p className="text-white">{adName}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Regenerate Button */}
                <div className="text-center py-4">
                  <button
                    onClick={handleGenerateCompleteCampaign}
                    disabled={isGenerating}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Regenerating...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        Regenerate All Content
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No generated campaign found. Please go back and generate a campaign.</p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {generatedCampaign ? (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Complete Campaign Summary</h3>
                <div className="space-y-4">
                  {/* Campaign Settings */}
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-md font-medium text-white mb-2">Campaign Settings</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Campaign Name:</span>
                        <span className="text-white">{generatedCampaign.generated_content.campaign_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Objective:</span>
                        <span className="text-white">{generatedCampaign.campaign_settings.campaign_objective}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Daily Budget:</span>
                        <span className="text-white">${(generatedCampaign.campaign_settings.daily_budget / 100).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Countries:</span>
                        <span className="text-white">{generatedCampaign.campaign_settings.geo_location.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Age Range:</span>
                        <span className="text-white">{generatedCampaign.campaign_settings.age_min} - {generatedCampaign.campaign_settings.age_max}</span>
                      </div>
                    </div>
                  </div>

                  {/* Generated Content Summary */}
                  <div className="border-b border-gray-700 pb-4">
                    <h4 className="text-md font-medium text-white mb-2">Generated Content</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Headlines:</span>
                        <span className="text-white">{generatedCampaign.generated_content.headlines.length} generated</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Descriptions:</span>
                        <span className="text-white">{generatedCampaign.generated_content.descriptions.length} generated</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Adset Names:</span>
                        <span className="text-white">{generatedCampaign.generated_content.adset_names.length} generated</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ad Names:</span>
                        <span className="text-white">{generatedCampaign.generated_content.ad_names.length} generated</span>
                      </div>
                    </div>
                  </div>

                  {/* Brand Data */}
                  <div>
                    <h4 className="text-md font-medium text-white mb-2">Brand Information</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Business:</span>
                        <span className="text-white">{generatedCampaign.brand_data.business_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">{generatedCampaign.brand_data.business_city}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Target Market:</span>
                        <span className="text-white">{generatedCampaign.brand_data.target_market}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Voice Tone:</span>
                        <span className="text-white">{generatedCampaign.brand_data.voice_tone_style}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No generated campaign found. Please go back and generate a campaign.</p>
              </div>
            )}
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
              Complete Ad Generator
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Generate complete ad campaigns with AI in 3 simple steps
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
              disabled={
                (currentStep === 1 && !formData.selected_campaign) ||
                (currentStep === 2 && !generatedCampaign)
              }
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSaveCampaign}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Campaign
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteAdGenerator;
