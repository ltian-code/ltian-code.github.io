<script setup lang="ts">
import {
  PASSWORD_MAX,
  PASSWORD_MIN,
  clampPasswordLength,
  generatePassword,
} from '~/utils/tools/password'

const length = ref(readPersisted('tools.password.length', 16))
const upper = ref(readPersisted('tools.password.upper', true))
const lower = ref(readPersisted('tools.password.lower', true))
const numbers = ref(readPersisted('tools.password.numbers', true))
const symbols = ref(readPersisted('tools.password.symbols', false))
const excludeAmbiguous = ref(readPersisted('tools.password.excludeAmbiguous', true))
const password = ref('')
const error = ref('')

function options() {
  return {
    length: length.value,
    upper: upper.value,
    lower: lower.value,
    numbers: numbers.value,
    symbols: symbols.value,
    excludeAmbiguous: excludeAmbiguous.value,
  }
}

function refresh() {
  try {
    password.value = generatePassword(options())
    error.value = ''
  } catch (err) {
    password.value = ''
    error.value = err instanceof Error ? err.message : '无法生成'
  }
}

function persist() {
  writePersisted('tools.password.length', clampPasswordLength(length.value))
  writePersisted('tools.password.upper', upper.value)
  writePersisted('tools.password.lower', lower.value)
  writePersisted('tools.password.numbers', numbers.value)
  writePersisted('tools.password.symbols', symbols.value)
  writePersisted('tools.password.excludeAmbiguous', excludeAmbiguous.value)
}

onMounted(() => {
  length.value = clampPasswordLength(readPersisted('tools.password.length', 16))
  upper.value = readPersisted('tools.password.upper', true)
  lower.value = readPersisted('tools.password.lower', true)
  numbers.value = readPersisted('tools.password.numbers', true)
  symbols.value = readPersisted('tools.password.symbols', false)
  excludeAmbiguous.value = readPersisted('tools.password.excludeAmbiguous', true)
  refresh()
})

watch([length, upper, lower, numbers, symbols, excludeAmbiguous], () => {
  const next = clampPasswordLength(length.value)
  if (next !== length.value) {
    length.value = next
    return
  }
  persist()
  refresh()
})
</script>

<template>
  <ToolsToolShell tool-id="password">
    <div class="grid gap-4">
      <label class="grid gap-1.5 sm:max-w-xs">
        <span class="text-sm text-muted">长度（{{ PASSWORD_MIN }}–{{ PASSWORD_MAX }}）</span>
        <input
          v-model.number="length"
          type="number"
          :min="PASSWORD_MIN"
          :max="PASSWORD_MAX"
          class="h-11 rounded-lg border border-line bg-card px-3 text-sm"
        >
      </label>

      <div class="flex flex-wrap gap-4">
        <label class="inline-flex h-11 items-center gap-2 text-sm">
          <input
            v-model="upper"
            type="checkbox"
            class="h-4 w-4"
          >
          大写
        </label>
        <label class="inline-flex h-11 items-center gap-2 text-sm">
          <input
            v-model="lower"
            type="checkbox"
            class="h-4 w-4"
          >
          小写
        </label>
        <label class="inline-flex h-11 items-center gap-2 text-sm">
          <input
            v-model="numbers"
            type="checkbox"
            class="h-4 w-4"
          >
          数字
        </label>
        <label class="inline-flex h-11 items-center gap-2 text-sm">
          <input
            v-model="symbols"
            type="checkbox"
            class="h-4 w-4"
          >
          符号
        </label>
        <label class="inline-flex h-11 items-center gap-2 text-sm">
          <input
            v-model="excludeAmbiguous"
            type="checkbox"
            class="h-4 w-4"
          >
          排除 0/O/1/I/l
        </label>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="inline-flex h-11 items-center rounded-lg border border-line bg-card px-4 text-sm hover:border-lagoon"
          @click="refresh"
        >
          重新生成
        </button>
        <ToolsCopyButton :text="password" />
      </div>

      <p
        v-if="error"
        class="text-sm text-red-700 dark:text-red-300"
      >
        {{ error }}
      </p>

      <ClientOnly>
        <input
          :value="password"
          readonly
          class="h-11 w-full rounded-lg border border-line bg-card px-3 font-mono text-sm"
        >
        <template #fallback>
          <p class="text-sm text-muted">
            正在生成密码…
          </p>
        </template>
      </ClientOnly>
    </div>
  </ToolsToolShell>
</template>
