import { defineCollection, z } from "astro:content";

const novels = defineCollection({
  type: "content",

  schema: z.object({
    title: z.string(),
    novel: z.string(),
    slug: z.string().optional(),   // frontmatter `slug` is allowed as normal data
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
