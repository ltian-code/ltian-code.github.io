<script setup lang="ts">
import { categoryLabels, getTool } from '~/data/tools'

const props = defineProps<{
  toolId: string
}>()

const appConfig = useAppConfig()
const tool = computed(() => getTool(props.toolId))

if (!tool.value) {
  throw createError({ statusCode: 404, statusMessage: '工具不存在', fatal: true })
}

useSeoMeta({
  title: `${tool.value.title} · ${appConfig.site.name}`,
  description: tool.value.description,
})

useHead({
  link: [{ rel: 'canonical', href: `${appConfig.site.url}${tool.value.to}` }],
})
</script>

<template>
  <div
    v-if="tool"
    class="mx-auto max-w-isle px-4 py-10 md:px-6 md:py-14"
  >
    <p class="text-sm text-muted">
      <NuxtLink
        to="/tools"
        class="text-lagoon hover:underline"
      >
        工具箱
      </NuxtLink>
      <span aria-hidden="true"> · </span>
      {{ categoryLabels[tool.category] }}
    </p>
    <h1 class="mt-3 font-display text-3xl text-ink md:text-4xl">
      {{ tool.title }}
    </h1>
    <p class="mt-3 max-w-2xl text-base text-muted">
      {{ tool.description }}
    </p>
    <p class="mt-4 rounded-xl border border-line bg-sand/50 px-4 py-3 text-sm text-muted">
      输入只在你的浏览器里处理，不会上传到本站。
    </p>
    <div class="mt-8">
      <slot />
    </div>
  </div>
</template>
