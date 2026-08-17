<script setup lang="ts">
import { REGEX_CHEATSHEET, splitHighlights, testRegex } from '~/utils/tools/regex'

const pattern = ref('\\bCodeIsle\\b')
const text = ref('欢迎来到 CodeIsle（代码之屿）。CodeIsle 上的工具都在浏览器里跑。')
const flagKeys = ['i', 'm', 's', 'u'] as const
const flags = reactive({
  i: true,
  m: false,
  s: false,
  u: false,
})

const flagString = computed(() =>
  flagKeys.filter(flag => flags[flag]).join(''),
)

const result = computed(() => testRegex(pattern.value, flagString.value, text.value))
const highlights = computed(() =>
  result.value.ok ? splitHighlights(text.value, result.value.matches) : [{ text: text.value, hit: false }],
)
</script>

<template>
  <ToolsToolShell tool-id="regex">
    <div class="grid gap-6">
      <div class="grid gap-4 md:grid-cols-[1fr_auto]">
        <label class="grid gap-1.5">
          <span class="text-sm text-muted">正则</span>
          <input
            v-model="pattern"
            type="text"
            spellcheck="false"
            class="h-11 rounded-lg border border-line bg-card px-3 font-mono text-sm"
          >
        </label>
        <fieldset class="flex flex-wrap items-end gap-3">
          <legend class="sr-only">
            标志
          </legend>
          <label
            v-for="flag in flagKeys"
            :key="flag"
            class="inline-flex h-11 items-center gap-2 text-sm"
          >
            <input
              v-model="flags[flag]"
              type="checkbox"
              class="h-4 w-4"
            >
            {{ flag }}
          </label>
        </fieldset>
      </div>

      <p
        v-if="!result.ok"
        class="text-sm text-red-700 dark:text-red-300"
      >
        {{ result.error }}
      </p>
      <p
        v-else
        class="text-sm text-muted"
      >
        {{ result.matches.length }} 处匹配（最多列出 200 条）
      </p>

      <label class="grid gap-1.5">
        <span class="text-sm text-muted">测试文本</span>
        <textarea
          v-model="text"
          rows="6"
          class="w-full rounded-lg border border-line bg-card px-3 py-2 text-sm"
        />
      </label>

      <div>
        <p class="mb-1.5 text-sm text-muted">
          高亮
        </p>
        <pre class="min-h-[6rem] whitespace-pre-wrap break-words rounded-lg border border-line bg-card px-3 py-2 text-sm leading-relaxed"><template
          v-for="(part, index) in highlights"
          :key="index"
        ><mark
          v-if="part.hit"
          class="rounded-sm bg-sand px-0.5 text-ink"
        >{{ part.text }}</mark><template v-else>{{ part.text }}</template></template></pre>
      </div>

      <ul
        v-if="result.ok && result.matches.length"
        class="grid gap-2"
      >
        <li
          v-for="(match, index) in result.matches"
          :key="`${match.index}-${index}`"
          class="rounded-lg border border-line bg-card px-3 py-2 font-mono text-sm"
        >
          <span class="text-muted">[{{ match.index }}]</span>
          {{ match.value }}
          <span
            v-if="match.groups.length"
            class="mt-1 block text-xs text-muted"
          >
            组：{{ match.groups.join(' · ') }}
          </span>
        </li>
      </ul>

      <section>
        <h2 class="text-sm font-medium text-ink">
          常用记号
        </h2>
        <dl class="mt-3 grid gap-2 sm:grid-cols-2">
          <div
            v-for="item in REGEX_CHEATSHEET"
            :key="item.token"
            class="rounded-lg border border-line bg-card px-3 py-2 text-sm"
          >
            <dt class="font-mono text-ink">
              {{ item.token }}
            </dt>
            <dd class="mt-1 text-muted">
              {{ item.meaning }}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  </ToolsToolShell>
</template>
