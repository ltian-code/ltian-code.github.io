<script setup lang="ts">
import { TIMEZONES, dateFromLocalInput, formatTimestamp, parseTimestampInput, toDatetimeLocalValue } from '~/utils/tools/unix-timestamp'

const raw = ref('')
const timeZone = ref<'local' | string>('local')
const nowTick = ref(0)
const ready = ref(false)
let timer = 0

onMounted(() => {
  timeZone.value = readPersisted('tools.timestamp.tz', 'local')
  ready.value = true
  nowTick.value = Date.now()
  timer = window.setInterval(() => {
    nowTick.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  window.clearInterval(timer)
})

watch(timeZone, value => writePersisted('tools.timestamp.tz', value))

const parsed = computed(() => {
  void nowTick.value
  if (!raw.value.trim()) {
    return { date: new Date(ready.value ? nowTick.value : 0), fromNow: true as const }
  }
  const result = parseTimestampInput(raw.value)
  return result ? { date: result.date, fromNow: false as const, kind: result.kind } : null
})

const outputs = computed(() => {
  if (!parsed.value) {
    return null
  }
  return formatTimestamp(parsed.value.date, timeZone.value)
})

const localValue = computed({
  get: () => parsed.value ? toDatetimeLocalValue(parsed.value.date) : '',
  set: (value: string) => {
    const date = dateFromLocalInput(value)
    if (date) {
      raw.value = String(date.getTime())
    }
  },
})

function useNow() {
  raw.value = ''
}
</script>

<template>
  <ToolsToolShell tool-id="unix-timestamp">
    <div class="grid gap-4">
      <label class="grid gap-1.5">
        <span class="text-sm text-muted">输入（Unix 秒 / 毫秒 / ISO）</span>
        <div class="flex flex-col gap-2 sm:flex-row">
          <input
            v-model="raw"
            type="text"
            inputmode="text"
            placeholder="留空则显示当前时间"
            class="h-11 min-w-0 flex-1 rounded-lg border border-line bg-card px-3 text-sm"
          >
          <button
            type="button"
            class="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-card px-4 text-sm hover:border-lagoon"
            @click="useNow"
          >
            现在
          </button>
        </div>
      </label>

      <label class="grid gap-1.5">
        <span class="text-sm text-muted">本机日期时间</span>
        <input
          v-if="ready"
          v-model="localValue"
          type="datetime-local"
          step="1"
          class="h-11 rounded-lg border border-line bg-card px-3 text-sm"
        >
        <input
          v-else
          type="datetime-local"
          disabled
          class="h-11 rounded-lg border border-line bg-card px-3 text-sm"
        >
      </label>

      <label class="grid gap-1.5">
        <span class="text-sm text-muted">时区（影响「时区时间」一行）</span>
        <select
          v-model="timeZone"
          class="h-11 rounded-lg border border-line bg-card px-3 text-sm"
        >
          <option
            v-for="zone in TIMEZONES"
            :key="zone.id"
            :value="zone.id"
          >
            {{ zone.label }}
          </option>
        </select>
      </label>

      <ClientOnly>
        <p
          v-if="!parsed"
          class="text-sm text-red-700 dark:text-red-300"
        >
          无法解析这段输入。试试 10 位秒、13 位毫秒，或 ISO 字符串。
        </p>

        <div
          v-else-if="ready && outputs"
          class="grid gap-3"
        >
          <p
            v-if="parsed.fromNow"
            class="text-xs text-muted"
          >
            当前时间，每秒更新。输入任意值后停止跟随。
          </p>
          <ToolsCopyRow
            label="Unix 秒"
            :value="outputs.seconds"
          />
          <ToolsCopyRow
            label="Unix 毫秒"
            :value="outputs.milliseconds"
          />
          <ToolsCopyRow
            label="ISO 8601（UTC）"
            :value="outputs.iso"
          />
          <ToolsCopyRow
            label="UTC"
            :value="outputs.utc"
          />
          <ToolsCopyRow
            label="时区时间"
            :value="outputs.zoned"
          />
        </div>
        <template #fallback>
          <p class="text-sm text-muted">
            正在读取当前时间…
          </p>
        </template>
      </ClientOnly>
    </div>
  </ToolsToolShell>
</template>
