import { z } from "zod";

export const relationTypeSchema = z.enum([
  "depends_on",
  "uses",
  "extends",
  "parent_of",
  "child_of",
  "implements",
  "related",
]);

export const relationSchema = z.object({
  from: z.string().describe("The ID of the source KnowledgeObject"),
  to: z.string().describe("The ID of the target KnowledgeObject"),
  type: relationTypeSchema,
});

export type RelationType = z.infer<typeof relationTypeSchema>;
export type Relation = z.infer<typeof relationSchema>;
