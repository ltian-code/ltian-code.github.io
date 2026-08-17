/**
 * JWT 解码（不校验签名）。
 *
 * 对照 it-tools（MIT）jwt-parser：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/jwt-parser/jwt-parser.service.ts
 * Copyright (c) Corentin Thomasset
 *
 * 未引入 jwt-decode / lodash；Pages 上无密钥，只展开 header / payload。
 */

export interface JwtClaim {
  claim: string
  value: string
  friendly?: string
}

export type JwtResult
  = { ok: true, header: JwtClaim[], payload: JwtClaim[] }
    | { ok: false, error: string }

function decodeSegment(segment: string): unknown {
  const padded = segment.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4
  const base64 = pad ? padded + '='.repeat(4 - pad) : padded
  const json = new TextDecoder().decode(
    Uint8Array.from(atob(base64), char => char.charCodeAt(0)),
  )
  return JSON.parse(json)
}

function formatValue(value: unknown): string {
  if (value && typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}

function friendlyValue(claim: string, value: unknown): string | undefined {
  if (['exp', 'nbf', 'iat'].includes(claim) && (typeof value === 'number' || typeof value === 'string')) {
    const date = new Date(Number(value) * 1000)
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleString('zh-CN')
    }
  }
  return undefined
}

function toClaims(record: unknown): JwtClaim[] {
  if (!record || typeof record !== 'object') {
    return []
  }
  return Object.entries(record as Record<string, unknown>).map(([claim, value]) => ({
    claim,
    value: formatValue(value),
    friendly: friendlyValue(claim, value),
  }))
}

export function decodeJwt(raw: string): JwtResult {
  const token = raw.trim()
  if (!token) {
    return { ok: false, error: '请粘贴 JWT' }
  }
  const parts = token.split('.')
  if (parts.length < 2) {
    return { ok: false, error: 'JWT 至少应有 header.payload 两段' }
  }
  try {
    return {
      ok: true,
      header: toClaims(decodeSegment(parts[0])),
      payload: toClaims(decodeSegment(parts[1])),
    }
  } catch {
    return { ok: false, error: '无法解码。只支持标准 Base64URL JSON 段，不校验签名。' }
  }
}
