import { defineCollection, z } from "astro:content";

const novels = defineCollection({
  schema: z.object({
    title: z.string(),
    novel: z.string(),
    slug: z.string(),
    chapter: z.number(),
    summary: z.string().optional(),
    publishedAt: z.string().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
  }),
});

export const collections = {
  novels,
};
