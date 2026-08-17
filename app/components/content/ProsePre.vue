<script setup lang="ts">
const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>()

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

const label = computed(() => props.filename || props.language || 'code')

async function copy() {
  const ok = await copyText(props.code ?? '')
  if (!ok) {
    return
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    copied.value = false
  }, 1600)
}

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div class="isle-code group relative my-5 overflow-hidden rounded-xl border border-line bg-card">
    <div class="flex min-h-10 items-center justify-between gap-2 border-b border-line bg-sand/60 px-3 text-xs text-muted">
      <span class="truncate">{{ label }}</span>
      <button
        type="button"
        class="inline-flex h-8 shrink-0 items-center rounded-md px-2 text-ink hover:text-lagoon"
        @click="copy"
      >
        {{ copied ? '已复制' : '复制' }}
      </button>
    </div>
    <pre
      :class="props.class"
      class="overflow-x-auto p-4 text-[13px] leading-6"
    ><slot /></pre>
  </div>
</template>
