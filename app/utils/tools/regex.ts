/**
 * 正则试验：匹配列表与高亮切片。
 *
 * 对照 it-tools（MIT）regex-tester：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/regex-tester/regex-tester.service.ts
 * Copyright (c) Corentin Thomasset
 *
 * 未依赖 `d` indices；用 lastIndex 推进，避免空匹配死循环。
 */

export interface RegexMatch {
  index: number
  value: string
  groups: string[]
}

export type RegexResult
  = { ok: true, matches: RegexMatch[] }
    | { ok: false, error: string }

export const REGEX_CHEATSHEET = [
  { token: '.', meaning: '任意单字符（除换行，除非 s）' },
  { token: '\\d \\w \\s', meaning: '数字 / 单词字符 / 空白' },
  { token: '^ $', meaning: '行首 / 行尾' },
  { token: '* + ?', meaning: '0+ / 1+ / 0 或 1 次' },
  { token: '{n,m}', meaning: '重复 n 到 m 次' },
  { token: '[abc]', meaning: '字符类' },
  { token: '( )', meaning: '捕获组' },
  { token: '|', meaning: '或' },
] as const

export function testRegex(pattern: string, flags: string, text: string): RegexResult {
  if (!pattern) {
    return { ok: true, matches: [] }
  }

  let regex: RegExp
  try {
    const normalized = flags.includes('g') ? flags : `${flags}g`
    regex = new RegExp(pattern, normalized)
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : '正则无效' }
  }

  const matches: RegexMatch[] = []
  let lastIndex = -1
  let result = regex.exec(text)

  while (result) {
    if (regex.lastIndex === lastIndex || result[0] === '') {
      break
    }
    lastIndex = regex.lastIndex
    matches.push({
      index: result.index,
      value: result[0],
      groups: result.slice(1),
    })
    if (matches.length >= 200) {
      break
    }
    result = regex.exec(text)
  }

  return { ok: true, matches }
}

export function splitHighlights(text: string, matches: RegexMatch[]): Array<{ text: string, hit: boolean }> {
  if (!matches.length) {
    return text ? [{ text, hit: false }] : []
  }

  const parts: Array<{ text: string, hit: boolean }> = []
  let cursor = 0
  for (const match of matches) {
    if (match.index > cursor) {
      parts.push({ text: text.slice(cursor, match.index), hit: false })
    }
    parts.push({ text: match.value, hit: true })
    cursor = match.index + match.value.length
  }
  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), hit: false })
  }
  return parts
}
