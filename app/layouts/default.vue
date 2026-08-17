<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'zh-CN' },
})
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-paper text-ink">
    <LayoutSkipLink />
    <LayoutSiteHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>
