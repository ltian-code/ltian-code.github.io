export default defineAppConfig({
  site: {
    name: 'CodeIsle',
    nameZh: '代码之屿',
    tagline: '岛上有文章、有工具箱、有航路图。',
    description: '个人技术站点：Markdown 博客、纯前端开发工具、AI 航路图。',
    url: 'https://ltian-code.github.io',
    sourceUrl: 'https://github.com/ltian-code/ltian-code.github.io',
  },
  social: {
    github: 'https://github.com/ltian-code',
  },
  giscus: {
    repo: 'ltian-code/ltian-code.github.io',
    repoId: 'R_kgDOT6zwRQ',
    category: 'Announcements',
    categoryId: 'DIC_kwDOT6zwRc4DDkR7',
  },
  nav: [
    { to: '/', label: '首页', exact: true },
    { to: '/blog', label: '博客', exact: false },
    { to: '/tools', label: '工具箱', exact: false },
    { to: '/ai', label: 'AI 导航', exact: false },
    { to: '/about', label: '关于', exact: false },
  ],
})
