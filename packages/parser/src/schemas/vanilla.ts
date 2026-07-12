import { z } from "zod";

// MVP Vanilla Asset Schemas

export const vanillaPackMcmetaSchema = z.object({
  pack: z.object({
    pack_format: z.number(),
    description: z.union([z.string(), z.any()]), // Can be string or rawtext
    supported_formats: z.any().optional(),
  })
});

export const vanillaModelSchema = z.object({
  parent: z.string().optional(),
  ambientocclusion: z.boolean().optional(),
  display: z.record(z.any()).optional(),
  textures: z.record(z.string()).optional(),
  elements: z.array(z.any()).optional(),
});

export const vanillaBlockstateSchema = z.object({
  variants: z.record(z.any()).optional(),
  multipart: z.array(z.any()).optional(),
});

export type VanillaPackMcmeta = z.infer<typeof vanillaPackMcmetaSchema>;
export type VanillaModel = z.infer<typeof vanillaModelSchema>;
export type VanillaBlockstate = z.infer<typeof vanillaBlockstateSchema>;
