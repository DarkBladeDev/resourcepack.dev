import { z } from "zod";
export declare const changeTypeSchema: z.ZodEnum<["added", "modified", "deprecated", "removed"]>;
export declare const changeSchema: z.ZodObject<{
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
}>;
export type ChangeType = z.infer<typeof changeTypeSchema>;
export type Change = z.infer<typeof changeSchema>;
