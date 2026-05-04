export const pricingRules = {
  currency: "EUR",
  dailyRate: {
    min: 600,
    max: 800,
    currency: "EUR",
  },
  catalogRanges: {
    landing_portfolio: {
      min: 300,
      max: 600,
      estimatedDays: 5,
    },
    showcase_website: {
      min: 900,
      max: 1500,
      estimatedDays: 10,
    },
    corporate_website: {
      min: 2200,
      max: 4500,
      estimatedDays: 20,
    },
    ecommerce: {
      min: 3500,
      max: 9000,
      estimatedDays: 25,
    },
    web_app: {
      min: 4000,
      max: 12000,
      estimatedDays: 30,
    },
    mobile_app: {
      min: 6000,
      max: 20000,
      estimatedDays: 45,
    },
    glpi_assistant: {
      min: 2500,
      max: 8000,
      estimatedDays: 15,
    },
    dashboard_portal: {
      min: 4000,
      max: 12000,
      estimatedDays: 25,
    },
    automation_ai: {
      min: 1500,
      max: 8000,
      estimatedDays: 15,
    },
    unknown: {
      min: 300,
      max: 12000,
      estimatedDays: 10,
    },
  },
  minimums: {
    landing_portfolio: 300,
    showcase_website: 900,
    corporate_website: 2200,
    ecommerce: 3500,
    web_app: 4000,
    mobile_app: 6000,
    glpi_assistant: 2500,
    dashboard_portal: 4000,
    automation_ai: 1500,
    unknown: 300,
  },
  baseDays: {
    landing_portfolio: 5,
    showcase_website: 10,
    corporate_website: 20,
    ecommerce: 25,
    web_app: 30,
    mobile_app: 45,
    glpi_assistant: 15,
    dashboard_portal: 25,
    automation_ai: 15,
    unknown: 10,
  },
  featureWeights: {
    auth: 2,
    payment: 3,
    api: 2,
    dashboard: 2,
    geolocation: 3,
    multilingual: 1,
  },
} as const;

export type PricingProjectType = keyof typeof pricingRules.minimums;
export type PricingFeature = keyof typeof pricingRules.featureWeights;
