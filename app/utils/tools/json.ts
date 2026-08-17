/**
 * JSON 格式化 / 压缩 / 校验。
 *
 * 对照 it-tools（MIT）json-viewer / json-minify：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/json-viewer/json.models.ts
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/json-minify/json-minify.vue
 * Copyright (c) Corentin Thomasset
 *
 * 未引入 JSON5；用 JSON.parse，并补错误行列定位。
 */

export interface JsonErrorInfo {
  message: string
  position?: number
  line?: number
  column?: number
}

export type JsonResult
  = { ok: true, pretty: string, minified: string }
    | { ok: false, error: JsonErrorInfo }

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortKeys)
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    return Object.keys(record)
      .sort((a, b) => a.localeCompare(b))
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = sortKeys(record[key])
        return acc
      }, {})
  }
  return value
}

function locateError(input: string, error: SyntaxError): JsonErrorInfo {
  const match = error.message.match(/position\s+(\d+)/i)
  const position = match ? Number(match[1]) : undefined
  if (position == null || Number.isNaN(position)) {
    return { message: error.message }
  }

  const before = input.slice(0, position)
  const lines = before.split('\n')
  return {
    message: error.message,
    position,
    line: lines.length,
    column: (lines.at(-1)?.length ?? 0) + 1,
  }
}

export function formatJson(
  raw: string,
  { indent = 2, sort = false }: { indent?: number, sort?: boolean } = {},
): JsonResult {
  const text = raw.trim()
  if (!text) {
    return { ok: false, error: { message: '请输入 JSON' } }
  }

  try {
    const parsed: unknown = JSON.parse(text)
    const value = sort ? sortKeys(parsed) : parsed
    return {
      ok: true,
      pretty: JSON.stringify(value, null, indent),
      minified: JSON.stringify(value),
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return { ok: false, error: locateError(raw, error) }
    }
    return { ok: false, error: { message: '无法解析 JSON' } }
  }
}
