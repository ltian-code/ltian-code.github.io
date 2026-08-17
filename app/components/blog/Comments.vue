<script setup lang="ts">
const appConfig = useAppConfig()
const colorMode = useColorMode()
const host = ref<HTMLElement | null>(null)
const status = ref<'idle' | 'loading' | 'error'>('idle')

const enabled = computed(() =>
  Boolean(appConfig.giscus.repoId && appConfig.giscus.categoryId),
)

const theme = computed(() => (colorMode.value === 'dark' ? 'dark' : 'light'))

function mount() {
  if (!import.meta.client || !host.value || !enabled.value || status.value !== 'idle') {
    return
  }

  status.value = 'loading'
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', appConfig.giscus.repo)
  script.setAttribute('data-repo-id', appConfig.giscus.repoId)
  script.setAttribute('data-category', appConfig.giscus.category)
  script.setAttribute('data-category-id', appConfig.giscus.categoryId)
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '1')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', theme.value)
  script.setAttribute('data-lang', 'zh-CN')
  script.onerror = () => {
    status.value = 'error'
  }
  host.value.appendChild(script)
}

function syncTheme() {
  const iframe = host.value?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: theme.value } } },
    'https://giscus.app',
  )
}

onMounted(() => {
  mount()
})

watch(host, (el) => {
  if (el) {
    mount()
  }
})

watch(theme, () => {
  syncTheme()
})
</script>

<template>
  <section
    v-if="enabled"
    class="mt-12 border-t border-line pt-8"
  >
    <h2 class="text-base font-medium text-ink">
      评论
    </h2>
    <p class="mt-1 text-sm text-muted">
      用 GitHub Discussions，不经过本站服务器。
    </p>
    <p
      v-if="status === 'error'"
      class="mt-4 text-sm text-muted"
    >
      评论组件加载失败。请确认能打开
      <a
        href="https://giscus.app"
        class="text-lagoon underline-offset-2 hover:underline"
        rel="noopener noreferrer"
        target="_blank"
      >giscus.app</a>
      后再刷新。
    </p>
    <div
      ref="host"
      class="mt-4 min-h-24"
    />
  </section>
</template>
