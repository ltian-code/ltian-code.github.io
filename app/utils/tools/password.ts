/**
 * 密码 / 随机串生成。
 *
 * 对照 it-tools（MIT）token-generator：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/token-generator/token-generator.service.ts
 * Copyright (c) Corentin Thomasset
 *
 * 用 `crypto.getRandomValues`；可排除易混字符 0/O/1/I/l。
 */

export const PASSWORD_MIN = 8
export const PASSWORD_MAX = 64

const SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*_-+=?',
} as const

const AMBIGUOUS = /[O0Il1]/g

export interface PasswordOptions {
  length: number
  upper: boolean
  lower: boolean
  numbers: boolean
  symbols: boolean
  excludeAmbiguous: boolean
}

function charset(source: string, excludeAmbiguous: boolean): string {
  return excludeAmbiguous ? source.replace(AMBIGUOUS, '') : source
}

function pick(alphabet: string): string {
  const bytes = new Uint32Array(1)
  crypto.getRandomValues(bytes)
  return alphabet[bytes[0] % alphabet.length]
}

function shuffle(chars: string[]): string[] {
  const next = [...chars]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const bytes = new Uint32Array(1)
    crypto.getRandomValues(bytes)
    const j = bytes[0] % (i + 1)
    const tmp = next[i]
    next[i] = next[j]
    next[j] = tmp
  }
  return next
}

export function clampPasswordLength(length: number): number {
  if (!Number.isFinite(length)) {
    return 16
  }
  return Math.min(PASSWORD_MAX, Math.max(PASSWORD_MIN, Math.floor(length)))
}

export function generatePassword(options: PasswordOptions): string {
  const length = clampPasswordLength(options.length)
  const groups = [
    options.upper ? charset(SETS.upper, options.excludeAmbiguous) : '',
    options.lower ? charset(SETS.lower, options.excludeAmbiguous) : '',
    options.numbers ? charset(SETS.numbers, options.excludeAmbiguous) : '',
    options.symbols ? charset(SETS.symbols, options.excludeAmbiguous) : '',
  ].filter(Boolean)

  const alphabet = groups.join('')
  if (!alphabet) {
    throw new Error('至少勾选一种字符集')
  }

  const chars = groups.map(group => pick(group))
  while (chars.length < length) {
    chars.push(pick(alphabet))
  }

  return shuffle(chars).join('')
}
