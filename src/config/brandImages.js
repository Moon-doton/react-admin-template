/**
 * 品牌图片配置
 * - photoUrl: 真实产品照片（优先使用）
 * - 每个品牌同时保留 SVG 占位图配色作为 fallback
 *
 * 图片来源：
 *   苹果   — Apple 官方 CDN (iPhone 16 Pro Max)
 *   华为   — Wikimedia Commons (Huawei Mate 7, CC BY 2.0)
 *   小米   — Wikimedia Commons (Xiaomi 14 Ultra 實拍, CC BY-SA 4.0)
 *   三星   — Wikimedia Commons (Galaxy S24+ & S24 實拍, CC BY-SA 4.0)
 *   OPPO   — Wikimedia Commons (OPPO A2m 實拍, CC BY-SA 4.0)
 *   vivo   — Wikimedia Commons (VIVO S18e 實拍, CC BY-SA 4.0)
 */

const brandConfig = {
  '苹果': {
    bg: '#f5f5f7',
    fg: '#1d1d1f',
    accent: '#86868b',
    en: 'iPhone',
    photoUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-max-naturaltitanium-select?wid=512&hei=512&fmt=png-alpha',
  },
  '华为': {
    bg: '#fdf0f0',
    fg: '#cf0a2c',
    accent: '#e84040',
    en: 'HUAWEI',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Huawei_Mate_7.jpg',
  },
  '小米': {
    bg: '#fff6ef',
    fg: '#ff6900',
    accent: '#fd9a3e',
    en: 'Xiaomi',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/HK_%E4%B8%AD%E7%92%B0_Central_%E7%9A%87%E5%90%8E%E5%A4%A7%E9%81%93%E4%B8%AD_33_Queen%27s_Road_Central_shop_%E8%B1%90%E6%BE%A4%E9%9B%BB%E5%99%A8_Fortress_Store_%E6%89%8B%E6%A9%9F_smartphone_XiaoMi_14_Ultra_watch_May_2024_R12S_01.jpg',
  },
  '三星': {
    bg: '#eef3ff',
    fg: '#1428a0',
    accent: '#3b5fe0',
    en: 'Samsung',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/00/%E4%B8%89%E6%98%9FGalaxy_S24%2B%E5%92%8CGalaxy_S24%EF%BC%882024%E5%B9%B42%E6%9C%8820%E6%97%A5%EF%BC%89.jpg',
  },
  'OPPO': {
    bg: '#eef9f5',
    fg: '#1ba784',
    accent: '#3cc9a0',
    en: 'OPPO',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/OPPO_A2m%EF%BC%882024%E5%B9%B42%E6%9C%8820%E6%97%A5%EF%BC%89.jpg',
  },
  'vivo': {
    bg: '#eef0ff',
    fg: '#415fff',
    accent: '#6b82ff',
    en: 'vivo',
    photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/VIVO_S18e%EF%BC%882024%E5%B9%B42%E6%9C%8820%E6%97%A5%EF%BC%89.jpg',
  },
}

// 默认品牌
const defaultConfig = { bg: '#f0f0f0', fg: '#8c8c8c', accent: '#bfbfbf', en: 'Phone', photoUrl: '' }

/**
 * 生成 SVG Data URI（作为 fallback）
 */
function buildSvgFallback(cfg, brand) {
  const svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${cfg.bg}"/>
      <stop offset="100%" style="stop-color:${cfg.accent}22"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" rx="12" fill="url(#bg)"/>
  <rect x="155" y="35" width="90" height="160" rx="14" fill="none" stroke="${cfg.accent}" stroke-width="2.5" opacity="0.5"/>
  <rect x="163" y="48" width="74" height="120" rx="4" fill="${cfg.fg}" opacity="0.12"/>
  <circle cx="200" cy="172" r="5" fill="${cfg.accent}" opacity="0.4"/>
  <text x="200" y="238" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="${cfg.fg}" text-anchor="middle">${brand}</text>
  <text x="200" y="268" font-family="system-ui, sans-serif" font-size="15" font-weight="400" fill="${cfg.accent}" text-anchor="middle">${cfg.en}</text>
</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// 预生成 SVG fallback
const svgCache = {}
function getSvgFallback(brand) {
  if (!svgCache[brand]) {
    const cfg = brandConfig[brand] || defaultConfig
    svgCache[brand] = buildSvgFallback(cfg, brand)
  }
  return svgCache[brand]
}

/**
 * 获取品牌真实产品照片 URL
 * @param {string} brand - 品牌名称
 * @returns {string} 图片 URL
 */
export function getBrandPhotoUrl(brand) {
  const cfg = brandConfig[brand] || defaultConfig
  return cfg.photoUrl || getSvgFallback(brand)
}

/**
 * 获取品牌图片（优先真实照片，回退 SVG）
 * @param {string} brand - 品牌名称
 * @returns {string} 图片 URL 或 data URI
 */
export function getBrandImage(brand) {
  const cfg = brandConfig[brand] || defaultConfig
  return cfg.photoUrl || getSvgFallback(brand)
}

/**
 * 品牌选项列表
 */
export const brandOptions = Object.keys(brandConfig).map(v => ({
  label: v,
  value: v,
}))

/**
 * 默认图片（无品牌时）
 */
export const defaultImage = getSvgFallback('')

export default brandConfig
