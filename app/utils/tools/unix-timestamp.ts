/**
 * Unix 时间戳解析与格式化。
 *
 * 行为对照 it-tools（MIT）date-time-converter：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/date-time-converter/date-time-converter.models.ts
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/date-time-converter/date-time-converter.vue
 * Copyright (c) Corentin Thomasset
 *
 * 未引入 lodash / date-fns；仅保留「10 位秒 / 13 位毫秒 / ISO」判定与互转。
 */

export type TimestampKind = 'unix-s' | 'unix-ms' | 'iso'

export interface ParsedTimestamp {
  date: Date
  kind: TimestampKind
}

export const TIMEZONES = [
  { id: 'local', label: '本机时区' },
  { id: 'UTC', label: 'UTC' },
  { id: 'Asia/Shanghai', label: 'Asia/Shanghai' },
  { id: 'Asia/Tokyo', label: 'Asia/Tokyo' },
  { id: 'Europe/London', label: 'Europe/London' },
  { id: 'America/New_York', label: 'America/New_York' },
] as const

export function parseTimestampInput(raw: string): ParsedTimestamp | null {
  const value = raw.trim()
  if (!value) {
    return null
  }

  if (/^\d{13}$/.test(value)) {
    const date = new Date(Number(value))
    return Number.isNaN(date.getTime()) ? null : { date, kind: 'unix-ms' }
  }

  if (/^\d{1,10}$/.test(value)) {
    const date = new Date(Number(value) * 1000)
    return Number.isNaN(date.getTime()) ? null : { date, kind: 'unix-s' }
  }

  const ms = Date.parse(value)
  if (Number.isNaN(ms)) {
    return null
  }
  return { date: new Date(ms), kind: 'iso' }
}

export function dateFromLocalInput(value: string): Date | null {
  if (!value) {
    return null
  }
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export function formatInTimeZone(date: Date, timeZone: string): string {
  const zone = timeZone === 'local' ? undefined : timeZone
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: zone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

export function formatTimestamp(date: Date, timeZone: string) {
  return {
    seconds: String(Math.floor(date.getTime() / 1000)),
    milliseconds: String(date.getTime()),
    iso: date.toISOString(),
    utc: date.toUTCString(),
    zoned: formatInTimeZone(date, timeZone),
  }
}
