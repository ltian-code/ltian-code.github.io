<script setup lang="ts">
import { featuredAiLinks } from '~/data/ai-links'
import { categoryLabels, featuredTools } from '~/data/tools'

const appConfig = useAppConfig()
const toolbox = useToolboxStore()

useSeoMeta({
  title: `${appConfig.site.name} · ${appConfig.site.nameZh}`,
  description: appConfig.site.description,
})

useIsleOg({
  title: appConfig.site.name,
  description: appConfig.site.tagline,
  kicker: appConfig.site.nameZh,
})

const { data: posts } = await useAsyncData('home-posts', async () => {
  const all = await queryCollection('blog').order('date', 'DESC').all()
  return all.filter(post => !post.draft).slice(0, 3)
})

const toolsOnHome = computed(() => featuredTools(toolbox.toolIds, 6))
const aiOnHome = featuredAiLinks()

onMounted(() => toolbox.hydrate())

const channels = [
  {
    to: '/blog',
    title: '博客',
    copy: 'Markdown 笔记已经开岛，列表与详情可看。',
  },
  {
    to: '/tools',
    title: '工具箱',
    copy: '十个纯前端工具：时间戳、JSON、编解码、正则、颜色、JWT、密码。',
  },
  {
    to: '/ai',
    title: 'AI 导航',
    copy: '对话、Agent、绘图、搜索、语音的官方航路图。',
  },
]
</script>

<template>
  <div>
    <section class="border-b border-line bg-sand/30">
      <div class="mx-auto flex max-w-isle items-center justify-between gap-8 px-4 py-14 md:px-6 md:py-20">
        <div>
          <p class="text-sm font-medium tracking-wide text-lagoon">
            {{ appConfig.site.nameZh }}
          </p>
          <h1 class="mt-2 font-display text-4xl leading-tight text-ink md:text-5xl">
            {{ appConfig.site.name }}
          </h1>
          <p class="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            {{ appConfig.site.tagline }}
          </p>
          <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            写前端、做纯浏览器工具，把常用 AI 航路记在同一座岛上。
          </p>
        </div>
        <LayoutIsleMark
          class="hidden md:block"
          :size="120"
        />
      </div>
    </section>

    <section class="mx-auto grid max-w-isle gap-4 px-4 py-10 md:grid-cols-3 md:px-6 md:py-14">
      <NuxtLink
        v-for="channel in channels"
        :key="channel.to"
        :to="channel.to"
        class="rounded-2xl border border-line bg-card p-5 shadow-isle transition-colors hover:border-lagoon"
      >
        <h2 class="text-lg font-medium text-ink">
          {{ channel.title }}
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-muted">
          {{ channel.copy }}
        </p>
      </NuxtLink>
    </section>

    <section class="border-t border-line">
      <div class="mx-auto max-w-isle px-4 py-10 md:px-6 md:py-14">
        <div class="flex items-end justify-between gap-4">
          <h2 class="font-display text-2xl text-ink">
            精选文章
          </h2>
          <NuxtLink
            to="/blog"
            class="text-sm text-lagoon hover:underline"
          >
            全部文章
          </NuxtLink>
        </div>
        <ul
          v-if="posts?.length"
          class="mt-6 grid gap-3"
        >
          <li
            v-for="post in posts"
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
      </div>
    </section>

    <section class="border-t border-line bg-sand/20">
      <div class="mx-auto max-w-isle px-4 py-10 md:px-6 md:py-14">
        <div class="flex items-end justify-between gap-4">
          <h2 class="font-display text-2xl text-ink">
            常用工具
          </h2>
          <NuxtLink
            to="/tools"
            class="text-sm text-lagoon hover:underline"
          >
            全部工具
          </NuxtLink>
        </div>
        <ul class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="tool in toolsOnHome"
            :key="tool.id"
          >
            <NuxtLink
              :to="tool.to"
              class="block rounded-2xl border border-line bg-card p-5 shadow-isle transition-colors hover:border-lagoon"
            >
              <p class="text-xs text-muted">
                {{ categoryLabels[tool.category] }}
              </p>
              <h3 class="mt-1 text-base font-medium text-ink">
                {{ tool.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted">
                {{ tool.description }}
              </p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="border-t border-line">
      <div class="mx-auto max-w-isle px-4 py-10 md:px-6 md:py-14">
        <div class="flex items-end justify-between gap-4">
          <h2 class="font-display text-2xl text-ink">
            AI 入口
          </h2>
          <NuxtLink
            to="/ai"
            class="text-sm text-lagoon hover:underline"
          >
            全部航路
          </NuxtLink>
        </div>
        <ul class="mt-6 grid gap-3 sm:grid-cols-2">
          <li
            v-for="link in aiOnHome"
            :key="link.id"
          >
            <AiLinkCard :link="link" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
