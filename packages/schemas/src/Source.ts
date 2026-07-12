import { z } from "zod";

export const sourceTrustLevelSchema = z.enum([
  "Official",
  "Community",
  "Decompiled",
]);

export const sourceSchema = z.object({
  id: z.string().describe("Permanent source ID (e.g., 'source.mojang.tech_notes')"),
  name: z.string(),
  trustLevel: sourceTrustLevelSchema,
  url: z.string().url().optional(),
  license: z.string().optional(),
});

export type SourceTrustLevel = z.infer<typeof sourceTrustLevelSchema>;
export type Source = z.infer<typeof sourceSchema>;
