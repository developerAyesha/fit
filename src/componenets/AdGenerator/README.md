# Multi-Step Ad Generator

A comprehensive Facebook ad creation tool that guides users through a step-by-step process to create professional ads.

## Features

### Step 1: Campaign Basics
- **Campaign Name**: Set a descriptive name for your campaign
- **Campaign Objective**: Choose from Facebook's campaign objectives:
  - Traffic (OUTCOME_TRAFFIC)
  - Leads (OUTCOME_LEADS) 
  - Sales (OUTCOME_SALES)
  - Engagement (OUTCOME_ENGAGEMENT)
  - Awareness (OUTCOME_AWARENESS)
- **Website URL**: Target URL for your campaign

### Step 2: Adset Configuration
- **Adset Name**: Name for your ad set
- **Daily Budget**: Set daily budget in cents (minimum $1.00)

### Step 3: Ad Content
- **Ad Name**: Name for your specific ad
- **Headline**: AI-generated or custom headline
- **Description**: AI-generated or custom ad description
- **Call to Action**: Choose from Facebook's CTA options

### Step 4: Targeting
- **Geographic Targeting**: Select target countries
- **Age Range**: Set minimum and maximum age
- **Interests**: Select relevant interests for targeting

### Step 5: Review & Create
- **Summary**: Review all configuration before creating
- **Final Creation**: Save the complete ad configuration

## AI Integration

The generator integrates with the existing AI content generation system:
- **Headlines**: AI-generated based on campaign name and brand data
- **Descriptions**: AI-generated ad descriptions
- **Custom Input**: Users can input custom values or use AI suggestions

## Data Structure

The generator creates a complete Facebook ad configuration:

```javascript
{
  "campaign_name": "Summer Sale 2024",
  "adset_name": "UK Audience Adset", 
  "ad_name": "Summer Sale Ad 1",
  "website_url": "https://example.com",
  "daily_budget": 1000,
  "generated_headline": "Amazing Summer Deals!",
  "generated_description": "Don't miss out on our incredible summer sale...",
  "generated_call_to_action": "SHOP_NOW",
  "campaign_objective": "OUTCOME_TRAFFIC",
  "targeting_config": {
    "geo_locations": {
      "countries": ["GB"]
    },
    "age_min": 25,
    "age_max": 55,
    "interests": ["Fitness", "Health"],
    "behaviors": []
  }
}
```

## Usage

1. Navigate to `/dashboard/generate-multistep`
2. Follow the step-by-step process
3. Use AI generation buttons for headlines and descriptions
4. Customize all fields as needed
5. Review and create your ad configuration

## Integration

- Uses existing `useAdGeneration` hook
- Integrates with user's brand data from onboarding
- Connects to existing AI content generation API
- Follows Facebook's ad requirements and best practices













