const TOOL_KEY = 'toolbox.tools'
const AI_KEY = 'toolbox.ai'

export const useToolboxStore = defineStore('toolbox', () => {
  const toolIds = ref<string[]>([])
  const aiIds = ref<string[]>([])
  const ready = ref(false)

  function hydrate() {
    if (!import.meta.client || ready.value) {
      return
    }
    toolIds.value = readPersisted<string[]>(TOOL_KEY, [])
    aiIds.value = readPersisted<string[]>(AI_KEY, [])
    ready.value = true
  }

  function persist() {
    writePersisted(TOOL_KEY, toolIds.value)
    writePersisted(AI_KEY, aiIds.value)
  }

  function toggleList(kind: 'tool' | 'ai', id: string) {
    hydrate()
    const list = kind === 'tool' ? toolIds : aiIds
    const index = list.value.indexOf(id)
    if (index >= 0) {
      list.value.splice(index, 1)
    } else {
      list.value = [...list.value, id]
    }
    persist()
  }

  function isToolFav(id: string) {
    return toolIds.value.includes(id)
  }

  function isAiFav(id: string) {
    return aiIds.value.includes(id)
  }

  function toggleTool(id: string) {
    toggleList('tool', id)
  }

  function toggleAi(id: string) {
    toggleList('ai', id)
  }

  return {
    toolIds,
    aiIds,
    ready,
    hydrate,
    isToolFav,
    isAiFav,
    toggleTool,
    toggleAi,
  }
})
