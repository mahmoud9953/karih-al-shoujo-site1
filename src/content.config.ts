import { defineCollection, z } from "astro:content";

const novels = defineCollection({
  type: "content",

  schema: z.object({
    title: z.string(),
    novel: z.string(),
    slug: z.string(),       // e.g. "karih-al-shoujo"
    chapter: z.number(),    // 1, 2, 3...
    summary: z.string().optional(),
    publishedAt: z.string().optional(),
    cover: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { novels };
