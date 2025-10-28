import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Locale } from '@/lib/i18n/config';

interface LanguageState {
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLocale: 'ko' as Locale,
      setLocale: (locale: Locale) => set({ currentLocale: locale }),
    }),
    {
      name: 'kku-language-storage',
    }
  )
);
