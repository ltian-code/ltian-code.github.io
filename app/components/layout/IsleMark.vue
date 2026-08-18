<script setup lang="ts">
withDefaults(defineProps<{
  size?: number
}>(), {
  size: 32,
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class="shrink-0"
  >
    <rect
      width="32"
      height="32"
      rx="16"
      class="fill-lagoon"
    />
    <path
      d="M6 22c2.2-1.4 4.4-2.1 6.6-2.1 3.4 0 4.6 1.8 7.2 1.8 2.1 0 4-0.7 6.2-2.1"
      fill="none"
      class="stroke-paper"
      stroke-width="1.6"
      stroke-linecap="round"
    />
    <path
      d="M16 8c2.8 0 5 2.6 5 6.2 0 4.4-5 8.8-5 8.8S11 18.6 11 14.2C11 10.6 13.2 8 16 8z"
      class="fill-paper"
    />
  </svg>
</template>
