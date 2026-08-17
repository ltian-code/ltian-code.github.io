<script setup lang="ts">
const theme = useThemeStore()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-11 min-w-11 items-center justify-center rounded-lg border border-line bg-card px-2.5 text-ink transition-colors hover:border-lagoon hover:text-lagoon"
    :title="`主题：${theme.label}（点击切换）`"
    :aria-label="`切换主题，当前：${theme.label}`"
    @click="theme.cycle()"
  >
    <span class="sr-only">{{ theme.label }}</span>
    <svg
      v-if="theme.preference === 'system'"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 20h8" />
    </svg>
    <svg
      v-else-if="theme.preference === 'dark'"
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      aria-hidden="true"
    >
      <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z" />
    </svg>
    <svg
      v-else
      class="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1 6 18M18 6l1.1-1.1" />
    </svg>
  </button>
</template>
