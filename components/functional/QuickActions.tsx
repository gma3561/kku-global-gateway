'use client';

import Link from 'next/link';
import {
  FileText,
  MapPin,
  Banknote,
  GraduationCap,
  Home,
  Stethoscope,
  Smartphone,
  Calendar,
  Users,
  Globe
} from 'lucide-react';
import { useLanguageStore } from '@/lib/store/languageStore';
import { getTranslation } from '@/lib/i18n/translations';

interface QuickActionsProps {
  t: any;
  locale: string;
}

export default function QuickActions({ t: _t, locale: _locale }: QuickActionsProps) {
  // Use language store instead of props for client-side language switching
  const { currentLocale } = useLanguageStore();
  const t = getTranslation(currentLocale);
  const locale = currentLocale;
  const actions = [
    {
      title: t.quickActions?.visaGuide || 'Visa Application Guide',
      description: t.quickActions?.visaGuideDesc || 'Step-by-step D-2 visa process',
      icon: <FileText className="w-6 h-6" />,
      link: `/arrival?lang=${locale}`,
      color: 'from-blue-500 to-blue-600',
      status: 'active' as const,
    },
    {
      title: t.quickActions?.campusMap || 'Campus Map',
      description: t.quickActions?.campusMapDesc || 'Find buildings and facilities',
      icon: <MapPin className="w-6 h-6" />,
      link: `/campus-life?lang=${locale}`,
      color: 'from-green-500 to-green-600',
      status: 'active' as const,
    },
    {
      title: t.quickActions?.costCalculator || 'Cost Calculator',
      description: t.quickActions?.costCalculatorDesc || 'Estimate living expenses',
      icon: <Banknote className="w-6 h-6" />,
      link: `/?lang=${locale}#calculator`,
      color: 'from-purple-500 to-purple-600',
      status: 'active' as const,
    },
    {
      title: t.quickActions?.programs || 'Academic Programs',
      description: t.quickActions?.programsDesc || 'Browse 10+ degree programs',
      icon: <GraduationCap className="w-6 h-6" />,
      link: `/programs?lang=${locale}`,
      color: 'from-indigo-500 to-indigo-600',
      status: 'active' as const,
    },
    {
      title: t.quickActions?.housing || 'Housing & Dormitories',
      description: t.quickActions?.housingDesc || 'Find accommodation options',
      icon: <Home className="w-6 h-6" />,
      link: '#',
      color: 'from-orange-500 to-orange-600',
      status: 'coming-soon' as const,
    },
    {
      title: t.quickActions?.health || 'Health Services',
      description: t.quickActions?.healthDesc || 'Medical facilities and insurance',
      icon: <Stethoscope className="w-6 h-6" />,
      link: '#',
      color: 'from-red-500 to-red-600',
      status: 'coming-soon' as const,
    },
    {
      title: t.quickActions?.phone || 'Phone & Internet',
      description: t.quickActions?.phoneDesc || 'Get Korean SIM card',
      icon: <Smartphone className="w-6 h-6" />,
      link: '#',
      color: 'from-teal-500 to-teal-600',
      status: 'coming-soon' as const,
    },
    {
      title: t.quickActions?.calendar || 'Academic Calendar',
      description: t.quickActions?.calendarDesc || 'Important dates and deadlines',
      icon: <Calendar className="w-6 h-6" />,
      link: `/dashboard?lang=${locale}`,
      color: 'from-pink-500 to-pink-600',
      status: 'active' as const,
    },
    {
      title: t.quickActions?.community || 'Student Community',
      description: t.quickActions?.communityDesc || 'Connect with other students',
      icon: <Users className="w-6 h-6" />,
      link: '#',
      color: 'from-yellow-500 to-yellow-600',
      status: 'coming-soon' as const,
    },
    {
      title: t.quickActions?.language || 'Korean Language Classes',
      description: t.quickActions?.languageDesc || 'Free Korean lessons',
      icon: <Globe className="w-6 h-6" />,
      link: '#',
      color: 'from-cyan-500 to-cyan-600',
      status: 'coming-soon' as const,
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {t.quickActions?.title || 'Quick Access Tools'}
        </h2>
        <p className="text-lg text-gray-600">
          {t.quickActions?.subtitle || 'Everything you need in one place'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {actions.map((action, index) => {
          if (action.status === 'active') {
            return (
              <Link
                key={index}
                href={action.link}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                <div className="relative p-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {action.description}
                  </p>

                  <div className="mt-4 flex items-center text-sm font-semibold text-blue-600">
                    <span>{t.quickActions?.goTo || 'Go'}</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          }

          return (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden cursor-not-allowed opacity-75"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="absolute top-3 right-3 z-10">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                  {t.quickActions?.comingSoon || 'Coming Soon'}
                </span>
              </div>

              <div className="relative p-6">
                <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-lg`}>
                  {action.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {action.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
