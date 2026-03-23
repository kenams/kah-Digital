import { z } from "zod";

export const assistantIntentSchema = z.enum([
  "project_quote",
  "support_glpi",
  "faq",
  "general_info",
  "unknown",
]);

export const assistantProjectTypeSchema = z.enum([
  "showcase_website",
  "corporate_website",
  "ecommerce",
  "web_app",
  "mobile_app",
  "dashboard_portal",
  "glpi_assistant",
  "unknown",
]);

export const assistantComplexitySchema = z.enum(["low", "medium", "high"]);

export const assistantTranscriptItemSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
  at: z.string().optional(),
});

export const assistantCollectedSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  type: z.string().optional(),
  objective: z.string().optional(),
  features: z.string().optional(),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  users: z.string().optional(),
  countriesLanguages: z.string().optional(),
  technicalNeeds: z.string().optional(),
  problem: z.string().optional(),
  urgency: z.string().optional(),
  impact: z.string().optional(),
  affectedUsers: z.string().optional(),
  sinceWhen: z.string().optional(),
  actionsTried: z.string().optional(),
}).default({});

export const assistantStructuredOutputSchema = z.object({
  intent: z.string(),
  project_type: z.string(),
  clarity_score: z.number(),
  complexity: assistantComplexitySchema,
  budget_range: z.object({
    min: z.number(),
    max: z.number(),
  }),
  estimated_days: z.number(),
  roles: z.array(z.string()),
  missing_info: z.array(z.string()),
  next_step: z.string(),
});

export const assistantSessionSchema = z.object({
  locale: z.enum(["fr", "en", "de"]).default("fr"),
  status: z.enum(["idle", "collecting", "ready"]).default("idle"),
  intent: assistantIntentSchema.default("unknown"),
  projectType: assistantProjectTypeSchema.default("unknown"),
  lastAskedField: z.string().nullable().optional(),
  collected: assistantCollectedSchema,
  transcript: z.array(assistantTranscriptItemSchema).default([]),
  summary: assistantStructuredOutputSchema.optional(),
  humanNeeded: z.boolean().optional(),
});

export const assistantMessageRequestSchema = z.object({
  message: z.string().min(1),
  locale: z.enum(["fr", "en", "de"]).default("fr"),
  session: assistantSessionSchema.optional(),
});

export const assistantLeadRequestSchema = z.object({
  locale: z.enum(["fr", "en", "de"]).default("fr"),
  consent: z.boolean(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  summary: assistantStructuredOutputSchema,
  transcript: z.array(assistantTranscriptItemSchema).default([]),
});

export const assistantEmailRequestSchema = z.object({
  locale: z.enum(["fr", "en", "de"]).default("fr"),
  consent: z.boolean(),
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  summary: assistantStructuredOutputSchema,
  transcript: z.array(assistantTranscriptItemSchema).default([]),
});

export const assistantGlpiRequestSchema = z.object({
  locale: z.enum(["fr", "en", "de"]).default("fr"),
  consent: z.boolean(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  summary: assistantStructuredOutputSchema,
  transcript: z.array(assistantTranscriptItemSchema).default([]),
});

export type AssistantIntent = z.infer<typeof assistantIntentSchema>;
export type AssistantProjectType = z.infer<typeof assistantProjectTypeSchema>;
export type AssistantComplexity = z.infer<typeof assistantComplexitySchema>;
export type AssistantTranscriptItem = z.infer<typeof assistantTranscriptItemSchema>;
export type AssistantStructuredOutput = z.infer<typeof assistantStructuredOutputSchema>;
export type AssistantSession = z.infer<typeof assistantSessionSchema>;

export const assistantLeadScoreSchema = z.enum([
  "hot",
  "medium",
  "low",
  "support_urgent",
  "out_of_scope",
]);

export type AssistantLeadScore = z.infer<typeof assistantLeadScoreSchema>;

export const assistantRecordSchema = z.object({
  id: z.string().optional(),
  submittedAt: z.string(),
  locale: z.enum(["fr", "en", "de"]),
  action: z.enum(["summary_email", "human_followup", "glpi_ticket"]),
  intent: assistantIntentSchema,
  projectType: assistantProjectTypeSchema,
  score: assistantLeadScoreSchema,
  scoreLabel: z.string(),
  scoreReason: z.string(),
  humanNeeded: z.boolean(),
  email: z.string().email().nullish().transform((value) => value ?? undefined),
  name: z.string().nullish().transform((value) => value ?? undefined),
  phone: z.string().nullish().transform((value) => value ?? undefined),
  company: z.string().nullish().transform((value) => value ?? undefined),
  consent: z.boolean(),
  summary: assistantStructuredOutputSchema,
  transcript: z.array(assistantTranscriptItemSchema).default([]),
  status: z.enum(["new", "processed"]).default("new"),
});

export type AssistantRecord = z.infer<typeof assistantRecordSchema>;
