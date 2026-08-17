<script setup lang="ts">
defineProps<{
  tags?: string[]
  to?: string
}>()
</script>

<template>
  <ul
    v-if="tags?.length"
    class="flex flex-wrap gap-1.5"
  >
    <li
      v-for="tag in tags"
      :key="tag"
    >
      <NuxtLink
        v-if="to"
        :to="{ path: to, query: { tag } }"
        class="inline-flex min-h-8 items-center rounded-full bg-sand px-2.5 text-xs text-muted hover:text-lagoon"
      >
        {{ tag }}
      </NuxtLink>
      <span
        v-else
        class="inline-flex min-h-8 items-center rounded-full bg-sand px-2.5 text-xs text-muted"
      >
        {{ tag }}
      </span>
    </li>
  </ul>
</template>
