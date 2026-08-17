<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `关于 · ${appConfig.site.name}`,
  description: appConfig.site.description,
})

useHead({
  link: [{ rel: 'canonical', href: `${appConfig.site.url}/about` }],
})

const topics = [
  'Nuxt / Vue 与静态站点',
  '纯前端开发工具',
  'GitHub Pages 上的个人知识库',
]
</script>

<template>
  <LayoutPageHero
    kicker="本岛"
    title="关于 CodeIsle"
    description="代码之屿：独立技术沉淀，有孤岛探索的感觉。知识输出、效率工具、AI 航路图放在同一座岛上。"
  >
    <dl class="mt-8 grid gap-4 text-sm md:grid-cols-2">
      <div class="rounded-2xl border border-line bg-card p-5">
        <dt class="text-muted">技术栈</dt>
        <dd class="mt-1 text-ink">Nuxt 4 · Vue 3 · Tailwind · Less · Pinia · GitHub Pages</dd>
      </div>
      <div class="rounded-2xl border border-line bg-card p-5">
        <dt class="text-muted">约束</dt>
        <dd class="mt-1 text-ink">运行时无 Node 服务。工具纯前端，输入不上传。</dd>
      </div>
      <div class="rounded-2xl border border-line bg-card p-5">
        <dt class="text-muted">在写的主题</dt>
        <dd class="mt-1 text-ink">
          <ul class="list-disc pl-4">
            <li
              v-for="topic in topics"
              :key="topic"
            >
              {{ topic }}
            </li>
          </ul>
        </dd>
      </div>
      <div class="rounded-2xl border border-line bg-card p-5">
        <dt class="text-muted">链接</dt>
        <dd class="mt-2 flex flex-col gap-2 text-ink">
          <a
            :href="appConfig.social.github"
            class="text-lagoon underline-offset-2 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            :href="appConfig.site.sourceUrl"
            class="text-lagoon underline-offset-2 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            本岛源码
          </a>
          <a
            href="/rss.xml"
            class="text-lagoon underline-offset-2 hover:underline"
          >
            RSS
          </a>
        </dd>
      </div>
    </dl>
  </LayoutPageHero>
</template>
