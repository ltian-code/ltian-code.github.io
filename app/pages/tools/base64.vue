<script setup lang="ts">
import { textToBase64, tryDecodeBase64 } from '~/utils/tools/base64'

const text = ref('CodeIsle 代码之屿')
const encodedInput = ref('')
const urlSafe = ref(readPersisted('tools.base64.urlSafe', false))

onMounted(() => {
  urlSafe.value = readPersisted('tools.base64.urlSafe', false)
})

watch(urlSafe, value => writePersisted('tools.base64.urlSafe', value))

const encoded = computed(() => textToBase64(text.value, urlSafe.value))
const decoded = computed(() => tryDecodeBase64(encodedInput.value, urlSafe.value))
</script>

<template>
  <ToolsToolShell tool-id="base64">
    <div class="grid gap-8">
      <label class="inline-flex h-11 items-center gap-2 text-sm">
        <input
          v-model="urlSafe"
          type="checkbox"
          class="h-4 w-4"
        >
        URL-safe（- 和 _，去掉填充）
      </label>

      <section class="grid gap-3">
        <h2 class="text-base font-medium">
          编码
        </h2>
        <label class="grid gap-1.5">
          <span class="text-sm text-muted">文本</span>
          <textarea
            v-model="text"
            rows="5"
            class="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm"
          />
        </label>
        <div>
          <div class="mb-1.5 flex items-center justify-between">
            <p class="text-sm text-muted">
              Base64
            </p>
            <ToolsCopyButton :text="encoded" />
          </div>
          <textarea
            :value="encoded"
            readonly
            rows="4"
            class="w-full break-all rounded-lg border border-line bg-card px-3 py-2 font-mono text-sm"
          />
        </div>
      </section>

      <section class="grid gap-3">
        <h2 class="text-base font-medium">
          解码
        </h2>
        <label class="grid gap-1.5">
          <span class="text-sm text-muted">Base64</span>
          <textarea
            v-model="encodedInput"
            rows="4"
            placeholder="粘贴 Base64，支持 data: 前缀"
            class="w-full rounded-lg border border-line bg-card px-3 py-2 font-mono text-sm"
          />
        </label>
        <p
          v-if="encodedInput && !decoded.ok"
          class="text-sm text-red-700 dark:text-red-300"
        >
          {{ decoded.error }}
        </p>
        <div v-else>
          <div class="mb-1.5 flex items-center justify-between">
            <p class="text-sm text-muted">
              文本
            </p>
            <ToolsCopyButton :text="decoded.ok ? decoded.text : ''" />
          </div>
          <textarea
            :value="decoded.ok ? decoded.text : ''"
            readonly
            rows="5"
            class="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm"
          />
        </div>
      </section>
    </div>
  </ToolsToolShell>
</template>
