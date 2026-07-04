/** @type {Record<string, string>} */
let translations = {}

/** @type {string} */
let currentLocale = 'en'

export const SUPPORTED_LOCALES = ['en', 'fr', 'es', 'nl', 'de']

function detectLocale() {
  try {
    const stored = localStorage.getItem('velib_locale')
    if (stored && SUPPORTED_LOCALES.includes(stored)) return stored
  } catch {
    // localStorage not available
  }
  const browserLang = (navigator?.language ?? 'en').split('-')[0].toLowerCase()
  return SUPPORTED_LOCALES.includes(browserLang) ? browserLang : 'en'
}

export async function setLocale(locale) {
  const lang = SUPPORTED_LOCALES.includes(locale) ? locale : 'en'
  try {
    const module = await import(`./locales/${lang}.json`)
    translations = module.default
    currentLocale = lang
    try { localStorage.setItem('velib_locale', lang) } catch { /* ignore */ }
  } catch (err) {
    console.warn(`[i18n] Could not load locale "${lang}", falling back to "en".`, err)
    if (lang !== 'en') await setLocale('en')
  }
}

export function getLocale() {
  return currentLocale
}

export function t(key, params) {
  let text = translations[key]
  if (text === undefined) {
    console.warn(`[i18n] Missing key: "${key}" (locale: ${currentLocale})`)
    return key
  }
  if (params) {
    text = text.replace(/\{(\w+)\}/g, (_, name) =>
      params[name] !== undefined ? String(params[name]) : `{${name}}`
    )
  }
  return text
}

export async function initI18n() {
  await setLocale(detectLocale())
}
