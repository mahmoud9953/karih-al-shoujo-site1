import { defineCollection, z } from "astro:content";

const novels = defineCollection({
  type: "content",

  // Use the file path as the internal slug/ID.
  // Example ID: "karih-al-shoujo/001-المقدمة"
  slug: ({ id }) => id,

  schema: z.object({
    title: z.string(),
    novel: z.string(),
    slug: z.string().optional(),      // frontmatter `slug` is allowed but NOT used as ID
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
