'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { locales, type Locale } from '@/lib/i18n/config';

interface LanguageSelectorProps {
  currentLocale: Locale;
}

const languageNames: Record<Locale, { flag: string; name: string; nativeName: string }> = {
  ko: { flag: '🇰🇷', name: 'Korean', nativeName: '한국어' },
  en: { flag: '🇺🇸', name: 'English', nativeName: 'English' },
  vi: { flag: '🇻🇳', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  th: { flag: '🇹🇭', name: 'Thai', nativeName: 'ไทย' },
  id: { flag: '🇮🇩', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  ms: { flag: '🇲🇾', name: 'Malay', nativeName: 'Bahasa Melayu' },
  tl: { flag: '🇵🇭', name: 'Filipino', nativeName: 'Filipino' },
  kk: { flag: '🇰🇿', name: 'Kazakh', nativeName: 'Қазақша' },
  uz: { flag: '🇺🇿', name: 'Uzbek', nativeName: 'Oʻzbekcha' },
  ru: { flag: '🇷🇺', name: 'Russian', nativeName: 'Русский' },
};

export default function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (newLocale: Locale) => {
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', newLocale);
    }

    // Build new URL with updated lang parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLocale);

    // Navigate to new URL
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  if (!mounted) {
    return null;
  }

  const currentLang = languageNames[currentLocale];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all shadow-sm hover:shadow-md"
        aria-label="Select Language"
      >
        <span className="text-2xl">{currentLang.flag}</span>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-xs text-gray-500">{currentLang.name}</span>
          <span className="text-sm font-semibold text-gray-900">{currentLang.nativeName}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-gray-700">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">Select Language / 언어 선택</span>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {locales.map((locale) => {
              const lang = languageNames[locale];
              const isActive = locale === currentLocale;

              return (
                <button
                  key={locale}
                  onClick={() => changeLanguage(locale)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 transition-colors ${
                    isActive
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : 'hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <div className={`font-semibold ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                      {lang.nativeName}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {lang.name}
                    </div>
                  </div>
                  {isActive && (
                    <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              💡 Your preference is saved automatically
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
