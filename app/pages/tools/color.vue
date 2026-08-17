<script setup lang="ts">
import { formatColor, parseColor } from '~/utils/tools/color'

const raw = ref('#2a6f73')

const parsed = computed(() => parseColor(raw.value))
const formats = computed(() => parsed.value ? formatColor(parsed.value) : null)

function onPicker(event: Event) {
  const target = event.target as HTMLInputElement
  raw.value = target.value
}
</script>

<template>
  <ToolsToolShell tool-id="color">
    <div class="grid gap-6">
      <div class="flex flex-wrap items-end gap-4">
        <label class="grid min-w-[12rem] flex-1 gap-1.5">
          <span class="text-sm text-muted">HEX / RGB / HSL</span>
          <input
            v-model="raw"
            type="text"
            spellcheck="false"
            placeholder="#2a6f73 或 rgb(42, 111, 115)"
            class="h-11 rounded-lg border border-line bg-card px-3 font-mono text-sm"
          >
        </label>
        <label class="grid gap-1.5">
          <span class="text-sm text-muted">取色</span>
          <input
            type="color"
            class="h-11 w-16 cursor-pointer rounded-lg border border-line bg-card p-1"
            :value="formats?.hex ?? '#2a6f73'"
            :disabled="!formats"
            @input="onPicker"
          >
        </label>
        <span
          class="h-11 w-11 rounded-lg border border-line"
          :style="{ backgroundColor: formats?.hex ?? 'transparent' }"
          aria-hidden="true"
        />
      </div>

      <p
        v-if="raw.trim() && !formats"
        class="text-sm text-red-700 dark:text-red-300"
      >
        无法解析。试试 #rgb、#rrggbb、rgb() 或 hsl()。
      </p>

      <div
        v-else-if="formats"
        class="grid gap-4"
      >
        <ToolsCopyRow
          label="HEX"
          :value="formats.hex"
        />
        <ToolsCopyRow
          label="RGB"
          :value="formats.rgb"
        />
        <ToolsCopyRow
          label="HSL"
          :value="formats.hsl"
        />
      </div>
    </div>
  </ToolsToolShell>
</template>
