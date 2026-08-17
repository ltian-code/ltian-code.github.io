<script setup lang="ts">
defineProps<{
  label: string
  value: string
}>()
</script>

<template>
  <div>
    <div class="mb-1.5 flex items-center justify-between gap-2">
      <p class="text-sm text-muted">
        {{ label }}
      </p>
      <ToolsCopyButton :text="value" />
    </div>
    <input
      :value="value"
      readonly
      class="h-11 w-full rounded-lg border border-line bg-card px-3 font-mono text-sm text-ink"
    >
  </div>
</template>
