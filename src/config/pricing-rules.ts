export const pricingRules = {
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

export type PricingProjectType = keyof typeof pricingRules.baseDays;
export type PricingFeature = keyof typeof pricingRules.featureWeights;
