import { z } from "zod";
export declare const sourceTrustLevelSchema: z.ZodEnum<["Official", "Community", "Decompiled"]>;
export declare const sourceSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    trustLevel: z.ZodEnum<["Official", "Community", "Decompiled"]>;
    url: z.ZodOptional<z.ZodString>;
    license: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    trustLevel: "Official" | "Community" | "Decompiled";
    url?: string | undefined;
    license?: string | undefined;
}, {
    id: string;
    name: string;
    trustLevel: "Official" | "Community" | "Decompiled";
    url?: string | undefined;
    license?: string | undefined;
}>;
export type SourceTrustLevel = z.infer<typeof sourceTrustLevelSchema>;
export type Source = z.infer<typeof sourceSchema>;
