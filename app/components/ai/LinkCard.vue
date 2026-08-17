<script setup lang="ts">
import { aiCategoryLabels, aiRegionLabels, type AiLink } from '~/data/ai-links'

defineProps<{
  link: AiLink
}>()

const toolbox = useToolboxStore()

onMounted(() => toolbox.hydrate())
</script>

<template>
  <a
    :href="link.url"
    class="block rounded-2xl border border-line bg-card p-5 shadow-isle transition-colors hover:border-lagoon"
    rel="noopener noreferrer"
    target="_blank"
  >
    <div class="flex items-start justify-between gap-3">
      <h3 class="text-base font-medium text-ink">
        {{ link.name }}
      </h3>
      <LayoutFavButton
        :active="toolbox.isAiFav(link.id)"
        :label="link.name"
        @toggle="toolbox.toggleAi(link.id)"
      />
    </div>
    <p class="mt-2 text-sm leading-relaxed text-muted">
      {{ link.blurb }}
    </p>
    <p class="mt-3 flex flex-wrap gap-2 text-xs text-muted">
      <span class="rounded-full bg-sand px-2 py-0.5">
        {{ aiCategoryLabels[link.category] }}
      </span>
      <span class="rounded-full bg-sand px-2 py-0.5">
        {{ aiRegionLabels[link.region] }}
      </span>
      <span
        v-if="link.needLogin"
        class="rounded-full bg-sand px-2 py-0.5"
      >
        需登录
      </span>
    </p>
  </a>
</template>
