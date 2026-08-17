<script setup lang="ts">
const appConfig = useAppConfig()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-auto border-t border-line bg-sand/40">
    <div class="mx-auto flex max-w-isle flex-col gap-3 px-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-6">
      <p>
        © {{ year }} {{ appConfig.site.name }} · {{ appConfig.site.nameZh }}
      </p>
      <p class="flex flex-wrap gap-x-4 gap-y-1">
        <a
          :href="appConfig.site.sourceUrl"
          class="text-lagoon underline-offset-2 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          源码
        </a>
        <a
          href="/rss.xml"
          class="text-lagoon underline-offset-2 hover:underline"
        >
          RSS
        </a>
        <span>内容与代码以仓库许可证为准</span>
      </p>
    </div>
  </footer>
</template>
