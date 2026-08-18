<script setup lang="ts">
const appConfig = useAppConfig()
const route = useRoute()
const menuOpen = ref(false)

watch(() => route.fullPath, () => {
  menuOpen.value = false
})

function isActive(to: string, exact: boolean) {
  if (exact || to === '/') {
    return route.path === to
  }
  return route.path === to || route.path.startsWith(`${to}/`)
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <header class="site-header sticky top-0 z-40 border-b border-line">
    <div class="mx-auto flex h-14 max-w-isle items-center justify-between gap-3 px-4 md:h-16 md:px-6">
      <NuxtLink
        to="/"
        class="flex min-h-11 items-center gap-2 rounded-md text-ink no-underline"
      >
        <LayoutIsleMark :size="32" />
        <span class="flex flex-col leading-tight">
          <span class="font-display text-base tracking-wide">{{ appConfig.site.name }}</span>
          <span class="text-[11px] text-muted">{{ appConfig.site.nameZh }}</span>
        </span>
      </NuxtLink>

      <nav
        class="hidden items-center gap-1 md:flex"
        aria-label="主导航"
      >
        <NuxtLink
          v-for="item in appConfig.nav"
          :key="item.to"
          :to="item.to"
          class="inline-flex h-11 items-center rounded-lg px-3 text-sm transition-colors"
          :class="isActive(item.to, item.exact)
            ? 'bg-sand text-lagoon'
            : 'text-ink hover:bg-sand/70'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <LayoutThemeToggle />
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-card md:hidden"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="menuOpen ? '关闭菜单' : '打开菜单'"
          @click="toggleMenu"
        >
          <svg
            v-if="!menuOpen"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-show="menuOpen"
      id="mobile-nav"
      class="border-t border-line bg-paper px-4 py-3 md:hidden"
    >
      <nav class="flex flex-col gap-1" aria-label="移动导航">
        <NuxtLink
          v-for="item in appConfig.nav"
          :key="item.to"
          :to="item.to"
          class="flex min-h-11 items-center rounded-lg px-3 text-base"
          :class="isActive(item.to, item.exact)
            ? 'bg-sand text-lagoon'
            : 'text-ink'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
