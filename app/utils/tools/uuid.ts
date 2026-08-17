/**
 * UUID v4 批量生成。
 *
 * 对照 it-tools（MIT）uuid-generator（默认 v4、按数量生成）：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/uuid-generator/uuid-generator.vue
 * Copyright (c) Corentin Thomasset
 *
 * 第一版只做 v4，用 `crypto.randomUUID`，不引入 uuid 包。
 */

export const UUID_MIN = 1
export const UUID_MAX = 50

export function clampUuidCount(count: number): number {
  if (!Number.isFinite(count)) {
    return 1
  }
  return Math.min(UUID_MAX, Math.max(UUID_MIN, Math.floor(count)))
}

export function generateUuidV4Batch(count: number): string[] {
  const size = clampUuidCount(count)
  return Array.from({ length: size }, () => crypto.randomUUID())
}
