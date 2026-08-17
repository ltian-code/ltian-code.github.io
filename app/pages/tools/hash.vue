<script setup lang="ts">
import { HASH_ALGOS, hashTextAll, type HashAlgo } from '~/utils/tools/hash'

const raw = ref('')
const hashes = ref<Partial<Record<HashAlgo, string>>>({})
const pending = ref(false)

let timer: ReturnType<typeof setTimeout> | undefined

async function run() {
  pending.value = true
  try {
    hashes.value = raw.value ? await hashTextAll(raw.value) : {}
  } finally {
    pending.value = false
  }
}

watch(raw, () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    void run()
  }, 120)
})

onMounted(() => {
  void run()
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>

<template>
  <ToolsToolShell tool-id="hash">
    <div class="grid gap-4">
      <label class="grid gap-1.5">
        <span class="text-sm text-muted">文本</span>
        <textarea
          v-model="raw"
          rows="6"
          placeholder="输入要哈希的文本"
          class="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm"
        />
      </label>

      <ClientOnly>
        <div class="grid gap-4">
          <p
            v-if="pending"
            class="text-xs text-muted"
          >
            计算中…
          </p>
          <ToolsCopyRow
            v-for="algo in HASH_ALGOS"
            :key="algo"
            :label="algo"
            :value="hashes[algo] ?? ''"
          />
        </div>
      </ClientOnly>
    </div>
  </ToolsToolShell>
</template>
