import { tools } from '../../app/data/tools'

const SITE = 'https://ltian-code.github.io'

const STATIC_PATHS = [
  '/',
  '/blog',
  '/tools',
  '/ai',
  '/about',
]

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .select('path', 'date', 'draft')
    .order('date', 'DESC')
    .all()

  const urls = [
    ...STATIC_PATHS.map(path => ({ loc: path, lastmod: null as string | null })),
    ...tools.filter(tool => tool.status === 'ready').map(tool => ({ loc: tool.to, lastmod: null })),
    ...posts
      .filter(post => !post.draft && post.path)
      .map(post => ({ loc: post.path, lastmod: post.date })),
  ]

  const seen = new Set<string>()
  const unique = urls.filter((item) => {
    if (seen.has(item.loc)) {
      return false
    }
    seen.add(item.loc)
    return true
  })

  const body = unique.map((item) => {
    const lastmod = item.lastmod
      ? `\n    <lastmod>${escapeXml(item.lastmod)}</lastmod>`
      : ''
    return `  <url>\n    <loc>${escapeXml(`${SITE}${item.loc}`)}</loc>${lastmod}\n  </url>`
  }).join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
})
