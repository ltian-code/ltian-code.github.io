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

const query = ref('')

const visiblePosts = computed(() => {
  const list = posts.value ?? []
  const tag = selectedTag.value
  const needle = query.value.trim().toLowerCase()
  return list.filter((post) => {
    if (tag && !post.tags?.includes(tag)) {
      return false
    }
    if (!needle) {
      return true
    }
    const haystack = [post.title, post.description, ...(post.tags ?? [])].join(' ').toLowerCase()
    return haystack.includes(needle)
  })
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

useIsleOg({
  title: '博客',
  description: 'Markdown 笔记与搭建记录。',
  kicker: 'CodeIsle',
})
</script>

<template>
  <LayoutPageHero
    kicker="笔记"
    title="博客"
    description="写一篇 Markdown 放到 content/blog/，就会出现在这里。草稿不会上岛。"
  >
    <div class="mt-6">
      <label class="sr-only" for="blog-search">搜索文章</label>
      <input
        id="blog-search"
        v-model="query"
        type="search"
        placeholder="搜索标题、摘要、标签…"
        class="h-11 w-full rounded-lg border border-line bg-card px-3 text-sm sm:max-w-md"
      >
    </div>

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
      {{ selectedTag ? '这个标签下还没有文章。' : (query.trim() ? '没有匹配的文章。' : '还没有已发布的文章。') }}
    </p>
  </LayoutPageHero>
</template>
