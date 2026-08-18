<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

const appConfig = useAppConfig()
const route = useRoute()

const slug = computed(() => String(route.params.slug || ''))
const path = computed(() => `/blog/${slug.value}`)

const { data: post } = await useAsyncData(
  () => `blog-post-${slug.value}`,
  async () => {
    const item = await queryCollection('blog').path(path.value).first()
    if (!item || item.draft) {
      return null
    }
    return item
  },
  { watch: [slug] },
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: '文章不存在',
    fatal: true,
  })
}

const { data: siblings } = await useAsyncData('blog-posts', async () => {
  const all = await queryCollection('blog').order('date', 'DESC').all()
  return all.filter(item => !item.draft)
})

const tocLinks = computed<TocLink[]>(() => post.value?.body?.toc?.links ?? [])

const neighbors = computed(() => {
  const list = siblings.value ?? []
  const index = list.findIndex(item => item.path === post.value?.path)
  return {
    newer: index > 0 ? list[index - 1] : null,
    older: index >= 0 && index < list.length - 1 ? list[index + 1] : null,
  }
})

const canonical = computed(() => `${appConfig.site.url}${post.value?.path ?? path.value}`)

useSeoMeta({
  title: () => `${post.value?.title ?? '文章'} · ${appConfig.site.name}`,
  description: () => post.value?.description || appConfig.site.description,
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogType: 'article',
  ogUrl: canonical,
})

useHead({
  link: () => [{ rel: 'canonical', href: canonical.value }],
})

useIsleOg({
  title: post.value.title,
  description: post.value.description,
  kicker: '博客',
})
</script>

<template>
  <div
    v-if="post"
    class="mx-auto max-w-isle px-4 py-10 md:px-6 md:py-14"
  >
    <div class="lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-10">
      <article>
        <p class="text-sm text-muted">
          <NuxtLink
            to="/blog"
            class="text-lagoon hover:underline"
          >
            博客
          </NuxtLink>
          <span aria-hidden="true"> · </span>
          <time :datetime="post.date">{{ formatPostDate(post.date) }}</time>
        </p>
        <h1 class="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
          {{ post.title }}
        </h1>
        <p
          v-if="post.titleEn"
          class="mt-2 text-sm text-muted"
          lang="en"
        >
          {{ post.titleEn }}
        </p>
        <p
          v-if="post.description"
          class="mt-3 max-w-2xl text-base text-muted"
        >
          {{ post.description }}
        </p>
        <BlogPostTags
          class="mt-4"
          :tags="post.tags"
          to="/blog"
        />

        <details
          v-if="tocLinks.length"
          class="mt-8 rounded-xl border border-line bg-card p-4 lg:hidden"
        >
          <summary class="cursor-pointer text-sm font-medium text-ink">
            目录
          </summary>
          <BlogPostToc
            class="mt-3"
            :links="tocLinks"
          />
        </details>

        <div class="isle-prose mt-8">
          <ContentRenderer :value="post" />
        </div>

        <nav
          class="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2"
          aria-label="相邻文章"
        >
          <NuxtLink
            v-if="neighbors.newer"
            :to="neighbors.newer.path"
            class="rounded-xl border border-line bg-card p-4 hover:border-lagoon"
          >
            <span class="text-xs text-muted">上一篇</span>
            <span class="mt-1 block text-sm text-ink">{{ neighbors.newer.title }}</span>
          </NuxtLink>
          <NuxtLink
            v-if="neighbors.older"
            :to="neighbors.older.path"
            class="rounded-xl border border-line bg-card p-4 hover:border-lagoon sm:text-right"
          >
            <span class="text-xs text-muted">下一篇</span>
            <span class="mt-1 block text-sm text-ink">{{ neighbors.older.title }}</span>
          </NuxtLink>
        </nav>

        <BlogComments />
      </article>

      <aside
        v-if="tocLinks.length"
        class="hidden lg:block"
      >
        <div class="sticky top-24">
          <BlogPostToc :links="tocLinks" />
        </div>
      </aside>
    </div>
  </div>
</template>
