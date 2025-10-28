export type Locale = 'ko' | 'en' | 'id' | 'vi' | 'ru' | 'uz' | 'tl' | 'th' | 'ms' | 'kk';

export const locales: Locale[] = ['ko', 'en', 'id', 'vi', 'ru', 'uz', 'tl', 'th', 'ms', 'kk'];

export const defaultLocale: Locale = 'ko';

export const localeNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
  ru: 'Русский',
  uz: 'Oʻzbekcha',
  tl: 'Tagalog',
  th: 'ไทย',
  ms: 'Bahasa Melayu',
  kk: 'Қазақша'
};

export const localeFlags: Record<Locale, string> = {
  ko: '🇰🇷',
  en: '🇬🇧',
  id: '🇮🇩',
  vi: '🇻🇳',
  ru: '🇷🇺',
  uz: '🇺🇿',
  tl: '🇵🇭',
  th: '🇹🇭',
  ms: '🇲🇾',
  kk: '🇰🇿'
};
