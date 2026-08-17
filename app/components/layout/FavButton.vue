<script setup lang="ts">
defineProps<{
  active: boolean
  label: string
}>()

const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base leading-none hover:bg-sand"
    :class="active ? 'text-lagoon' : 'text-muted'"
    :aria-pressed="active"
    :aria-label="active ? `取消收藏 ${label}` : `收藏 ${label}`"
    @click.stop.prevent="emit('toggle')"
  >
    {{ active ? '★' : '☆' }}
  </button>
</template>
