"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
  RefreshCw,
  Image as ImageIcon
} from "lucide-react";
import Button from "@/utils/Button";
import { facebookService } from "@/services/facebookService";


const FiveAdTypesGenerator = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { brandData, loading: onboardingLoading } = useOnboarding();
  const { campaigns, generateFiveAdTypes, generateContent, loading } = useAdGeneration();
  
  // Currency state
  const [accountCurrency, setAccountCurrency] = useState(null);
  const [minBudget, setMinBudget] = useState(500000);
  const [currencySymbol, setCurrencySymbol] = useState('£');
  
  // Fetch account currency when user has Facebook connection
  useEffect(() => {
    const fetchAccountCurrency = async () => {
      if (user?.selected_ad_account_id) {
    
        try {
          const { data, error } = await facebookService.getAccountInfo(user.selected_ad_account_id);
          console.log("🔍 [Frontend Component] getAccountInfo result:", { data, error });
          
          if (data && !error) {
           
            setAccountCurrency(data.currency);
            setMinBudget(50000);
            setCurrencySymbol(data.currencySymbol);
          } else {
            console.error("[Frontend Component] Error in getAccountInfo:", error);
          }
        } catch (error) {
          console.error('[Frontend Component] Failed to fetch account currency:', error);
        }
      } else {
        console.log(" [Frontend Component] No selected_ad_account_id, skipping currency fetch");
      }
    };
    
    fetchAccountCurrency();
  }, [user?.selected_ad_account_id]);

  // Dynamic validation schema based on account currency
  const campaignValidationSchema = z.object({
    daily_budget: z
      .number({ message: "Daily budget is required" })
      .min(minBudget, `Daily budget must be at least 50000`)
      .max(1000000, `Daily budget cannot exceed ${currencySymbol}10,000.00`),
    campaign_objective: z
      .string({ message: "Campaign objective is required" })
      .refine((val) => ["OUTCOME_TRAFFIC", "OUTCOME_LEADS", "OUTCOME_ENGAGEMENT", "OUTCOME_SALES"].includes(val), {
        message: "Please select a valid campaign objective"
      }),
    geo_location: z
      .array(z.string().length(2, "Country code must be exactly 2 characters"))
      .min(1, "Please select at least one country"),
    age_min: z
      .number({ message: "Minimum age is required" })
      .min(18, "Minimum age must be at least 18")
      .max(65, "Minimum age cannot exceed 65"),
    age_max: z
      .number({ message: "Maximum age is required" })
      .min(18, "Maximum age must be at least 18")
      .max(65, "Maximum age cannot exceed 65")
  }).refine((data) => {
    // Custom validation: age_min must be less than age_max
    return data.age_min < data.age_max;
  }, {
    message: "Minimum age must be less than maximum age",
    path: ["age_max"]
  }).refine((data) => {
    // Custom validation: age range cannot exceed 50 years
    return (data.age_max - data.age_min) <= 50;
  }, {
    message: "Age range cannot exceed 50 years",
    path: ["age_max"]
  });
  
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty }
  } = useForm({
    resolver: zodResolver(campaignValidationSchema),
    mode: "onChange",
    defaultValues: {
      daily_budget: minBudget, // Dynamic minimum based on currency
      campaign_objective: "",
      geo_location: [],
      age_min: 18,
      age_max: 65
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});
  const [regeneratingStates, setRegeneratingStates] = useState({});
  const [showRegeneratedContent, setShowRegeneratedContent] = useState({});
  const [selectedContent, setSelectedContent] = useState({
    campaign_name: "",
    generated_headline: "",
    generated_description: "",
    adset_name: "",
    ad_name: ""
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

  // Prefer onboarding brand data; fallback to minimal safe defaults
  console.log("brandData", brandData); 
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

  // Debug website URL
  console.log("Website URL:", effectiveBrandData.website_url);

  // Campaign objectives (must match backend validation)
  const campaignObjectives = [
    "OUTCOME_TRAFFIC",
    "OUTCOME_LEADS", 
    "OUTCOME_ENGAGEMENT",
    "OUTCOME_SALES"
  ];

  // Popular countries (shown as checkboxes)
  const popularCountries = [
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

  // Additional countries (shown in dropdown)
  const additionalCountries = [
    { code: "AT", name: "Austria" },
    { code: "BE", name: "Belgium" },
    { code: "CH", name: "Switzerland" },
    { code: "DK", name: "Denmark" },
    { code: "FI", name: "Finland" },
    { code: "IE", name: "Ireland" },
    { code: "NO", name: "Norway" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "CZ", name: "Czech Republic" },
    { code: "HU", name: "Hungary" },
    { code: "GR", name: "Greece" },
    { code: "RO", name: "Romania" },
    { code: "BG", name: "Bulgaria" },
    { code: "HR", name: "Croatia" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "LT", name: "Lithuania" },
    { code: "LV", name: "Latvia" },
    { code: "EE", name: "Estonia" },
    { code: "LU", name: "Luxembourg" },
    { code: "MT", name: "Malta" },
    { code: "CY", name: "Cyprus" },
    { code: "IS", name: "Iceland" },
    { code: "LI", name: "Liechtenstein" },
    { code: "MC", name: "Monaco" },
    { code: "SM", name: "San Marino" },
    { code: "VA", name: "Vatican City" },
    { code: "AD", name: "Andorra" },
    { code: "NZ", name: "New Zealand" },
    { code: "JP", name: "Japan" },
    { code: "KR", name: "South Korea" },
    { code: "SG", name: "Singapore" },
    { code: "HK", name: "Hong Kong" },
    { code: "TW", name: "Taiwan" },
    { code: "TH", name: "Thailand" },
    { code: "MY", name: "Malaysia" },
    { code: "PH", name: "Philippines" },
    { code: "ID", name: "Indonesia" },
    { code: "VN", name: "Vietnam" },
    { code: "IN", name: "India" },
    { code: "BR", name: "Brazil" },
    { code: "MX", name: "Mexico" },
    { code: "AR", name: "Argentina" },
    { code: "CL", name: "Chile" },
    { code: "CO", name: "Colombia" },
    { code: "PE", name: "Peru" },
    { code: "ZA", name: "South Africa" },
    { code: "EG", name: "Egypt" },
    { code: "NG", name: "Nigeria" },
    { code: "KE", name: "Kenya" },
    { code: "MA", name: "Morocco" },
    { code: "TN", name: "Tunisia" },
    { code: "DZ", name: "Algeria" },
    { code: "GH", name: "Ghana" },
    { code: "ET", name: "Ethiopia" },
    { code: "UG", name: "Uganda" },
    { code: "TZ", name: "Tanzania" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabwe" },
    { code: "BW", name: "Botswana" },
    { code: "NA", name: "Namibia" },
    { code: "MW", name: "Malawi" },
    { code: "RW", name: "Rwanda" },
    { code: "SN", name: "Senegal" },
    { code: "CI", name: "Ivory Coast" },
    { code: "CM", name: "Cameroon" },
    { code: "AO", name: "Angola" },
    { code: "MZ", name: "Mozambique" },
    { code: "MG", name: "Madagascar" },
    { code: "MU", name: "Mauritius" },
    { code: "SC", name: "Seychelles" },
    { code: "RE", name: "Réunion" },
    { code: "YT", name: "Mayotte" },
    { code: "KM", name: "Comoros" },
    { code: "DJ", name: "Djibouti" },
    { code: "SO", name: "Somalia" },
    { code: "ER", name: "Eritrea" },
    { code: "SD", name: "Sudan" },
    { code: "SS", name: "South Sudan" },
    { code: "CF", name: "Central African Republic" },
    { code: "TD", name: "Chad" },
    { code: "NE", name: "Niger" },
    { code: "ML", name: "Mali" },
    { code: "BF", name: "Burkina Faso" },
    { code: "GN", name: "Guinea" },
    { code: "GW", name: "Guinea-Bissau" },
    { code: "SL", name: "Sierra Leone" },
    { code: "LR", name: "Liberia" },
    { code: "GM", name: "Gambia" },
    { code: "CV", name: "Cape Verde" },
    { code: "ST", name: "São Tomé and Príncipe" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "GA", name: "Gabon" },
    { code: "CG", name: "Republic of the Congo" },
    { code: "CD", name: "Democratic Republic of the Congo" },
    { code: "BI", name: "Burundi" },
    { code: "SZ", name: "Eswatini" },
    { code: "LS", name: "Lesotho" }
  ];

  // State for dropdown visibility
  const [showOtherCountries, setShowOtherCountries] = useState(false);

  // Get all countries for reference
  const allCountries = [...popularCountries, ...additionalCountries];

  // Watch form values for real-time validation
  const watchedValues = watch();

  const handleCountryToggle = (countryCode) => {
    const currentGeoLocation = watchedValues.geo_location || [];
    const newGeoLocation = currentGeoLocation.includes(countryCode)
      ? currentGeoLocation.filter(code => code !== countryCode)
      : [...currentGeoLocation, countryCode];
    
    setValue('geo_location', newGeoLocation, { shouldValidate: true });
  };

  // Helper function to get country name by code
  const getCountryName = (countryCode) => {
    const country = allCountries.find(c => c.code === countryCode);
    return country ? country.name : countryCode;
  };

  // Check if "Other" should be checked (when any additional country is selected)
  const isOtherChecked = () => {
    const currentGeoLocation = watchedValues.geo_location || [];
    return additionalCountries.some(country => currentGeoLocation.includes(country.code));
  };

  // Handle "Other" checkbox toggle
  const handleOtherToggle = () => {
    if (isOtherChecked()) {
      // Remove all additional countries
      const currentGeoLocation = watchedValues.geo_location || [];
      const popularOnly = currentGeoLocation.filter(code => 
        popularCountries.some(country => country.code === code)
      );
      setValue('geo_location', popularOnly, { shouldValidate: true });
      setShowOtherCountries(false);
    } else {
      // Show dropdown
      setShowOtherCountries(true);
    }
  };


  const handleGenerateFiveAdTypes = handleSubmit(async (formData) => {
    if (!selectedCampaign) {
      alert('Please select a campaign first');
      return;
    }

    // Frontend validation is already handled by React Hook Form
    // No need for additional backend validation calls
    
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
  });

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

  const handleMediaUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMediaFile(file);
      // Create a preview URL for the uploaded file
      const previewUrl = URL.createObjectURL(file);
      setMediaUrl(previewUrl);
    }
  };

  const handleMediaUrlChange = (event) => {
    setMediaUrl(event.target.value);
    setMediaFile(null); // Clear file if URL is provided
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
      // Campaign objectives now match backend exactly, no mapping needed
      const mappedObjective = watchedValues.campaign_objective || 'OUTCOME_TRAFFIC';

      // Backend expects budget in pence (already in pence from frontend)
      const dailyBudgetPence = Number(watchedValues.daily_budget || 0);

      // Enforce headline <= 40 chars as validator requires
      const safeHeadline = (selectedContent.generated_headline || '').trim().slice(0, 40);

      const payload = {
        campaign_name: selectedContent.campaign_name,
        adset_name: selectedContent.adset_name,
        ad_name: selectedContent.ad_name,
        website_url: effectiveBrandData.website_url || "https://example.com", // Use onboarding website URL
        daily_budget: dailyBudgetPence,
        generated_headline: safeHeadline,
        generated_description: selectedContent.generated_description,
        generated_call_to_action: "SHOP_NOW", // TODO: add selector if needed
        media_url: mediaUrl || undefined, // Include media URL if provided
        campaign_objective: mappedObjective,
        targeting_config: {
          geo_locations: {
            countries: watchedValues.geo_location && watchedValues.geo_location.length > 0 ? watchedValues.geo_location : ["GB"]
          },
          age_min: Number(watchedValues.age_min || 25),
          age_max: Number(watchedValues.age_max || 55),
          targeting_automation: {
            advantage_audience: 1 // Required by backend validation
          }
        }
      };

      console.log("Ad creation payload:", payload);
      console.log("Website URL being sent:", payload.website_url);

      const { data, error } = await facebookService.createAd(payload);
      if (error) {
        console.error("❌ Facebook service error:", error);
        
        // Handle currency-specific budget errors
        if (error.currency_info) {
          throw new Error(`Budget Error: ${error.currency_info}. Please increase your daily budget to meet the minimum requirement for your Facebook account's currency.`);
        }
        
        throw new Error(`${error.message} (Status: ${error.status})`);
      }

      alert("Ad created successfully!");
      console.log("✅ Facebook Ad creation response:", data);
    } catch (err) {
      console.error("❌ Failed to create Facebook Ad:", err);
      console.error("❌ Error details:", err);
      
      // Extract step-specific error information
      let errorMessage = err.message || "Unknown error occurred";
      let errorStep = "Unknown";
      
      if (errorMessage.includes("CAMPAIGN")) {
        errorStep = "Campaign Creation";
      } else if (errorMessage.includes("ADSET")) {
        errorStep = "AdSet Creation";
      } else if (errorMessage.includes("CREATIVE")) {
        errorStep = "Creative Creation";
      } else if (errorMessage.includes("AD")) {
        errorStep = "Ad Creation";
      }
      
      // Show step-specific error message
      alert(`❌ Facebook Ad Creation Failed\n\nStep: ${errorStep}\nError: ${errorMessage}\n\nPlease check your campaign settings and try again.`);
    }
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
      <div className="bg-background rounded-lg p-6">
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
            className="w-full px-4 py-3 bg-bg-dark text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none resize-none"
            rows={type === 'generated_description' ? 4 : 2}
          />
        </div>
        
        {/* Regenerated Content Display - Only show after regenerate */}
        {regeneratedContent && (
          <div className="bg-bg-dark rounded-lg p-4">
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
                  className="text-brand hover:text-brand-dark flex items-center gap-1 text-xs font-medium"
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
    <div className="min-h-screen bg-background">
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
                    : 'bg-bg-dark text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-red-600' : 'bg-bg-dark'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-16">
            <span className={`text-sm ${currentStep === 1 ? 'text-brand' : 'text-gray-500'}`}>
              Campaign Settings
            </span>
            <span className={`text-sm ${currentStep === 2 ? 'text-brand' : 'text-gray-500'}`}>
              Generate & Customize
            </span>
            <span className={`text-sm ${currentStep === 3 ? 'text-brand' : 'text-gray-500'}`}>
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
                      className="p-6  rounded-lg cursor-pointer transition-all bg-bg-light hover:border-red-500 hover:bg-bg-dark"
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
            <div className="bg-bg-light rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Brand Data</h3>
              {onboardingLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-red-500 mr-2" />
                  <span className="text-gray-400">Loading brand data...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Business:</span>
                    <span className="text-white ml-2">
                      {effectiveBrandData.business_name || "Not specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Location:</span>
                    <span className="text-white ml-2">
                      {effectiveBrandData.business_city || "Not specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Target Market:</span>
                    <span className="text-white ml-2">
                      {effectiveBrandData.target_market || "Not specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Voice Tone:</span>
                    <span className="text-white ml-2">
                      {effectiveBrandData.voice_tone_style || "Not specified"}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-400">Website URL:</span>
                    <span className="text-white ml-2">
                      {effectiveBrandData.website_url ? (
                        <a 
                          href={effectiveBrandData.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          {effectiveBrandData.website_url}
                        </a>
                      ) : (
                        "Not specified"
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Selected Campaign */}
            <div className="bg-bg-light rounded-lg p-6 mb-8">
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
                  <span className="text-brand font-medium">{selectedCampaign.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Target:</span>
                  <span className="text-brand font-medium">{selectedCampaign.target_audience}</span>
                </div>
              </div>
            </div>

            {/* Step 1: Campaign Settings */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Campaign Settings</h3>
                

                
                {/* Daily Budget */}
                <div className="bg-bg-light rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-red-500" />
                    <h4 className="text-lg font-semibold text-white">{currencySymbol} Daily Budget</h4>
                  </div>
                 <input
  type="number"
  {...register('daily_budget', { valueAsNumber: true })}
  placeholder={`Enter daily budget in ${accountCurrency || 'currency'} (minimum: 5000 = ${currencySymbol}${(5000 / 100).toFixed(2)})`}
  min={5000}
  max="1000000"
  className={`w-full px-4 py-3 bg-bg-dark text-white rounded-lg border focus:outline-none ${
    errors.daily_budget ? 'border-red-500' : 'border-gray-600 focus:border-red-500'
  }`}
/>

                  {errors.daily_budget && (
                    <p className="text-brand text-sm mt-2">{errors.daily_budget.message}</p>
                  )}
                  {/* <p className="text-gray-400 text-sm mt-2">
                    Minimum: {currencySymbol}{(minBudget / 100).toFixed(2)} ({minBudget} {accountCurrency || 'units'})
                  </p> */}
                  {/* <p className="text-yellow-400 text-sm mt-1">
                    ⚠️ Note: Your Facebook account uses {accountCurrency || 'your account currency'}. Budget requirements are automatically adjusted.
                  </p> */}
                  {/* Debug info - remove in production */}
                  {/* <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-900 rounded">
                    <strong>Debug Info:</strong><br/>
                    Currency: {accountCurrency || 'Not loaded'}<br/>
                    Min Budget: {minBudget}<br/>
                    Symbol: {currencySymbol}<br/>
                    Ad Account ID: {user?.selected_ad_account_id || 'Not set'}
                  </div> */}
                </div>

                {/* Campaign Objective */}
                <div className="bg-bg-light rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-red-500" />
                    <h4 className="text-lg font-semibold text-white">Campaign Objective</h4>
                  </div>
                  <select
                    {...register('campaign_objective')}
                    className={`w-full px-4 py-3 bg-bg-dark text-white rounded-lg border focus:outline-none ${
                      errors.campaign_objective ? 'border-red-500' : 'border-gray-600 focus:border-red-500'
                    }`}
                  >
                    <option value="">Select campaign objective</option>
                    {campaignObjectives.map((objective) => (
                      <option key={objective} value={objective}>
                        {objective.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                  {errors.campaign_objective && (
                    <p className="text-brand text-sm mt-2">{errors.campaign_objective.message}</p>
                  )}
                </div>

                {/* Geo Location */}
                <div className="bg-bg-light rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-red-500" />
                    <h4 className="text-lg font-semibold text-white">Target Countries</h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {popularCountries.map((country) => (
                      <label key={country.code} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={watchedValues.geo_location?.includes(country.code) || false}
                          onChange={() => handleCountryToggle(country.code)}
                          className="w-4 h-4 text-red-600 bg-bg-dark border-gray-600 rounded focus:ring-red-500"
                        />
                        <span className="text-white text-sm">{country.name}</span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Other Countries Section */}
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <label className="flex items-center space-x-2 cursor-pointer mb-3">
                      <input
                        type="checkbox"
                        checked={isOtherChecked()}
                        onChange={handleOtherToggle}
                        className="w-4 h-4 text-red-600 bg-bg-dark border-gray-600 rounded focus:ring-red-500"
                      />
                      <span className="text-white text-sm font-medium">Other Countries</span>
                    </label>
                    
                    {showOtherCountries && (
                      <div className="bg-bg-light rounded-lg p-4 max-h-64 overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {additionalCountries.map((country) => (
                            <label key={country.code} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={watchedValues.geo_location?.includes(country.code) || false}
                                onChange={() => handleCountryToggle(country.code)}
                                className="w-4 h-4 text-red-600 bg-bg-dark border-gray-600 rounded focus:ring-red-500"
                              />
                              <span className="text-white text-sm">{country.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.geo_location && (
                    <p className="text-brand text-sm mt-2">{errors.geo_location.message}</p>
                  )}
                </div>

                {/* Age Range */}
                <div className="bg-bg-light rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="w-6 h-6 text-red-500" />
                    <h4 className="text-lg font-semibold text-white">Age Range</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Minimum Age</label>
                      <input
                        type="number"
                        {...register('age_min', { valueAsNumber: true })}
                        placeholder="18"
                        min="18"
                        max="65"
                        className={`w-full px-4 py-3 bg-bg-dark text-white rounded-lg border focus:outline-none ${
                          errors.age_min ? 'border-red-500' : 'border-gray-600 focus:border-red-500'
                        }`}
                      />
                      {errors.age_min && (
                        <p className="text-brand text-sm mt-1">{errors.age_min.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Maximum Age</label>
                      <input
                        type="number"
                        {...register('age_max', { valueAsNumber: true })}
                        placeholder="65"
                        min="18"
                        max="65"
                        className={`w-full px-4 py-3 bg-bg-dark text-white rounded-lg border focus:outline-none ${
                          errors.age_max ? 'border-red-500' : 'border-gray-600 focus:border-red-500'
                        }`}
                      />
                      {errors.age_max && (
                        <p className="text-brand text-sm mt-1">{errors.age_max.message}</p>
                      )}
                    </div>
                  </div>
                 
                </div>

                {/* Navigation */}
                <div className="flex justify-end">
                  <button
                    onClick={handleGenerateFiveAdTypes}
                    disabled={!isValid || !isDirty || isGenerating}
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
                    className="flex items-center gap-2 px-6 py-3 bg-bg-dark hover:bg-gray-600 text-white rounded-lg transition-colors"
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
                <div className="bg-bg-light rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Campaign Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Daily Budget:</span>
                      <span className="text-white ml-2">{currencySymbol}{(watchedValues.daily_budget / 100).toFixed(2)} ({accountCurrency})</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Objective:</span>
                      <span className="text-white ml-2">{watchedValues.campaign_objective}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Countries:</span>
                      <span className="text-white ml-2">
                        {watchedValues.geo_location && watchedValues.geo_location.length > 0 
                          ? watchedValues.geo_location.map(code => getCountryName(code)).join(', ')
                          : 'None selected'
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Age Range:</span>
                      <span className="text-white ml-2">{watchedValues.age_min} - {watchedValues.age_max}</span>
                    </div>
                  </div>
                </div>

                {/* Selected Content Summary */}
                <div className="bg-bg-light rounded-lg p-6">
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

                {/* Media Upload */}
                <div className="bg-bg-light rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-6 h-6 text-red-500" />
                      <h4 className="text-lg font-semibold text-white">Media Upload</h4>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Upload Image/Video (Optional)
                      </label>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaUpload}
                        className="w-full px-4 py-3 bg-bg-dark text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500"
                      />
                      {mediaFile && (
                        <p className="text-green-400 text-sm mt-2">
                          ✓ {mediaFile.name} uploaded
                        </p>
                      )}
                    </div>

                    {/* URL Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Or Enter Media URL
                      </label>
                      <input
                        type="url"
                        value={mediaUrl}
                        onChange={handleMediaUrlChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-3 bg-bg-dark text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    {/* Media Preview */}
                    {(mediaFile || mediaUrl) && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Preview
                        </label>
                        <div className="bg-bg-dark rounded-lg p-4">
                          {mediaFile && mediaFile.type.startsWith('image/') && (
                            <img 
                              src={URL.createObjectURL(mediaFile)} 
                              alt="Preview" 
                              className="max-w-full h-48 object-cover rounded"
                            />
                          )}
                          {mediaFile && mediaFile.type.startsWith('video/') && (
                            <video 
                              src={URL.createObjectURL(mediaFile)} 
                              controls 
                              className="max-w-full h-48 object-cover rounded"
                            />
                          )}
                          {!mediaFile && mediaUrl && (
                            <img 
                              src={mediaUrl} 
                              alt="Preview" 
                              className="max-w-full h-48 object-cover rounded"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                              }}
                            />
                          )}
                          {!mediaFile && mediaUrl && (
                            <div style={{ display: 'none' }} className="text-gray-400 text-center py-8">
                              Could not load image from URL
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 bg-bg-dark hover:bg-gray-600 text-white rounded-lg transition-colors"
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