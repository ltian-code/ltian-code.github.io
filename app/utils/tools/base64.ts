/**
 * Base64 文本编解码。
 *
 * 对照 it-tools（MIT）base64-string-converter + utils/base64.ts：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/base64-string-converter/base64-string-converter.vue
 * https://github.com/CorentinTh/it-tools/blob/main/src/utils/base64.ts
 * Copyright (c) Corentin Thomasset
 *
 * 未引入 js-base64；用 TextEncoder / btoa，保留 URL-safe 与 data URL 前缀处理。
 */

export function stripDataUrlPrefix(value: string): string {
  return value.replace(/^data:.*?;base64,/i, '')
}

function toUrlSafe(encoded: string): string {
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromUrlSafe(encoded: string): string {
  const restored = encoded.replace(/-/g, '+').replace(/_/g, '/')
  const pad = restored.length % 4
  return pad ? restored + '='.repeat(4 - pad) : restored
}

function bytesToBinary(bytes: Uint8Array): string {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return binary
}

export function textToBase64(text: string, urlSafe = false): string {
  const bytes = new TextEncoder().encode(text)
  const encoded = btoa(bytesToBinary(bytes))
  return urlSafe ? toUrlSafe(encoded) : encoded
}

export function base64ToText(raw: string, urlSafe = false): string {
  const stripped = stripDataUrlPrefix(raw.trim()).replace(/\s/g, '')
  const encoded = urlSafe ? fromUrlSafe(stripped) : stripped
  try {
    const binary = atob(encoded)
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  } catch {
    throw new Error('不是有效的 Base64')
  }
}

export function tryDecodeBase64(raw: string, urlSafe = false): { ok: true, text: string } | { ok: false, error: string } {
  if (!raw.trim()) {
    return { ok: false, error: '请输入 Base64' }
  }
  try {
    return { ok: true, text: base64ToText(raw, urlSafe) }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : '解码失败' }
  }
}
