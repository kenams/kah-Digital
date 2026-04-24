export const pricingRules = {
  dailyRate: {
    min: 600,
    max: 800,
    currency: "EUR",
  },
  minimums: {
    showcase_website: 1200,
    corporate_website: 2500,
    ecommerce: 4500,
    web_app: 6000,
    mobile_app: 9000,
    glpi_assistant: 3000,
    dashboard_portal: 5000,
    unknown: 1200,
  },
  baseDays: {
    showcase_website: 4,
    corporate_website: 8,
    ecommerce: 12,
    web_app: 14,
    mobile_app: 20,
    glpi_assistant: 8,
    dashboard_portal: 10,
    unknown: 5,
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
