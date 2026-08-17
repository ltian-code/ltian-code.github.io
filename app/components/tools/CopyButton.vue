<script setup lang="ts">
const props = defineProps<{
  text: string
}>()

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  const ok = await copyText(props.text)
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
  <button
    type="button"
    class="inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-card px-3 text-sm text-ink hover:border-lagoon hover:text-lagoon disabled:opacity-40"
    :disabled="!text"
    @click="copy"
  >
    {{ copied ? '已复制' : '复制' }}
  </button>
</template>
