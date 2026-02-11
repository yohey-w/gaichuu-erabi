import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  category: z.enum(['ranking', 'vs', 'area', 'review', 'specialty']),
  area: z.string().optional(),
  services: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  noindex: z.boolean().default(false),
});

const ranking = defineCollection({ type: 'content', schema: articleSchema });
const vs = defineCollection({ type: 'content', schema: articleSchema });
const area = defineCollection({ type: 'content', schema: articleSchema });
const review = defineCollection({ type: 'content', schema: articleSchema });

export const collections = { ranking, vs, area, review };
