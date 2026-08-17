/** frontmatter `date` 为 YYYY-MM-DD 字符串。 */
export function formatPostDate(date: string | Date): string {
  const value = typeof date === 'string' ? new Date(`${date}T00:00:00`) : date
  if (Number.isNaN(value.getTime())) {
    return String(date)
  }
  return value.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
