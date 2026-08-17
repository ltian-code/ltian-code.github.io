import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: {
        include: 'blog/*.md',
        prefix: '/blog',
      },
      schema: z.object({
        date: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
        draft: z.boolean().default(false),
      }),
    }),
  },
})
