import { z } from "zod";
import { changeSchema } from "./Change";
import { relationSchema } from "./Relation";

export const knowledgeObjectTypeSchema = z.enum([
  "Asset",
  "Concept",
  "Tutorial",
  "Collection",
]);

export const knowledgeObjectDifficultySchema = z.enum([
  "Beginner",
  "Intermediate",
  "Advanced",
]);

export const verificationLevelSchema = z.enum([
  "official",
  "inferred",
  "community",
]);

export const verificationSchema = z.object({
  level: verificationLevelSchema,
  confidence: z.number().min(0).max(1).describe("Confidence score between 0.0 and 1.0"),
});

export const knowledgeObjectSchema = z.object({
  id: z.string().describe("Permanent ID (e.g., 'minecraft.resourcepack.model.item')"),
  type: knowledgeObjectTypeSchema,
  title: z.string(),
  description: z.string(),
  introducedIn: z.string().describe("The version this object was introduced (e.g., '1.8')"),
  deprecatedIn: z.string().optional(),
  removedIn: z.string().optional(),
  tags: z.array(z.string()).default([]),
  namespaces: z.array(z.string()).default([]),
  difficulty: knowledgeObjectDifficultySchema.optional(),
  verification: verificationSchema.optional().describe("Trust level and confidence of this object"),
  
  // Embedded relationships for convenience in MDX frontmatter, though 
  // global relations should be parsed from all objects.
  relations: z.array(relationSchema).default([]),
  
  // Embedded changes tracking the lifecycle of this specific object
  changes: z.array(changeSchema).default([]),
});

export type KnowledgeObjectType = z.infer<typeof knowledgeObjectTypeSchema>;
export type KnowledgeObjectDifficulty = z.infer<typeof knowledgeObjectDifficultySchema>;
export type KnowledgeObject = z.infer<typeof knowledgeObjectSchema>;
