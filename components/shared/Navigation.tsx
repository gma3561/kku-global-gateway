'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Translation } from '@/lib/i18n/translations/ko';
import { Locale, locales, localeNames, localeFlags } from '@/lib/i18n/config';
import { useLanguageStore } from '@/lib/store/languageStore';

interface NavigationProps {
  t: Translation;
  locale: Locale;
}

const languages: { code: Locale; name: string; flag: string }[] = locales.map(code => ({
  code,
  name: localeNames[code],
  flag: localeFlags[code],
}));

export default function Navigation({ t, locale }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { currentLocale, setLocale } = useLanguageStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync locale with store on mount and URL change
  useEffect(() => {
    if (locale !== currentLocale) {
      setLocale(locale);
    }
  }, [locale, currentLocale, setLocale]);

  const handleLanguageChange = (langCode: Locale) => {
    setLocale(langCode);
    setIsLangMenuOpen(false);

    // Reload page with new language parameter
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('lang', langCode);
    const newUrl = `${pathname}?${searchParams.toString()}`;
    window.location.href = newUrl;
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-300 ${
          isScrolled ? 'mt-4 px-4' : 'mt-6 px-6'
        }`}
      >
        <motion.div
          style={{
            background: isScrolled
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: isScrolled
              ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              : '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
          }}
          className="rounded-2xl px-6 py-4"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/?lang=${locale}`} className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600"
              >
                <span className="text-xl font-bold text-white">K</span>
              </motion.div>
              <span className="text-xl font-bold text-white">KKU Global</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-8 md:flex">
              <NavLink href={`/?lang=${locale}`}>{t.nav.home || '홈'}</NavLink>
              <NavLink href={`/preparation?lang=${locale}`}>{t.nav.preparation || '유학 준비'}</NavLink>
              <NavLink href={`/arrival?lang=${locale}`}>{t.nav.arrival || '도착 후'}</NavLink>
              <NavLink href={`/campus-life?lang=${locale}`}>{t.nav.campusLife || '캠퍼스 생활'}</NavLink>
              <NavLink href={`/dashboard?lang=${locale}`}>{t.nav.dashboard || '대시보드'}</NavLink>

              {/* Language Selector */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20"
                >
                  <Globe className="h-4 w-4" />
                  <span>{currentLanguage.flag}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                      }}
                      className="absolute right-0 mt-2 w-48 rounded-xl p-2 shadow-xl z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`flex w-full items-center space-x-3 rounded-lg px-4 py-2 text-white transition-colors hover:bg-white/10 ${
                            currentLocale === lang.code ? 'bg-white/20' : ''
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                          {currentLocale === lang.code && (
                            <span className="ml-auto text-xs">✓</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/apply?lang=${locale}`}
                  className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
                >
                  {t.nav.applyNow}
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden text-white"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2 md:hidden"
              >
                <MobileNavLink href={`/?lang=${locale}`}>{t.nav.home || '홈'}</MobileNavLink>
                <MobileNavLink href={`/preparation?lang=${locale}`}>{t.nav.preparation || '유학 준비'}</MobileNavLink>
                <MobileNavLink href={`/arrival?lang=${locale}`}>{t.nav.arrival || '도착 후'}</MobileNavLink>
                <MobileNavLink href={`/campus-life?lang=${locale}`}>{t.nav.campusLife || '캠퍼스 생활'}</MobileNavLink>
                <MobileNavLink href={`/dashboard?lang=${locale}`}>{t.nav.dashboard || '대시보드'}</MobileNavLink>
                <MobileNavLink href={`/apply?lang=${locale}`} highlight>
                  {t.nav.applyNow}
                </MobileNavLink>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/80 transition-colors hover:text-white font-medium">
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  highlight = false,
}: {
  href: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-lg px-4 py-3 text-white transition-colors ${
        highlight
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 font-semibold'
          : 'bg-white/10 hover:bg-white/20'
      }`}
    >
      {children}
    </Link>
  );
}
