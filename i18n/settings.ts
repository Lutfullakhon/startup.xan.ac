export const fallbackLng = 'en'
export const languages = [fallbackLng, 'uz', 'ru', 'tr']

export const cookieName = 'i18next'

export function getOptions (lng = fallbackLng) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
  }
}