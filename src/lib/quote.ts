import { z } from "zod";

const configuratorSchema = z
  .object({
    siteType: z.string().optional(),
    strategy: z.string().optional(),
    mood: z.string().optional(),
    features: z.array(z.string()).optional(),
    integrations: z.array(z.string()).optional(),
  })
  .optional();

export const quoteSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    projectType: z.string().min(2),
    goal: z.string().min(5),
    pages: z.array(z.string()).optional().default([]),
    aiModules: z.array(z.string()).optional().default([]),
    mobilePlatforms: z.array(z.string()).optional().default([]),
    mobileFeatures: z.array(z.string()).optional().default([]),
    storeSupport: z.string().optional(),
    techPreferences: z.string().optional(),
    inspirations: z.string().optional(),
    budget: z.string().min(2),
    timeline: z.string().min(2),
    message: z.string().optional(),
    clientType: z.enum(["entreprise", "particulier"]).optional(),
    companyName: z.string().min(2).optional(),
    projectFocus: z.enum(["web", "mobile"]).optional(),
    configurator: configuratorSchema,
  })
  .superRefine((data, ctx) => {
    const focus = data.projectFocus ?? "web";
    if (focus === "web" && (!data.pages || data.pages.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pages"],
        message: "Au moins une page est requise.",
      });
    }
    if (focus === "mobile" && (!data.mobilePlatforms || data.mobilePlatforms.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mobilePlatforms"],
        message: "Au moins une plateforme est requise.",
      });
    }
  });

export type QuoteRequest = z.infer<typeof quoteSchema>;
export type QuoteStatus = {
  feasibility?: "pending" | "feasible" | "blocked";
  deposit?: "none" | "deposit" | "servers";
};

export type QuoteRecord = QuoteRequest & QuoteStatus & { id?: string; submittedAt: string };
