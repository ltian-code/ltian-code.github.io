<script setup lang="ts">
import { decodeJwt } from '~/utils/tools/jwt'

const raw = ref('')
const result = computed(() => raw.value.trim() ? decodeJwt(raw.value) : null)

const sections = computed(() => {
  if (!result.value?.ok) {
    return []
  }
  return [
    { title: 'Header', claims: result.value.header },
    { title: 'Payload', claims: result.value.payload },
  ]
})
</script>

<template>
  <ToolsToolShell tool-id="jwt">
    <div class="grid gap-6">
      <p class="rounded-xl border border-line bg-sand/50 px-4 py-3 text-sm text-muted">
        只展开 Base64URL 的 JSON，<strong class="font-medium text-ink">不校验签名</strong>。不要把生产密钥贴到任何网页上。
      </p>

      <label class="grid gap-1.5">
        <span class="text-sm text-muted">JWT</span>
        <textarea
          v-model="raw"
          rows="6"
          spellcheck="false"
          placeholder="header.payload.signature"
          class="w-full rounded-lg border border-line bg-card px-3 py-2 font-mono text-sm"
        />
      </label>

      <p
        v-if="result && !result.ok"
        class="text-sm text-red-700 dark:text-red-300"
      >
        {{ result.error }}
      </p>

      <section
        v-for="section in sections"
        :key="section.title"
        class="grid gap-2"
      >
        <h2 class="text-base font-medium">
          {{ section.title }}
        </h2>
        <div
          v-if="!section.claims.length"
          class="text-sm text-muted"
        >
          空对象
        </div>
        <dl
          v-else
          class="grid gap-2"
        >
          <div
            v-for="claim in section.claims"
            :key="claim.claim"
            class="rounded-lg border border-line bg-card px-3 py-2"
          >
            <dt class="flex items-center justify-between gap-2 font-mono text-sm text-ink">
              {{ claim.claim }}
              <ToolsCopyButton :text="claim.value" />
            </dt>
            <dd class="mt-1 whitespace-pre-wrap break-all font-mono text-sm text-muted">
              {{ claim.value }}
            </dd>
            <dd
              v-if="claim.friendly"
              class="mt-1 text-xs text-lagoon"
            >
              {{ claim.friendly }}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  </ToolsToolShell>
</template>
