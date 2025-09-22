import { z } from "zod";

// Business section schema (Step 1)
const businessSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  logo_url: z.string().url("Logo must be a valid URL").optional().or(z.literal("")),
  website_url: z.string().url("Website must be a valid URL").optional().or(z.literal("")),
  business_type: z.enum(["Online", "In Person"], {
    required_error: "Business type is required",
  }),
  business_city: z.string().optional().or(z.literal("")),
}).superRefine((val, ctx) => {
  if (val.business_type === "In Person") {
    if (!val.business_city || val.business_city.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["business_city"],
        message: "City is required for In Person businesses",
      });
    }
  }
});

// Visual (Step 2)
const visualSchema = z.object({
  brand_colors: z.array(z.string()).optional().default([]),
  voice_tone_style: z.string().optional().or(z.literal("")),
});

// Campaign (Step 3)
const campaignSchema = z.object({
  campaign_types: z.array(z.string()).default([]),
  seasonal_launch_options: z.array(z.string()).default([]),
  other_campaign_details: z.string().optional().or(z.literal("")),
});

// Social (Step 4)
const socialSchema = z.object({
  instagram_reel_url: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  meta_account: z.string().optional().or(z.literal("")),
  competitor_urls: z.array(z.string().url("Enter valid URLs")).optional().default([]),
});

// Brand (Step 5)
const brandSchema = z.object({
  coaching_style: z.string().optional().or(z.literal("")),
  brand_words: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => (Array.isArray(v) ? v.join(", ") : (v || ""))),
  words_to_avoid: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((v) => (Array.isArray(v) ? v.join(", ") : (v || ""))),
});

// Customer (Step 6)
const customerSchema = z.object({
  target_market: z.string().optional().or(z.literal("")),
  main_problem: z.string().min(1, "Main problem is required"),
  failed_solutions: z.string().min(1, "Failed solutions is required"),
  client_words: z.string().min(1, "Client words are required"),
  magic_wand_result: z.string().min(1, "Result is required"),
});

export const onboardingSchema = z.object({
  business: businessSchema,
  visual: visualSchema,
  campaign: campaignSchema,
  social: socialSchema,
  brand: brandSchema,
  customer: customerSchema,
});


