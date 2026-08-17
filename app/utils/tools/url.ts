/**
 * URL 编解码。
 *
 * 对照 it-tools（MIT）url-encoder：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/url-encoder/url-encoder.vue
 * Copyright (c) Corentin Thomasset
 *
 * 用 `encodeURIComponent` / `decodeURIComponent`，查询串更安全。
 */

export function encodeUrl(text: string): string {
  return encodeURIComponent(text)
}

export function tryDecodeUrl(text: string): { ok: true, text: string } | { ok: false, error: string } {
  const value = text.trim()
  if (!value) {
    return { ok: false, error: '请输入要解码的字符串' }
  }
  try {
    return { ok: true, text: decodeURIComponent(value) }
  } catch {
    return { ok: false, error: '不是有效的 URL 编码（可能有未转义的 %）' }
  }
}
