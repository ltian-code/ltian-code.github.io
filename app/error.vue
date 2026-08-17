<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const appConfig = useAppConfig()
const is404 = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: is404.value
    ? `未找到 · ${appConfig.site.name}`
    : `出错了 · ${appConfig.site.name}`,
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-paper text-ink">
    <div class="mx-auto flex max-w-isle flex-1 flex-col justify-center px-4 py-16 md:px-6">
      <p class="text-sm font-medium text-lagoon">
        {{ error.statusCode }}
      </p>
      <h1 class="mt-2 font-display text-3xl md:text-4xl">
        {{ is404 ? '这片礁石上没有路' : '潮水打乱了航线' }}
      </h1>
      <p class="mt-3 max-w-md text-muted">
        {{ error.statusMessage || (is404 ? '页面不存在，或还没填上海图。' : '出了点问题，先回到岛上。') }}
      </p>
      <button
        type="button"
        class="mt-8 inline-flex h-11 w-fit items-center rounded-lg bg-lagoon px-4 text-white hover:bg-lagoon-hover"
        @click="goHome"
      >
        回到首页
      </button>
    </div>
  </div>
</template>
