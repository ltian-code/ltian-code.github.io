export const useThemeStore = defineStore('theme', () => {
  const colorMode = useColorMode()

  const preference = computed(() => colorMode.preference)
  const resolved = computed(() => colorMode.value)

  const label = computed(() => {
    if (preference.value === 'system') return '跟随系统'
    if (preference.value === 'dark') return '深色'
    return '浅色'
  })

  function cycle() {
    const order = ['system', 'light', 'dark'] as const
    const current = preference.value as (typeof order)[number]
    const index = order.includes(current) ? order.indexOf(current) : 0
    colorMode.preference = order[(index + 1) % order.length]
  }

  return { preference, resolved, label, cycle }
})
