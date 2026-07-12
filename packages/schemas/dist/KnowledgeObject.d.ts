import { z } from "zod";
export declare const knowledgeObjectTypeSchema: z.ZodEnum<["Asset", "Concept", "Tutorial", "Collection"]>;
export declare const knowledgeObjectDifficultySchema: z.ZodEnum<["Beginner", "Intermediate", "Advanced"]>;
export declare const verificationLevelSchema: z.ZodEnum<["official", "inferred", "community"]>;
export declare const verificationSchema: z.ZodObject<{
    level: z.ZodEnum<["official", "inferred", "community"]>;
    confidence: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    level: "official" | "inferred" | "community";
    confidence: number;
}, {
    level: "official" | "inferred" | "community";
    confidence: number;
}>;
export declare const knowledgeObjectSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["Asset", "Concept", "Tutorial", "Collection"]>;
    title: z.ZodString;
    description: z.ZodString;
    introducedIn: z.ZodString;
    deprecatedIn: z.ZodOptional<z.ZodString>;
    removedIn: z.ZodOptional<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    namespaces: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    difficulty: z.ZodOptional<z.ZodEnum<["Beginner", "Intermediate", "Advanced"]>>;
    verification: z.ZodOptional<z.ZodObject<{
        level: z.ZodEnum<["official", "inferred", "community"]>;
        confidence: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        level: "official" | "inferred" | "community";
        confidence: number;
    }, {
        level: "official" | "inferred" | "community";
        confidence: number;
    }>>;
    relations: z.ZodDefault<z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
        type: z.ZodEnum<["depends_on", "uses", "extends", "parent_of", "child_of", "implements", "related"]>;
    }, "strip", z.ZodTypeAny, {
        type: "depends_on" | "uses" | "extends" | "parent_of" | "child_of" | "implements" | "related";
        from: string;
        to: string;
    }, {
        type: "depends_on" | "uses" | "extends" | "parent_of" | "child_of" | "implements" | "related";
        from: string;
        to: string;
    }>, "many">>;
    changes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        version: z.ZodString;
        type: z.ZodEnum<["added", "modified", "deprecated", "removed"]>;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        version: string;
        type: "added" | "modified" | "deprecated" | "removed";
        description: string;
    }, {
        version: string;
        type: "added" | "modified" | "deprecated" | "removed";
        description: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    type: "Asset" | "Concept" | "Tutorial" | "Collection";
    description: string;
    id: string;
    title: string;
    introducedIn: string;
    tags: string[];
    namespaces: string[];
    relations: {
        type: "depends_on" | "uses" | "extends" | "parent_of" | "child_of" | "implements" | "related";
        from: string;
        to: string;
    }[];
    changes: {
        version: string;
        type: "added" | "modified" | "deprecated" | "removed";
        description: string;
    }[];
    deprecatedIn?: string | undefined;
    removedIn?: string | undefined;
    difficulty?: "Beginner" | "Intermediate" | "Advanced" | undefined;
    verification?: {
        level: "official" | "inferred" | "community";
        confidence: number;
    } | undefined;
}, {
    type: "Asset" | "Concept" | "Tutorial" | "Collection";
    description: string;
    id: string;
    title: string;
    introducedIn: string;
    deprecatedIn?: string | undefined;
    removedIn?: string | undefined;
    tags?: string[] | undefined;
    namespaces?: string[] | undefined;
    difficulty?: "Beginner" | "Intermediate" | "Advanced" | undefined;
    verification?: {
        level: "official" | "inferred" | "community";
        confidence: number;
    } | undefined;
    relations?: {
        type: "depends_on" | "uses" | "extends" | "parent_of" | "child_of" | "implements" | "related";
        from: string;
        to: string;
    }[] | undefined;
    changes?: {
        version: string;
        type: "added" | "modified" | "deprecated" | "removed";
        description: string;
    }[] | undefined;
}>;
export type KnowledgeObjectType = z.infer<typeof knowledgeObjectTypeSchema>;
export type KnowledgeObjectDifficulty = z.infer<typeof knowledgeObjectDifficultySchema>;
export type KnowledgeObject = z.infer<typeof knowledgeObjectSchema>;
