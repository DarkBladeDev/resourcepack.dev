import { z } from "zod";

export const changeTypeSchema = z.enum([
  "added",
  "modified",
  "deprecated",
  "removed",
]);

export const changeSchema = z.object({
  version: z.string().describe("The version where the change occurred (e.g., '1.20.5')"),
  type: changeTypeSchema,
  description: z.string().describe("A human-readable description of the change"),
});

export type ChangeType = z.infer<typeof changeTypeSchema>;
export type Change = z.infer<typeof changeSchema>;
