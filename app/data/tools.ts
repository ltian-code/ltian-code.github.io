export type ToolStatus = 'ready' | 'planned'
export type ToolCategory = 'convert' | 'encode' | 'generate'

export interface ToolMeta {
  id: string
  title: string
  description: string
  to: string
  category: ToolCategory
  status: ToolStatus
  tags: string[]
}

export const categoryLabels: Record<ToolCategory, string> = {
  convert: '转换',
  encode: '编解码',
  generate: '生成',
}

/** 阶段 2 首批 5 个 + 阶段 3 扩容 5 个。见 ADR-009 / ADR-011。 */
export const tools: ToolMeta[] = [
  {
    id: 'unix-timestamp',
    title: 'Unix 时间戳',
    description: '秒 / 毫秒、时区、ISO 互转',
    to: '/tools/unix-timestamp',
    category: 'convert',
    status: 'ready',
    tags: ['timestamp', 'unix', 'iso', '时区'],
  },
  {
    id: 'json',
    title: 'JSON 格式化',
    description: '缩进、压缩、校验与错误定位',
    to: '/tools/json',
    category: 'convert',
    status: 'ready',
    tags: ['json', 'pretty', 'minify'],
  },
  {
    id: 'base64',
    title: 'Base64',
    description: '文本编解码，数据不出浏览器',
    to: '/tools/base64',
    category: 'encode',
    status: 'ready',
    tags: ['base64', 'encode', 'decode'],
  },
  {
    id: 'url',
    title: 'URL 编解码',
    description: 'encodeURIComponent，查询串友好',
    to: '/tools/url',
    category: 'encode',
    status: 'ready',
    tags: ['url', 'encode', 'query'],
  },
  {
    id: 'uuid',
    title: 'UUID',
    description: '批量生成 UUID v4',
    to: '/tools/uuid',
    category: 'generate',
    status: 'ready',
    tags: ['uuid', 'v4', 'id'],
  },
  {
    id: 'hash',
    title: 'Hash',
    description: 'Web Crypto：SHA-256 / SHA-1',
    to: '/tools/hash',
    category: 'encode',
    status: 'ready',
    tags: ['hash', 'sha-1', 'sha-256'],
  },
  {
    id: 'regex',
    title: '正则试验',
    description: '匹配高亮与常用记号',
    to: '/tools/regex',
    category: 'convert',
    status: 'ready',
    tags: ['regex', 'regexp', '匹配'],
  },
  {
    id: 'color',
    title: '颜色转换',
    description: 'HEX / RGB / HSL，复制 CSS',
    to: '/tools/color',
    category: 'convert',
    status: 'ready',
    tags: ['color', 'hex', 'rgb', 'hsl'],
  },
  {
    id: 'jwt',
    title: 'JWT 解码',
    description: '只展开 header / payload，不校验签名',
    to: '/tools/jwt',
    category: 'encode',
    status: 'ready',
    tags: ['jwt', 'token', 'base64url'],
  },
  {
    id: 'password',
    title: '密码生成',
    description: '长度、字符集、排除歧义字符',
    to: '/tools/password',
    category: 'generate',
    status: 'ready',
    tags: ['password', 'token', '随机'],
  },
]

export function getTool(id: string): ToolMeta | undefined {
  return tools.find(tool => tool.id === id)
}

export function filterTools(query: string, category: ToolCategory | 'all'): ToolMeta[] {
  const needle = query.trim().toLowerCase()
  return tools.filter((tool) => {
    if (category !== 'all' && tool.category !== category) {
      return false
    }
    if (!needle) {
      return true
    }
    const haystack = [
      tool.title,
      tool.description,
      tool.id,
      categoryLabels[tool.category],
      ...tool.tags,
    ].join(' ').toLowerCase()
    return haystack.includes(needle)
  })
}

export function sortToolsByFavorites(list: ToolMeta[], favoriteIds: string[]): ToolMeta[] {
  if (!favoriteIds.length) {
    return list
  }
  const pinned = list.filter(tool => favoriteIds.includes(tool.id))
  const rest = list.filter(tool => !favoriteIds.includes(tool.id))
  return [...pinned, ...rest]
}

export function featuredTools(favoriteIds: string[], limit = 6): ToolMeta[] {
  const ready = tools.filter(tool => tool.status === 'ready')
  return sortToolsByFavorites(ready, favoriteIds).slice(0, limit)
}
