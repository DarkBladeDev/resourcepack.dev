"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knowledgeObjectSchema = exports.verificationSchema = exports.verificationLevelSchema = exports.knowledgeObjectDifficultySchema = exports.knowledgeObjectTypeSchema = void 0;
const zod_1 = require("zod");
const Change_1 = require("./Change");
const Relation_1 = require("./Relation");
exports.knowledgeObjectTypeSchema = zod_1.z.enum([
    "Asset",
    "Concept",
    "Tutorial",
    "Collection",
]);
exports.knowledgeObjectDifficultySchema = zod_1.z.enum([
    "Beginner",
    "Intermediate",
    "Advanced",
]);
exports.verificationLevelSchema = zod_1.z.enum([
    "official",
    "inferred",
    "community",
]);
exports.verificationSchema = zod_1.z.object({
    level: exports.verificationLevelSchema,
    confidence: zod_1.z.number().min(0).max(1).describe("Confidence score between 0.0 and 1.0"),
});
exports.knowledgeObjectSchema = zod_1.z.object({
    id: zod_1.z.string().describe("Permanent ID (e.g., 'minecraft.resourcepack.model.item')"),
    type: exports.knowledgeObjectTypeSchema,
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    introducedIn: zod_1.z.string().describe("The version this object was introduced (e.g., '1.8')"),
    deprecatedIn: zod_1.z.string().optional(),
    removedIn: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    namespaces: zod_1.z.array(zod_1.z.string()).default([]),
    difficulty: exports.knowledgeObjectDifficultySchema.optional(),
    verification: exports.verificationSchema.optional().describe("Trust level and confidence of this object"),
    // Embedded relationships for convenience in MDX frontmatter, though 
    // global relations should be parsed from all objects.
    relations: zod_1.z.array(Relation_1.relationSchema).default([]),
    // Embedded changes tracking the lifecycle of this specific object
    changes: zod_1.z.array(Change_1.changeSchema).default([]),
});
