/** frontmatter `date` 为 YYYY-MM-DD 字符串。 */
export function formatPostDate(date: string | Date | null | undefined): string {
  if (date == null || date === '') {
    return ''
  }
  const value = typeof date === 'string' ? new Date(`${date}T00:00:00`) : date
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return String(date)
  }
  return value.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
