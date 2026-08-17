<script setup lang="ts">
defineProps<{
  path: string
  title: string
  description?: string
  date: string
  tags?: string[]
}>()
</script>

<template>
  <article class="rounded-2xl border border-line bg-card p-5 shadow-isle transition-colors hover:border-lagoon">
    <p class="text-xs text-muted">
      <time :datetime="date">{{ formatPostDate(date) }}</time>
    </p>
    <h2 class="mt-2 text-lg font-medium">
      <NuxtLink
        :to="path"
        class="text-ink hover:text-lagoon"
      >
        {{ title }}
      </NuxtLink>
    </h2>
    <p
      v-if="description"
      class="mt-2 text-sm leading-relaxed text-muted"
    >
      {{ description }}
    </p>
    <BlogPostTags
      class="mt-3"
      :tags="tags"
      to="/blog"
    />
  </article>
</template>
