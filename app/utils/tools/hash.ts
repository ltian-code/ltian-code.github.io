/**
 * 文本哈希。
 *
 * 对照 it-tools（MIT）hash-text 的「多算法并列输出」交互：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/hash-text/hash-text.vue
 * Copyright (c) Corentin Thomasset
 *
 * 未引入 crypto-js；按 ADR-009 只用 Web Crypto 的 SHA-1 / SHA-256。
 */

export const HASH_ALGOS = ['SHA-1', 'SHA-256'] as const

export type HashAlgo = (typeof HASH_ALGOS)[number]

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function hashText(text: string, algo: HashAlgo): Promise<string> {
  const bytes = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest(algo, bytes)
  return toHex(digest)
}

export async function hashTextAll(text: string): Promise<Record<HashAlgo, string>> {
  const entries = await Promise.all(
    HASH_ALGOS.map(async algo => [algo, await hashText(text, algo)] as const),
  )
  return Object.fromEntries(entries) as Record<HashAlgo, string>
}
