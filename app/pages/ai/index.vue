<script setup lang="ts">
import {
  aiCategoryLabels,
  aiRegionLabels,
  filterAiLinks,
  type AiCategory,
  type AiRegion,
} from '~/data/ai-links'

const appConfig = useAppConfig()
const toolbox = useToolboxStore()
const query = ref('')
const category = ref<AiCategory | 'all'>('all')
const region = ref<AiRegion | 'all'>('all')

const categories: Array<AiCategory | 'all'> = ['all', 'chat', 'agent', 'image', 'search', 'voice']
const regions: Array<AiRegion | 'all'> = ['all', 'cn', 'global']

const filtered = computed(() => filterAiLinks(query.value, category.value, region.value))

const pinned = computed(() => {
  const fav = toolbox.aiIds
  return filtered.value.filter(link => fav.includes(link.id))
})

const rest = computed(() => {
  const fav = toolbox.aiIds
  return filtered.value.filter(link => !fav.includes(link.id))
})

onMounted(() => toolbox.hydrate())

useSeoMeta({
  title: `AI 导航 · ${appConfig.site.name}`,
  description: '分类好的 AI 工具航路图：对话、编程 Agent、绘图、搜索、语音。只收录官方站点。',
})

useHead({
  link: [{ rel: 'canonical', href: `${appConfig.site.url}/ai` }],
})
</script>

<template>
  <LayoutPageHero
    kicker="航路图"
    title="AI 导航"
    description="按场景分类的官方入口，不是再造聊天窗口。只收录官网，不提供镜像或破解。海外产品能否打开取决于你的网络。"
  >
    <div class="mt-6 grid gap-3">
      <label class="sr-only" for="ai-search">搜索 AI 工具</label>
      <input
        id="ai-search"
        v-model="query"
        type="search"
        placeholder="搜索名称、场景、标签…"
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
          {{ item === 'all' ? '全部场景' : aiCategoryLabels[item] }}
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in regions"
          :key="item"
          type="button"
          class="inline-flex h-11 items-center rounded-lg border px-3 text-sm"
          :class="region === item
            ? 'border-lagoon bg-sand text-lagoon'
            : 'border-line bg-card text-ink'"
          @click="region = item"
        >
          {{ item === 'all' ? '全部地区' : aiRegionLabels[item] }}
        </button>
      </div>
    </div>

    <section
      v-if="pinned.length"
      class="mt-8"
    >
      <h2 class="text-sm font-medium text-muted">
        我常用
      </h2>
      <ul class="mt-3 grid gap-3 sm:grid-cols-2">
        <li
          v-for="link in pinned"
          :key="`pin-${link.id}`"
        >
          <AiLinkCard :link="link" />
        </li>
      </ul>
    </section>

    <ul
      v-if="rest.length"
      class="mt-8 grid gap-3 sm:grid-cols-2"
    >
      <li
        v-for="link in rest"
        :key="link.id"
      >
        <AiLinkCard :link="link" />
      </li>
    </ul>

    <p
      v-if="!filtered.length"
      class="mt-8 rounded-2xl border border-dashed border-line bg-card p-6 text-sm text-muted"
    >
      没有匹配的条目。
    </p>
  </LayoutPageHero>
</template>
