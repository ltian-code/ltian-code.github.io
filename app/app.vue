<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  ogSiteName: appConfig.site.name,
  twitterCard: 'summary_large_image',
})

useIsleOg({
  title: appConfig.site.name,
  description: appConfig.site.tagline,
  kicker: appConfig.site.nameZh,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
