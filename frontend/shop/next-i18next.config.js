const path = require('path');

// Default language fallback for production builds
const defaultLanguage = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en';

const isMultiLangEnable =
  process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
  !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;

function generateLocales() {
  if (isMultiLangEnable) {
    return process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES.split(',');
  }

  return [defaultLanguage];
}

module.exports = {
  i18n: {
    defaultLocale: defaultLanguage,
    locales: generateLocales(),
    localeDetection: false,
  },
  react: { useSuspense: false },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
