import { z } from "zod";
export declare const relationTypeSchema: z.ZodEnum<["depends_on", "uses", "extends", "parent_of", "child_of", "implements", "related"]>;
export declare const relationSchema: z.ZodObject<{
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
}>;
export type RelationType = z.infer<typeof relationTypeSchema>;
export type Relation = z.infer<typeof relationSchema>;
