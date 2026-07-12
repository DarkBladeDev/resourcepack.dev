import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { knowledgeObjectSchema } from '@resourcepack/schemas';
import { z } from 'astro:content';

export const collections = {
	docs: defineCollection({ 
    schema: docsSchema({
      extend: z.object({
        id: z.string().optional(),
        type: z.string().optional(),
        introducedIn: z.string().optional(),
        difficulty: z.string().optional(),
        tags: z.array(z.string()).optional(),
        namespaces: z.array(z.string()).optional(),
        relations: z.array(z.any()).optional(),
        changes: z.array(z.any()).optional(),
      })
    })
  }),
};
