export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig()
  const id = appConfig.analytics.umamiWebsiteId.trim()
  const src = appConfig.analytics.umamiScriptUrl.trim()
  if (!id || !src) {
    return
  }

  useHead({
    script: [
      {
        src,
        defer: true,
        'data-website-id': id,
      },
    ],
  })
})
