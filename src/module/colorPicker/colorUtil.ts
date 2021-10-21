export interface RGB {
  h: number
  s: number
  b: number
}

// RGB转HSB
export function RGBToHSB(rgb: any) {
  const hsb = { h: 0, s: 0, b: 0 }
  const min = Math.min(rgb.r, rgb.g, rgb.b)
  const max = Math.max(rgb.r, rgb.g, rgb.b)
  const delta = max - min
  hsb.b = max
  hsb.s = max != 0 ? (255 * delta) / max : 0
  if (hsb.s != 0) {
    if (rgb.r == max) {
      hsb.h = (rgb.g - rgb.b) / delta
    } else if (rgb.g == max) {
      hsb.h = 2 + (rgb.b - rgb.r) / delta
    } else {
      hsb.h = 4 + (rgb.r - rgb.g) / delta
    }
  } else {
    hsb.h = -1
  }
  if (max == min) {
    hsb.h = 0
  }
  hsb.h *= 60
  if (hsb.h < 0) {
    hsb.h += 360
  }
  hsb.s *= 100 / 255
  hsb.b *= 100 / 255
  return hsb
}

// HEX转HSB
export function HEXToHSB(hex: any) {
  hex = hex.indexOf('#') > -1 ? hex.substring(1) : hex
  if (hex.length == 3) {
    const num = hex.split('')
    hex = num[0] + num[0] + num[1] + num[1] + num[2] + num[2]
  }
  hex = parseInt(hex, 16)
  const rgb = { r: hex >> 16, g: (hex & 0x00ff00) >> 8, b: hex & 0x0000ff }
  return RGBToHSB(rgb)
}

// HSB转RGB
export function HSBToRGB(hsb: any) {
  const rgb: any = {}
  let h = hsb.h
  const s = (hsb.s * 255) / 100
  const b = (hsb.b * 255) / 100
  if (s == 0) {
    rgb.r = rgb.g = rgb.b = b
  } else {
    const t1 = b
    const t2 = ((255 - s) * b) / 255
    const t3 = ((t1 - t2) * (h % 60)) / 60
    if (h == 360) h = 0
    if (h < 60) {
      rgb.r = t1
      rgb.b = t2
      rgb.g = t2 + t3
    } else if (h < 120) {
      rgb.g = t1
      rgb.b = t2
      rgb.r = t1 - t3
    } else if (h < 180) {
      rgb.g = t1
      rgb.r = t2
      rgb.b = t2 + t3
    } else if (h < 240) {
      rgb.b = t1
      rgb.r = t2
      rgb.g = t1 - t3
    } else if (h < 300) {
      rgb.b = t1
      rgb.g = t2
      rgb.r = t2 + t3
    } else if (h < 360) {
      rgb.r = t1
      rgb.g = t2
      rgb.b = t1 - t3
    } else {
      rgb.r = 0
      rgb.g = 0
      rgb.b = 0
    }
  }
  return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) }
}

// HSB转HEX
export function HSBToHEX(hsb: any) {
  const rgb = HSBToRGB(hsb)
  const hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)]
  hex.forEach((val, nr) => {
    if (val.length == 1) {
      hex[nr] = '0' + val
    }
  })
  return hex.join('')
}

//转化成所需rgb格式
export function RGBSTo(rgbs: any) {
  const regexp = /[0-9]{1,3}/g
  const re = rgbs.match(regexp) || []
  return { r: re[0], g: re[1], b: re[2] }
}
