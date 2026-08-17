<script setup lang="ts">
import { encodeUrl, tryDecodeUrl } from '~/utils/tools/url'

const text = ref('https://ltian-code.github.io/tools?q=代码之屿')
const encodedInput = ref('')

const encoded = computed(() => encodeUrl(text.value))
const decoded = computed(() => tryDecodeUrl(encodedInput.value))
</script>

<template>
  <ToolsToolShell tool-id="url">
    <div class="grid gap-8">
      <section class="grid gap-3">
        <h2 class="text-base font-medium">
          编码
        </h2>
        <label class="grid gap-1.5">
          <span class="text-sm text-muted">文本 / 查询串</span>
          <textarea
            v-model="text"
            rows="4"
            class="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm"
          />
        </label>
        <div>
          <div class="mb-1.5 flex items-center justify-between">
            <p class="text-sm text-muted">
              encodeURIComponent
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
          <span class="text-sm text-muted">已编码字符串</span>
          <textarea
            v-model="encodedInput"
            rows="4"
            placeholder="粘贴 %E4%BB%A3%E7%A0%81 这类片段"
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
            rows="4"
            class="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm"
          />
        </div>
      </section>
    </div>
  </ToolsToolShell>
</template>
