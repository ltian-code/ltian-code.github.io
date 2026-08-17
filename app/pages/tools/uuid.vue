<script setup lang="ts">
import { UUID_MAX, UUID_MIN, clampUuidCount, generateUuidV4Batch } from '~/utils/tools/uuid'

const count = ref(readPersisted('tools.uuid.count', 1))
const uuids = ref<string[]>([])

function refresh() {
  uuids.value = generateUuidV4Batch(count.value)
}

onMounted(() => {
  count.value = clampUuidCount(readPersisted('tools.uuid.count', 1))
  refresh()
})

watch(count, (value) => {
  const next = clampUuidCount(value)
  if (next !== value) {
    count.value = next
    return
  }
  writePersisted('tools.uuid.count', next)
  refresh()
})

const joined = computed(() => uuids.value.join('\n'))
</script>

<template>
  <ToolsToolShell tool-id="uuid">
    <div class="grid gap-4">
      <label class="grid gap-1.5 sm:max-w-xs">
        <span class="text-sm text-muted">数量（{{ UUID_MIN }}–{{ UUID_MAX }}）</span>
        <input
          v-model.number="count"
          type="number"
          :min="UUID_MIN"
          :max="UUID_MAX"
          class="h-11 rounded-lg border border-line bg-card px-3 text-sm"
        >
      </label>

      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="inline-flex h-11 items-center rounded-lg border border-line bg-card px-4 text-sm hover:border-lagoon"
          @click="refresh"
        >
          重新生成
        </button>
        <ToolsCopyButton :text="joined" />
      </div>

      <ClientOnly>
        <textarea
          :value="joined"
          readonly
          rows="8"
          class="w-full rounded-lg border border-line bg-card px-3 py-2 font-mono text-sm"
        />
        <template #fallback>
          <p class="text-sm text-muted">
            正在生成 UUID…
          </p>
        </template>
      </ClientOnly>
    </div>
  </ToolsToolShell>
</template>
