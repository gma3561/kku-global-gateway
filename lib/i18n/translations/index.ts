import { ko } from './ko';
import { en } from './en';
import { id } from './id';
import { vi } from './vi';
import { ru } from './ru';
import { uz } from './uz';
import { tl } from './tl';
import { th } from './th';
import { ms } from './ms';
import { kk } from './kk';
import { Locale } from '../config';

export const translations = {
  ko,
  en,
  id,
  vi,
  ru,
  uz,
  tl,
  th,
  ms,
  kk,
};

export function getTranslation(locale: Locale) {
  return translations[locale] || translations.en;
}
