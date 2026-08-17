const SITE = 'https://ltian-code.github.io'

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .select('path', 'title', 'description', 'date', 'draft')
    .order('date', 'DESC')
    .all()

  const items = posts
    .filter(post => !post.draft && post.path)
    .map((post) => {
      const url = `${SITE}${post.path}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid>${escapeXml(url)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00+08:00`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description || '')}</description>
    </item>`
    })
    .join('\n')

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CodeIsle · 代码之屿</title>
    <link>${SITE}</link>
    <description>Markdown 笔记与搭建记录。</description>
    <language>zh-CN</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`
})
