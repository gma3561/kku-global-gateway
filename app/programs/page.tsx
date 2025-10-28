'use client';

import { useState, Suspense } from 'react';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import { getTranslation } from '@/lib/i18n/translations';
import { type Locale } from '@/lib/i18n/config';
import { programs, type Program } from '@/lib/data/programs';
import { motion } from 'framer-motion';
import { GraduationCap, Clock, DollarSign, Globe, Search, Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function ProgramsContent() {
  const searchParams = useSearchParams();
  const locale = (searchParams.get('lang') as Locale) || 'ko';
  const t = getTranslation(locale);

  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter programs
  const filteredPrograms = programs.filter((program) => {
    const matchesLevel = selectedLevel === 'all' || program.level === selectedLevel;
    const matchesLanguage = selectedLanguage === 'all' || program.language === selectedLanguage || program.language === 'both';
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesLanguage && matchesSearch;
  });

  const levelCounts = {
    all: programs.length,
    bachelor: programs.filter(p => p.level === 'bachelor').length,
    master: programs.filter(p => p.level === 'master').length,
    doctoral: programs.filter(p => p.level === 'doctoral').length,
  };

  return (
    <>
      <Navigation t={t} locale={locale} />
      <main className="min-h-screen bg-gray-50 pt-32">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold mb-4"
            >
              {t.programs.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100"
            >
              Discover world-class education programs tailored to your goals
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Filter Programs</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search programs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Levels ({levelCounts.all})</option>
                  <option value="bachelor">Bachelor ({levelCounts.bachelor})</option>
                  <option value="master">Master ({levelCounts.master})</option>
                  <option value="doctoral">Doctoral ({levelCounts.doctoral})</option>
                </select>
              </div>

              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Languages</option>
                  <option value="korean">Korean</option>
                  <option value="english">English</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-bold text-blue-600">{filteredPrograms.length}</span> programs
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <ProgramCard key={program.id} program={program} index={index} t={t} locale={locale} />
            ))}
          </div>

          {/* No Results */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No programs found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </main>
      <Footer t={t} locale={locale} />
    </>
  );
}

function ProgramCard({ program, index, t, locale }: { program: Program; index: number; t: any; locale: Locale }) {
  const levelColors = {
    bachelor: 'from-green-500 to-green-700',
    master: 'from-blue-500 to-blue-700',
    doctoral: 'from-purple-500 to-purple-700',
  };

  const levelLabels = {
    bachelor: t.programs.bachelor,
    master: t.programs.master,
    doctoral: t.programs.doctoral,
  };

  const languageLabels = {
    korean: t.programs.korean,
    english: t.programs.english,
    both: `${t.programs.korean} / ${t.programs.english}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
    >
      <div className={`h-2 bg-gradient-to-r ${levelColors[program.level]}`} />

      <div className="p-6">
        {/* Level Badge */}
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-4">
          {levelLabels[program.level]}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {program.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {program.description}
        </p>

        {/* Info Grid */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            <span>{program.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <DollarSign className="w-4 h-4 mr-2 text-green-600" />
            <span>₩{program.tuition.toLocaleString()} / {t.programs.perSemester}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Globe className="w-4 h-4 mr-2 text-purple-600" />
            <span>{languageLabels[program.language]}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {program.features.slice(0, 3).map((feature, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {feature}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all transform group-hover:scale-105">
          {t.common.learnMore}
        </button>
      </div>
    </motion.div>
  );
}


export default function ProgramsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Loading...</div></div>}>
      <ProgramsContent />
    </Suspense>
  );
}
