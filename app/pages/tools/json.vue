<script setup lang="ts">
import { formatJson } from '~/utils/tools/json'

const raw = ref('{\n  "isle": "CodeIsle",\n  "ok": true\n}')
const indent = ref(readPersisted<2 | 4>('tools.json.indent', 2))
const sortKeys = ref(readPersisted('tools.json.sort', false))

onMounted(() => {
  indent.value = readPersisted('tools.json.indent', 2)
  sortKeys.value = readPersisted('tools.json.sort', false)
})

watch(indent, value => writePersisted('tools.json.indent', value))
watch(sortKeys, value => writePersisted('tools.json.sort', value))

const result = computed(() => formatJson(raw.value, {
  indent: indent.value,
  sort: sortKeys.value,
}))
</script>

<template>
  <ToolsToolShell tool-id="json">
    <div class="grid gap-4">
      <label class="grid gap-1.5">
        <span class="text-sm text-muted">JSON</span>
        <textarea
          v-model="raw"
          rows="10"
          spellcheck="false"
          class="w-full rounded-lg border border-line bg-card px-3 py-2 font-mono text-sm"
        />
      </label>

      <div class="flex flex-wrap gap-3">
        <label class="inline-flex h-11 items-center gap-2 text-sm">
          缩进
          <select
            v-model.number="indent"
            class="h-11 rounded-lg border border-line bg-card px-3"
          >
            <option :value="2">
              2
            </option>
            <option :value="4">
              4
            </option>
          </select>
        </label>
        <label class="inline-flex h-11 items-center gap-2 text-sm">
          <input
            v-model="sortKeys"
            type="checkbox"
            class="h-4 w-4"
          >
          按键名排序
        </label>
      </div>

      <p
        v-if="!result.ok"
        class="text-sm text-red-700 dark:text-red-300"
      >
        {{ result.error.message }}
        <span v-if="result.error.line">
          （第 {{ result.error.line }} 行，第 {{ result.error.column }} 列）
        </span>
      </p>

      <template v-else>
        <div>
          <div class="mb-1.5 flex items-center justify-between">
            <p class="text-sm text-muted">
              格式化
            </p>
            <ToolsCopyButton :text="result.pretty" />
          </div>
          <textarea
            :value="result.pretty"
            readonly
            rows="10"
            class="w-full rounded-lg border border-line bg-card px-3 py-2 font-mono text-sm"
          />
        </div>
        <div>
          <div class="mb-1.5 flex items-center justify-between">
            <p class="text-sm text-muted">
              压缩
            </p>
            <ToolsCopyButton :text="result.minified" />
          </div>
          <textarea
            :value="result.minified"
            readonly
            rows="4"
            class="w-full rounded-lg border border-line bg-card px-3 py-2 font-mono text-sm"
          />
        </div>
      </template>
    </div>
  </ToolsToolShell>
</template>
