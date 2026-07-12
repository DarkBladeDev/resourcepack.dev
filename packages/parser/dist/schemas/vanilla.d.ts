import { z } from "zod";
export declare const vanillaPackMcmetaSchema: z.ZodObject<{
    pack: z.ZodObject<{
        pack_format: z.ZodNumber;
        description: z.ZodUnion<[z.ZodString, z.ZodAny]>;
        supported_formats: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        pack_format: number;
        description?: any;
        supported_formats?: any;
    }, {
        pack_format: number;
        description?: any;
        supported_formats?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    pack: {
        pack_format: number;
        description?: any;
        supported_formats?: any;
    };
}, {
    pack: {
        pack_format: number;
        description?: any;
        supported_formats?: any;
    };
}>;
export declare const vanillaModelSchema: z.ZodObject<{
    parent: z.ZodOptional<z.ZodString>;
    ambientocclusion: z.ZodOptional<z.ZodBoolean>;
    display: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    textures: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    elements: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    parent?: string | undefined;
    ambientocclusion?: boolean | undefined;
    display?: Record<string, any> | undefined;
    textures?: Record<string, string> | undefined;
    elements?: any[] | undefined;
}, {
    parent?: string | undefined;
    ambientocclusion?: boolean | undefined;
    display?: Record<string, any> | undefined;
    textures?: Record<string, string> | undefined;
    elements?: any[] | undefined;
}>;
export declare const vanillaBlockstateSchema: z.ZodObject<{
    variants: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    multipart: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    variants?: Record<string, any> | undefined;
    multipart?: any[] | undefined;
}, {
    variants?: Record<string, any> | undefined;
    multipart?: any[] | undefined;
}>;
export type VanillaPackMcmeta = z.infer<typeof vanillaPackMcmetaSchema>;
export type VanillaModel = z.infer<typeof vanillaModelSchema>;
export type VanillaBlockstate = z.infer<typeof vanillaBlockstateSchema>;
