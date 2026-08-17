// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
  ],
  css: [
    '~/assets/styles/variables.less',
    '~/assets/styles/prose.less',
  ],
  typescript: {
    strict: true,
  },
  app: {
    baseURL: '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'zh-CN' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'codeisle-color-mode',
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
    renderer: {
      anchorLinks: {
        h1: false,
        h2: true,
        h3: true,
        h4: false,
      },
    },
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3,
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
        },
      },
    },
  },
})
