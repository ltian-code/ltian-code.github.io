<script setup lang="ts">
import { categoryLabels, filterTools, sortToolsByFavorites, type ToolCategory } from '~/data/tools'

const appConfig = useAppConfig()
const toolbox = useToolboxStore()
const query = ref('')
const category = ref<ToolCategory | 'all'>('all')

const visible = computed(() =>
  sortToolsByFavorites(filterTools(query.value, category.value), toolbox.toolIds),
)
const categories: Array<ToolCategory | 'all'> = ['all', 'convert', 'encode', 'generate']

onMounted(() => toolbox.hydrate())

useSeoMeta({
  title: `工具箱 · ${appConfig.site.name}`,
  description: '纯前端开发小工具，输入不出浏览器。',
})

useHead({
  link: [{ rel: 'canonical', href: `${appConfig.site.url}/tools` }],
})
</script>

<template>
  <LayoutPageHero
    kicker="开发实用小工具"
    title="工具箱"
    description="十个纯前端工具。输入不出浏览器；点星星可把常用的钉在前面。"
  >
    <div class="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
      <label class="sr-only" for="tool-search">搜索工具</label>
      <input
        id="tool-search"
        v-model="query"
        type="search"
        placeholder="搜索名称、标签…"
        class="h-11 rounded-lg border border-line bg-card px-3 text-sm"
      >
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in categories"
          :key="item"
          type="button"
          class="inline-flex h-11 items-center rounded-lg border px-3 text-sm"
          :class="category === item
            ? 'border-lagoon bg-sand text-lagoon'
            : 'border-line bg-card text-ink'"
          @click="category = item"
        >
          {{ item === 'all' ? '全部' : categoryLabels[item] }}
        </button>
      </div>
    </div>

    <ul
      v-if="visible.length"
      class="mt-8 grid gap-3 sm:grid-cols-2"
    >
      <li
        v-for="tool in visible"
        :key="tool.id"
      >
        <NuxtLink
          :to="tool.to"
          class="block rounded-2xl border border-line bg-card p-5 shadow-isle transition-colors hover:border-lagoon"
        >
          <div class="flex items-start justify-between gap-3">
            <h2 class="text-base font-medium text-ink">
              {{ tool.title }}
            </h2>
            <div class="flex shrink-0 items-center gap-1">
              <span class="rounded-full bg-sand px-2 py-0.5 text-xs text-muted">
                {{ categoryLabels[tool.category] }}
              </span>
              <LayoutFavButton
                :active="toolbox.isToolFav(tool.id)"
                :label="tool.title"
                @toggle="toolbox.toggleTool(tool.id)"
              />
            </div>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-muted">
            {{ tool.description }}
          </p>
        </NuxtLink>
      </li>
    </ul>

    <p
      v-else
      class="mt-8 rounded-2xl border border-dashed border-line bg-card p-6 text-sm text-muted"
    >
      没有匹配的工具。
    </p>
  </LayoutPageHero>
</template>
