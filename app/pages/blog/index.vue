<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()

const { data: posts } = await useAsyncData('blog-posts', async () => {
  const all = await queryCollection('blog').order('date', 'DESC').all()
  return all.filter(post => !post.draft)
})

const selectedTag = computed(() => {
  const tag = route.query.tag
  return typeof tag === 'string' ? tag : ''
})

const visiblePosts = computed(() => {
  const list = posts.value ?? []
  if (!selectedTag.value) {
    return list
  }
  return list.filter(post => post.tags?.includes(selectedTag.value))
})

useSeoMeta({
  title: `博客 · ${appConfig.site.name}`,
  description: 'Markdown 笔记与搭建记录。',
  ogTitle: `博客 · ${appConfig.site.name}`,
  ogDescription: 'Markdown 笔记与搭建记录。',
})

useHead({
  link: [{ rel: 'canonical', href: `${appConfig.site.url}/blog` }],
})
</script>

<template>
  <LayoutPageHero
    kicker="笔记"
    title="博客"
    description="写一篇 Markdown 放到 content/blog/，就会出现在这里。草稿不会上岛。"
  >
    <p
      v-if="selectedTag"
      class="mt-4 text-sm text-muted"
    >
      标签：{{ selectedTag }}
      <NuxtLink
        to="/blog"
        class="ml-2 text-lagoon hover:underline"
      >
        清除
      </NuxtLink>
    </p>

    <ul
      v-if="visiblePosts.length"
      class="mt-8 grid gap-3"
    >
      <li
        v-for="post in visiblePosts"
        :key="post.path"
      >
        <BlogPostCard
          :path="post.path"
          :title="post.title"
          :description="post.description"
          :date="post.date"
          :tags="post.tags"
        />
      </li>
    </ul>

    <p
      v-else
      class="mt-8 rounded-2xl border border-dashed border-line bg-card p-6 text-sm text-muted"
    >
      {{ selectedTag ? '这个标签下还没有文章。' : '还没有已发布的文章。' }}
    </p>
  </LayoutPageHero>
</template>
