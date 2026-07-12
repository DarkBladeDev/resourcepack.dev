import { z } from "zod";

export const collectionSchema = z.object({
  id: z.string().describe("Permanent ID for the collection (e.g., 'collection.models.swords')"),
  title: z.string(),
  description: z.string(),
  items: z.array(z.string()).describe("Array of KnowledgeObject IDs that belong to this collection"),
});

export type Collection = z.infer<typeof collectionSchema>;
