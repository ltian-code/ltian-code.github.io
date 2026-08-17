export type AiCategory = 'chat' | 'agent' | 'image' | 'search' | 'voice'
export type AiRegion = 'cn' | 'global'

export interface AiLink {
  id: string
  name: string
  blurb: string
  url: string
  category: AiCategory
  region: AiRegion
  needLogin: boolean
  tags: string[]
  featured?: boolean
}

export const aiCategoryLabels: Record<AiCategory, string> = {
  chat: '对话',
  agent: '编程 Agent',
  image: '绘图',
  search: '搜索',
  voice: '语音',
}

export const aiRegionLabels: Record<AiRegion, string> = {
  cn: '国内官网',
  global: '海外官网',
}

/** 只收录官方站点，不写镜像或破解。 */
export const aiLinks: AiLink[] = [
  {
    id: 'kimi',
    name: 'Kimi',
    blurb: '长上下文对话，适合读文档和整理资料',
    url: 'https://kimi.moonshot.cn',
    category: 'chat',
    region: 'cn',
    needLogin: true,
    tags: ['对话', '长上下文'],
    featured: true,
  },
  {
    id: 'tongyi',
    name: '通义',
    blurb: '阿里云官方对话与多模态入口',
    url: 'https://tongyi.aliyun.com',
    category: 'chat',
    region: 'cn',
    needLogin: true,
    tags: ['对话', '阿里云'],
    featured: true,
  },
  {
    id: 'doubao',
    name: '豆包',
    blurb: '字节官方助手，日常问答与写作',
    url: 'https://www.doubao.com',
    category: 'chat',
    region: 'cn',
    needLogin: true,
    tags: ['对话', '字节'],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    blurb: '官方对话，推理与代码场景常用',
    url: 'https://chat.deepseek.com',
    category: 'chat',
    region: 'cn',
    needLogin: true,
    tags: ['对话', '推理', '代码'],
    featured: true,
  },
  {
    id: 'yuanbao',
    name: '腾讯元宝',
    blurb: '腾讯官方助手',
    url: 'https://yuanbao.tencent.com',
    category: 'chat',
    region: 'cn',
    needLogin: true,
    tags: ['对话', '腾讯'],
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    blurb: 'OpenAI 官方对话。访问取决于你的网络环境',
    url: 'https://chatgpt.com',
    category: 'chat',
    region: 'global',
    needLogin: true,
    tags: ['对话', 'OpenAI'],
  },
  {
    id: 'claude',
    name: 'Claude',
    blurb: 'Anthropic 官方对话，长文与代码',
    url: 'https://claude.ai',
    category: 'chat',
    region: 'global',
    needLogin: true,
    tags: ['对话', 'Anthropic'],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    blurb: 'Google 官方多模态对话',
    url: 'https://gemini.google.com',
    category: 'chat',
    region: 'global',
    needLogin: true,
    tags: ['对话', 'Google'],
  },
  {
    id: 'cursor',
    name: 'Cursor',
    blurb: 'AI 代码编辑器，本岛也用它写',
    url: 'https://cursor.com',
    category: 'agent',
    region: 'global',
    needLogin: true,
    tags: ['编辑器', 'Agent', '代码'],
    featured: true,
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    blurb: 'GitHub 官方补全与 Agent',
    url: 'https://github.com/features/copilot',
    category: 'agent',
    region: 'global',
    needLogin: true,
    tags: ['补全', 'GitHub'],
  },
  {
    id: 'continue',
    name: 'Continue',
    blurb: '开源 IDE 插件，可接多种模型',
    url: 'https://www.continue.dev',
    category: 'agent',
    region: 'global',
    needLogin: false,
    tags: ['开源', '插件'],
  },
  {
    id: 'tongyi-wanxiang',
    name: '通义万相',
    blurb: '阿里云官方文生图',
    url: 'https://tongyi.aliyun.com/wanxiang',
    category: 'image',
    region: 'cn',
    needLogin: true,
    tags: ['绘图', '文生图'],
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    blurb: '官方绘图产品。访问取决于你的网络环境',
    url: 'https://www.midjourney.com',
    category: 'image',
    region: 'global',
    needLogin: true,
    tags: ['绘图'],
  },
  {
    id: 'recraft',
    name: 'Recraft',
    blurb: '矢量与品牌向的官方绘图',
    url: 'https://www.recraft.ai',
    category: 'image',
    region: 'global',
    needLogin: true,
    tags: ['绘图', '矢量'],
  },
  {
    id: 'metaso',
    name: '秘塔 AI 搜索',
    blurb: '国内官方 AI 搜索',
    url: 'https://metaso.cn',
    category: 'search',
    region: 'cn',
    needLogin: false,
    tags: ['搜索'],
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    blurb: '带引用的问答搜索。访问取决于你的网络环境',
    url: 'https://www.perplexity.ai',
    category: 'search',
    region: 'global',
    needLogin: true,
    tags: ['搜索', '引用'],
  },
  {
    id: 'tingwu',
    name: '通义听悟',
    blurb: '阿里云官方会议转写与纪要',
    url: 'https://tingwu.aliyun.com',
    category: 'voice',
    region: 'cn',
    needLogin: true,
    tags: ['语音', '转写'],
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    blurb: '官方语音合成。访问取决于你的网络环境',
    url: 'https://elevenlabs.io',
    category: 'voice',
    region: 'global',
    needLogin: true,
    tags: ['语音', 'TTS'],
  },
]

export function getAiLink(id: string): AiLink | undefined {
  return aiLinks.find(link => link.id === id)
}

export function featuredAiLinks(): AiLink[] {
  return aiLinks.filter(link => link.featured)
}

export function filterAiLinks(
  query: string,
  category: AiCategory | 'all',
  region: AiRegion | 'all',
): AiLink[] {
  const needle = query.trim().toLowerCase()
  return aiLinks.filter((link) => {
    if (category !== 'all' && link.category !== category) {
      return false
    }
    if (region !== 'all' && link.region !== region) {
      return false
    }
    if (!needle) {
      return true
    }
    const haystack = [
      link.name,
      link.blurb,
      link.id,
      aiCategoryLabels[link.category],
      aiRegionLabels[link.region],
      ...link.tags,
    ].join(' ').toLowerCase()
    return haystack.includes(needle)
  })
}
