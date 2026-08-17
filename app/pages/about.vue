<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `关于 · ${appConfig.site.name}`,
  description: appConfig.site.description,
})
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
    </dl>
    <p class="mt-6 text-sm text-muted">
      源码：
      <a
        :href="appConfig.site.sourceUrl"
        class="text-lagoon underline-offset-2 hover:underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        {{ appConfig.site.sourceUrl }}
      </a>
    </p>
  </LayoutPageHero>
</template>
