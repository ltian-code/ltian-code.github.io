<script setup lang="ts">
import type { TocLink } from '@nuxt/content'

defineProps<{
  links: TocLink[]
}>()
</script>

<template>
  <nav aria-label="文章目录">
    <p class="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
      目录
    </p>
    <ol class="space-y-1.5 text-sm">
      <li
        v-for="link in links"
        :key="link.id"
      >
        <a
          :href="`#${link.id}`"
          class="text-muted hover:text-lagoon"
        >
          {{ link.text }}
        </a>
        <ol
          v-if="link.children?.length"
          class="mt-1 space-y-1 border-l border-line pl-3"
        >
          <li
            v-for="child in link.children"
            :key="child.id"
          >
            <a
              :href="`#${child.id}`"
              class="text-muted hover:text-lagoon"
            >
              {{ child.text }}
            </a>
          </li>
        </ol>
      </li>
    </ol>
  </nav>
</template>
