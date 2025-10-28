'use client';

import Link from 'next/link';
import { Translation } from '@/lib/i18n/translations/ko';
import { Locale } from '@/lib/i18n/config';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  t: Translation;
  locale: Locale;
}

export default function Footer({ t, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-xl font-bold">K</span>
              </div>
              <span className="text-xl font-bold">KKU Global</span>
            </div>
            <p className="text-gray-300 mb-4">
              {t.hero.subtitle}
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/?lang=${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/programs?lang=${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.findProgram}
                </Link>
              </li>
              <li>
                <Link href={`/admissions?lang=${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.admissionGuide}
                </Link>
              </li>
              <li>
                <Link href={`/costs?lang=${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.costsScholarships}
                </Link>
              </li>
              <li>
                <Link href={`/campus?lang=${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.campusLife}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t.footer.forStudents}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/apply?lang=${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.applyNow}
                </Link>
              </li>
              <li>
                <Link href={`/dashboard?lang=${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.dashboard}
                </Link>
              </li>
              <li>
                <Link href={`/testimonials?lang=${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.studentStories}
                </Link>
              </li>
              <li>
                <Link href={`/korea-info?lang=${locale}`} className="text-gray-300 hover:text-white transition-colors">
                  {t.nav.koreaInfo}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t.footer.connect}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  123 University Road, Seoul, South Korea 06234
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+82-2-1234-5678" className="text-gray-300 hover:text-white transition-colors">
                  +82-2-1234-5678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:global@kku.ac.kr" className="text-gray-300 hover:text-white transition-colors">
                  global@kku.ac.kr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Kyung Kook University. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href={`/privacy?lang=${locale}`} className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href={`/terms?lang=${locale}`} className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href={`/accessibility?lang=${locale}`} className="text-gray-400 hover:text-white text-sm transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
