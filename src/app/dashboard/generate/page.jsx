"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Lightbulb,
  Target,
  Instagram,
  Palette,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Zap,
  Copy,
  RotateCcw,
  Save,
  CheckCircle,
  Shield,
  BarChart3,
  File,
  Settings,
} from "lucide-react";
import Button from "@/utils/Button";
import { useAdGeneration } from "@/hooks/useAdGeneration";
import { useAuth } from "@/context/authContext";

// Ad Type icons mapping
const adTypeIcons = {
  'ad_caption': <MessageSquare className="w-6 h-6 text-red-500" />,
  'headline': <Target className="w-6 h-6 text-red-500" />,
  'campaign_name': <Lightbulb className="w-6 h-6 text-red-500" />,
  'ig_story': <Instagram className="w-6 h-6 text-red-500" />,
  'creative_prompt': <Palette className="w-6 h-6 text-red-500" />,
  'cta_text': <Zap className="w-6 h-6 text-red-500" />,
  'compliance_rewrite': <Shield className="w-6 h-6 text-red-500" />,
  'insights_summary': <BarChart3 className="w-6 h-6 text-red-500" />,
  'ad_descriptions': <File className="w-6 h-6 text-red-500" />
};

// Campaign icons mapping
const campaignIcons = {
  'challenge': <Zap className="w-5 h-5 text-white" />,
  'transformation': <Target className="w-5 h-5 text-white" />,
  'recruitment': <MessageSquare className="w-5 h-5 text-white" />,
  'seasonal': <Lightbulb className="w-5 h-5 text-white" />,
  'personal': <MessageSquare className="w-5 h-5 text-white" />,
  'sports': <Target className="w-5 h-5 text-white" />,
  'default': <Target className="w-5 h-5 text-white" />
};

// Function to get campaign icon based on category or name
const getCampaignIcon = (campaign) => {
  const category = campaign.category?.toLowerCase();
  const name = campaign.name?.toLowerCase();
  
  if (category?.includes('challenge') || name?.includes('challenge')) {
    return campaignIcons.challenge;
  } else if (category?.includes('transformation') || name?.includes('transformation')) {
    return campaignIcons.transformation;
  } else if (category?.includes('recruitment') || name?.includes('recruitment') || name?.includes('wanted')) {
    return campaignIcons.recruitment;
  } else if (category?.includes('seasonal') || name?.includes('seasonal')) {
    return campaignIcons.seasonal;
  } else if (name?.includes('personal') || name?.includes('people')) {
    return campaignIcons.personal;
  } else if (name?.includes('sports')) {
    return campaignIcons.sports;
  }
  
  return campaignIcons.default;
};

// Ad Generator Card Component
function AdGeneratorCard({ 
  title, 
  description, 
  icon, 
  onGenerate, 
  loading = false, 
  disabled = false,
  generatedContent = null,
  onCopy,
  onRegenerate,
  onSave,
  copied = false
}) {
  const handleCopy = async () => {
    if (generatedContent) {
      await navigator.clipboard.writeText(generatedContent);
      if (onCopy) onCopy();
    }
  };

  const handleRegenerate = () => {
    if (onRegenerate) onRegenerate();
  };

  const handleSave = () => {
    if (onSave) onSave();
  };

  return (
    <div className="border border-red-500/20 rounded-xl p-6 bg-gray-900/50 hover:border-red-500/40 transition-all duration-300">
      {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      
      {/* Description */}
      <p className="text-gray-400 mb-6 text-sm leading-relaxed">{description}</p>
      
      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={disabled || loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
          loading 
            ? 'bg-red-600/80 cursor-not-allowed' 
            : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            Generate
          </>
        )}
      </button>

      {/* Generated Content Display */}
      {generatedContent && (
        <div className="mt-6 space-y-4">
          {/* Policy Safe Badge */}
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm font-medium">Policy-Safe</span>
          </div>
          
          {/* Content Box */}
          <div className="bg-gray-800 border border-orange-500/30 rounded-lg p-4 max-h-48 overflow-y-auto">
            <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
              {generatedContent}
            </pre>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            
            <button
              onClick={handleRegenerate}
              disabled={loading}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
              Regenerate
            </button>
            
            <button
              onClick={handleSave}
              className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
      </div>
      )}
    </div>
  );
}

export default function AdGenerator() {
  const router = useRouter();
  const { user } = useAuth();
  const { campaigns, adTypes, loading, error, generateContent, loadTopAds } = useAdGeneration();
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [generatingAdType, setGeneratingAdType] = useState(null);
  const [generatedContent, setGeneratedContent] = useState({});
  const [copiedStates, setCopiedStates] = useState({});

  const handleBack = () => {
    setSelectedCampaign(null);
    setGeneratedContent({});
    setCopiedStates({});
  };

  const handleCopy = (adType) => {
    setCopiedStates(prev => ({
      ...prev,
      [adType]: true
    }));
    setTimeout(() => {
      setCopiedStates(prev => ({
        ...prev,
        [adType]: false
      }));
    }, 2000);
  };

  const handleSave = (adType) => {
    // TODO: Implement save functionality
    console.log('Saving content for:', adType);
    // You can add a toast notification here
  };

  const handleCampaignSelect = async (campaign) => {
    setSelectedCampaign(campaign);
    setGeneratedContent({});
    // Load top performing ads for this campaign
    await loadTopAds(campaign._id);
  };

  const handleGenerate = async (adType) => {
    if (!selectedCampaign || !user) return;
    
    try {
      setGeneratingAdType(adType);
      
      // Get user's brand data (you'll need to implement this)
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

      const result = await generateContent(adType, selectedCampaign._id, brandData);
      setGeneratedContent(prev => ({
        ...prev,
        [adType]: result.content
      }));
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Error generating content. Please try again.');
    } finally {
      setGeneratingAdType(null);
    }
  };

  // Loading state
  if (loading && campaigns.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-red-500" />
            <span className="text-white">Loading campaigns...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Error Loading Data</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
    <div className="container mx-auto px-4 py-8">
      {/* Page Heading */}
      <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-3 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Ad Generator
              </h1>
              <p className="text-gray-400 text-lg">
                Generate high-converting ad content powered by your brand setup
              </p>
            </div>
            {/* <button
              onClick={() => router.push('/dashboard/generate-multistep')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Settings className="w-5 h-5" />
              Multi-Step Generator
            </button> */}
          </div>
      </div>

      {!selectedCampaign ? (
        <>
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-bold mb-4 text-red-500">
          Most Popular Campaigns
        </h3>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
          Choose from our most successful campaign templates to generate
          high-converting ad content
        </p>
      </div>

          {/* Campaign selection grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                onClick={() => handleCampaignSelect(campaign)}
                className="border border-gray-700 rounded-xl p-6 bg-gray-900 hover:border-red-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                    {getCampaignIcon(campaign)}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {campaign.name}
                  </h3>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm leading-relaxed">
                  {campaign.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                  <span>Category: {campaign.category}</span>
                  <span>Target: {campaign.target_audience}</span>
                </div>
              </div>
          ))}
        </div>
        </>
      ) : (
        <>
          {/* Back button */}
          <button
            onClick={handleBack}
            className="flex items-center text-gray-400 hover:text-red-400 mb-6 transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Campaigns
          </button>

          {/* Selected Campaign Card */}
          <div className="border border-red-500/30 rounded-xl p-6 bg-gray-900/80 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl font-bold text-white">
              {selectedCampaign.name}
            </h2>
            </div>
            <p className="text-gray-300 mb-4 text-lg leading-relaxed">
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

          {/* Ad Types Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-6">Generate Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adTypes.map((adType) => (
                <AdGeneratorCard
                  key={adType.type}
                  title={adType.name}
                  description={adType.description}
                  icon={adTypeIcons[adType.type]}
                  onGenerate={() => handleGenerate(adType.type)}
                  loading={generatingAdType === adType.type}
                  generatedContent={generatedContent[adType.type]}
                  onCopy={() => handleCopy(adType.type)}
                  onRegenerate={() => handleGenerate(adType.type)}
                  onSave={() => handleSave(adType.type)}
                  copied={copiedStates[adType.type] || false}
              />
            ))}
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
