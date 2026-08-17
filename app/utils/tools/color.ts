/**
 * HEX / RGB / HSL 互转。
 *
 * 对照 it-tools（MIT）color-converter 的格式集合：
 * https://github.com/CorentinTh/it-tools/blob/main/src/tools/color-converter/color-converter.models.ts
 * Copyright (c) Corentin Thomasset
 *
 * 未引入 colord；手写解析与转换。
 */

export interface RgbColor {
  r: number
  g: number
  b: number
}

function clamp(value: number, min = 0, max = 255): number {
  return Math.min(max, Math.max(min, value))
}

export function rgbToHex({ r, g, b }: RgbColor): string {
  const toHex = (n: number) => clamp(Math.round(n)).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function rgbToHsl({ r, g, b }: RgbColor): { h: number, s: number, l: number } {
  const rr = r / 255
  const gg = g / 255
  const bb = b / 255
  const max = Math.max(rr, gg, bb)
  const min = Math.min(rr, gg, bb)
  const l = (max + min) / 2
  const d = max - min

  if (d === 0) {
    return { h: 0, s: 0, l: Math.round(l * 1000) / 10 }
  }

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  switch (max) {
    case rr:
      h = (gg - bb) / d + (gg < bb ? 6 : 0)
      break
    case gg:
      h = (bb - rr) / d + 2
      break
    default:
      h = (rr - gg) / d + 4
  }
  return {
    h: Math.round(h * 60),
    s: Math.round(s * 1000) / 10,
    l: Math.round(l * 1000) / 10,
  }
}

function hueToRgb(p: number, q: number, t: number): number {
  let tt = t
  if (tt < 0) tt += 1
  if (tt > 1) tt -= 1
  if (tt < 1 / 6) return p + (q - p) * 6 * tt
  if (tt < 1 / 2) return q
  if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
  return p
}

export function hslToRgb(h: number, s: number, l: number): RgbColor {
  const ss = s / 100
  const ll = l / 100
  if (ss === 0) {
    const v = Math.round(ll * 255)
    return { r: v, g: v, b: v }
  }
  const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss
  const p = 2 * ll - q
  const hk = ((h % 360) + 360) % 360 / 360
  return {
    r: Math.round(hueToRgb(p, q, hk + 1 / 3) * 255),
    g: Math.round(hueToRgb(p, q, hk) * 255),
    b: Math.round(hueToRgb(p, q, hk - 1 / 3) * 255),
  }
}

export function parseColor(raw: string): RgbColor | null {
  const value = raw.trim()
  if (!value) {
    return null
  }

  const hex = value.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    let body = hex[1]
    if (body.length === 3) {
      body = body.split('').map(ch => ch + ch).join('')
    }
    return {
      r: Number.parseInt(body.slice(0, 2), 16),
      g: Number.parseInt(body.slice(2, 4), 16),
      b: Number.parseInt(body.slice(4, 6), 16),
    }
  }

  const rgb = value.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (rgb) {
    return {
      r: clamp(Number(rgb[1])),
      g: clamp(Number(rgb[2])),
      b: clamp(Number(rgb[3])),
    }
  }

  const hsl = value.match(/^hsla?\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%/i)
  if (hsl) {
    return hslToRgb(Number(hsl[1]), Number(hsl[2]), Number(hsl[3]))
  }

  return null
}

export function formatColor(rgb: RgbColor) {
  const hsl = rgbToHsl(rgb)
  return {
    hex: rgbToHex(rgb),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  }
}
