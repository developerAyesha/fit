'use client'
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "@/Config/Axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import Button from "@/utils/Button";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepIndicator from "./StepIndicator";
import { onboardingSchema } from "./schema";

// Initial state aligned with Mongoose schema
const initialData = {
  business: {
    business_name: "",
    logo_url: "",
    website_url: "",
    business_type: "In Person",
    business_city: ""
  },
  visual: {
    brand_colors: ["red"],
    voice_tone_style: ""
  },
  campaign: {
    campaign_types: [],
    seasonal_launch_options: [],
    other_campaign_details: ""
  },
  social: {
    instagram_reel_url: "",
    meta_account: "",
    competitor_urls: []
  },
  brand: {
    coaching_style: "",
    brand_words: [],
    words_to_avoid: []
  },
  customer: {
    target_market: "",
    main_problem: "",
    failed_solutions: "",
    client_words: "",
    magic_wand_result: ""
  }
};

const stepTitles = [
  "Business Foundation",
  "Visual Identity",
  "Campaign Strategy",
  "Social Presence",
  "Brand Voice",
  "Customer Psychology",
];

const stepSubtitles = [
  "Let's start with the basics of your brand",
  "Define your visual identity and target audience",
  "Choose your campaign types and approach",
  "These enhancers help us create more targeted and effective ads",
  "Your unique brand language and tone",
  "Understand your customer's mindset",
];

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [progress, setProgress] = useState({
    completed_steps: [],
    current_step: 1,
    step_status: {}
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  // no autosave; save only on Next

  const router = useRouter();
  const { user } = useAuth();
  const totalSteps = 6;

  // React Hook Form setup
  const methods = useForm({
    defaultValues: initialData,
    resolver: zodResolver(onboardingSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  // Fetch onboarding data + progress
  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        const userId = user?._id;
        if (!userId) return;
        const res = await Axios.get(`/onboarding/get-Onboarding-Info`);

        if (res.data.success) {
          if (res.data.data.progress?.step_status === "completed") {
            setCompleted(true);
            return;
          }
          console.log("Fetched Onboarding Data:", res.data.data);
          
          if (res.data.data.data) {
            const merged = (prev) => ({
              ...prev,
              ...res.data.data.data,
              business: { ...prev.business, ...(res.data.data.data.business || {}) },
              visual: { ...prev.visual, ...(res.data.data.data.visual || {}) },
              campaign: { ...prev.campaign, ...(res.data.data.data.campaign || {}) },
              social: { ...prev.social, ...(res.data.data.data.social || {}) },
              brand: { ...prev.brand, ...(res.data.data.data.brand || {}) },
              customer: { ...prev.customer, ...(res.data.data.data.customer || {}) },
            });
            setData((prev) => merged(prev));
            // sync RHF values as source of truth for migrated steps
            methods.reset(merged(initialData));
          }
          if (res.data.data.progress) {
            setProgress(res.data.data.progress);
            setCurrentStep(res.data.data.progress.current_step || 1);
          }
        }
      } catch (err) {
        console.error("Error fetching onboarding data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOnboarding();
  }, [user]);

  // Handle UI states
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen text-white">
  //       Checking your onboarding status...
  //     </div>
  //   );
  // }

  if (completed) {
    router.push("/dashboard");
    return (
      <div className="flex items-center justify-center h-screen text-white">
        ✅ Your onboarding is already completed. Redirecting to dashboard...
      </div>
    );
  }

  // Update nested state safely
  const updateData = (section, updates) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };

  const saveStep = async (stepName, userId, stepData, currentStep) => {
    try {
      if (!userId) return { success: false };
      const res = await Axios.post(`/onboarding/save-step/${stepName}`, {
        data: stepData,
        current_step: currentStep,
      });

      if (res.data.success) {
        setProgress(res.data.data.progress);
        // setData((prevData) => ({
        //   ...prevData,
        //   ...res.data.data.onboardingData
        // }));
      }

      return res.data;
    } catch (error) {
      console.error("saveStep error:", error);
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to save step");
      }
      throw new Error("Network error. Please try again.");
    } finally {
    }
  };


  const handleNext = async () => {
    setLoading(true);
    try {
      const stepMap = {
        1: "business",
        2: "visual",
        3: "campaign",
        4: "social",
        5: "brand",
        6: "customer",
      };

      const stepName = stepMap[currentStep];
      let stepData;
      const userId = user?._id;

      if (currentStep === 1) {
        // Validate only StepOne fields
        const valid = await methods.trigger([
          "business.business_name",
          "business.business_type",
          "business.business_city",
          "business.website_url",
          "business.logo_url",
        ]);
        if (!valid) {
          setLoading(false);
          return;
        }
        stepData = methods.getValues("business");
      } else if (currentStep === 2) {
        const valid = await methods.trigger([
          "visual.brand_colors",
          "visual.voice_tone_style",
        ]);
        if (!valid) {
          setLoading(false);
          return;
        }
        stepData = methods.getValues("visual");
      } else if (currentStep === 3) {
        const valid = await methods.trigger([
          "campaign.campaign_types",
          "campaign.seasonal_launch_options",
          "campaign.other_campaign_details",
        ]);
        if (!valid) {
          setLoading(false);
          return;
        }
        stepData = methods.getValues("campaign");
      } else if (currentStep === 4) {
        const valid = await methods.trigger([
          "social.instagram_reel_url",
          "social.meta_account",
          "social.competitor_urls",
        ]);
        if (!valid) {
          setLoading(false);
          return;
        }
        stepData = methods.getValues("social");
      } else if (currentStep === 5) {
        const valid = await methods.trigger([
          "brand.coaching_style",
          "brand.brand_words",
          "brand.words_to_avoid",
        ], { shouldFocus: false });
        if (!valid) {
          setLoading(false);
          return;
        }
        stepData = methods.getValues("brand");
      } else if (currentStep === 6) {
        const valid = await methods.trigger([
          "customer.target_market",
          "customer.main_problem",
          "customer.failed_solutions",
          "customer.client_words",
          "customer.magic_wand_result",
        ]);
        if (!valid) {
          setLoading(false);
          return;
        }
        stepData = methods.getValues("customer");
      } else {
        stepData = data[stepName];
      }

      await saveStep(stepName, userId, stepData, currentStep);

      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      alert("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };
 console.log("data",data);
 
  const renderStep = () => {
    const stepProps = { data, updateData };
    switch (currentStep) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo {...stepProps} />;
      case 3:
        return <StepThree {...stepProps} />;
      case 4:
        return <StepFour {...stepProps} />;
      case 5:
        return <StepFive {...stepProps} />;
      case 6:
        return <StepSix {...stepProps} />;
      default:
        return <StepOne />;
    }
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Welcome to FITNESSADS.AI
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Let's build your perfect ad-generating machine
        </p>
        <StepIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitles={stepTitles}
          completedSteps={progress.completed_steps}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-300 ${
            isAnimating
              ? "opacity-50 translate-x-4"
              : "opacity-100 translate-x-0"
          }`}
        >
          <FormProvider {...methods}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 onboarding-form" style={{ '--tw-ring-color': '#fa2a00' }}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {stepTitles[currentStep - 1]}
                </h2>
                <p className="text-gray-300">{stepSubtitles[currentStep - 1]}</p>
              </div>

              {renderStep()}
            </div>
          </FormProvider>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="back"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </Button>

            <Button
              variant="continue"
              onClick={handleNext}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : currentStep === totalSteps
                ? "Complete Setup"
                : "Continue"}
              {!loading && <ChevronRight className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingWizard;
