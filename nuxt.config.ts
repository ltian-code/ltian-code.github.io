import { rmSync } from 'node:fs'
import { join } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/fonts',
    'nuxt-og-image',
  ],
  css: [
    '~/assets/styles/variables.less',
    '~/assets/styles/prose.less',
  ],
  typescript: {
    strict: true,
  },
  hooks: {
    'nitro:init'(nitro) {
      nitro.hooks.hook('close', () => {
        const fontsOut = join(nitro.options.output.publicDir, 'fonts')
        if (fontsOut.includes('.output')) {
          rmSync(fontsOut, { recursive: true, force: true })
        }
      })
    },
  },
  app: {
    baseURL: '/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'zh-CN' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'alternate', type: 'application/rss+xml', href: '/rss.xml', title: 'CodeIsle RSS' },
      ],
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/rss.xml'],
      ignore: ['/blog?**'],
    },
  },
  site: {
    url: 'https://ltian-code.github.io',
    name: 'CodeIsle',
    description: '个人技术站点：Markdown 博客、纯前端开发工具、AI 航路图。',
  },
  fonts: {
    providers: {
      google: false,
      googleicons: false,
      bunny: false,
      fontshare: false,
      adobe: false,
    },
    families: [
      {
        name: 'Noto Sans SC',
        src: [{ url: '/fonts/NotoSansSC-Regular.ttf', format: 'truetype' }],
        weight: 400,
        global: true,
        preload: false,
      },
      {
        name: 'Noto Sans SC',
        src: [{ url: '/fonts/NotoSansSC-Bold.ttf', format: 'truetype' }],
        weight: 700,
        global: true,
        preload: false,
      },
    ],
  },
  ogImage: {
    zeroRuntime: true,
    defaults: {
      width: 1200,
      height: 630,
    },
    compatibility: {
      prerender: {
        chromium: false,
      },
    },
  },
  runtimeConfig: {
    public: {
      buildTime: process.env.NUXT_PUBLIC_BUILD_TIME || '',
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
