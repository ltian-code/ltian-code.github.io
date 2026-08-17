<script setup lang="ts">
defineProps<{
  kicker?: string
  title: string
  description: string
}>()
</script>

<template>
  <section class="mx-auto max-w-isle px-4 py-10 md:px-6 md:py-14">
    <p
      v-if="kicker"
      class="mb-2 text-sm font-medium tracking-wide text-lagoon"
    >
      {{ kicker }}
    </p>
    <h1 class="font-display text-3xl text-ink md:text-4xl">
      {{ title }}
    </h1>
    <p class="mt-3 max-w-2xl text-base leading-relaxed text-muted">
      {{ description }}
    </p>
    <slot />
  </section>
</template>
