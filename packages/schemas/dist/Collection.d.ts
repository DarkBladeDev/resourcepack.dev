import { z } from "zod";
export declare const collectionSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    items: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    description: string;
    id: string;
    title: string;
    items: string[];
}, {
    description: string;
    id: string;
    title: string;
    items: string[];
}>;
export type Collection = z.infer<typeof collectionSchema>;
