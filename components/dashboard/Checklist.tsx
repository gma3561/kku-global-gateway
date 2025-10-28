'use client';

import { useState, useEffect } from 'react';
import { Check, Circle } from 'lucide-react';
import type { Translation } from '@/lib/i18n/translations/ko';

interface ChecklistItem {
  id: string;
  title: string;
  category: 'preparation' | 'arrival' | 'academic' | 'life';
  completed: boolean;
  important: boolean;
}

interface ChecklistProps {
  t: Translation;
  locale: string;
}

const defaultChecklistItems = (locale: string): ChecklistItem[] => [
  // Preparation (출국 전)
  {
    id: 'visa-application',
    title: locale === 'ko' ? '비자 신청' : 'Visa Application',
    category: 'preparation',
    completed: false,
    important: true,
  },
  {
    id: 'flight-booking',
    title: locale === 'ko' ? '항공권 예약' : 'Flight Booking',
    category: 'preparation',
    completed: false,
    important: true,
  },
  {
    id: 'accommodation',
    title: locale === 'ko' ? '숙소 예약' : 'Accommodation Booking',
    category: 'preparation',
    completed: false,
    important: true,
  },
  {
    id: 'health-insurance',
    title: locale === 'ko' ? '건강보험 가입' : 'Health Insurance',
    category: 'preparation',
    completed: false,
    important: true,
  },
  {
    id: 'vaccinations',
    title: locale === 'ko' ? '예방접종' : 'Vaccinations',
    category: 'preparation',
    completed: false,
    important: false,
  },
  {
    id: 'passport-validity',
    title: locale === 'ko' ? '여권 유효기간 확인 (6개월 이상)' : 'Passport Validity Check (6+ months)',
    category: 'preparation',
    completed: false,
    important: true,
  },

  // Arrival (도착 후)
  {
    id: 'dorm-checkin',
    title: locale === 'ko' ? '기숙사 체크인' : 'Dormitory Check-in',
    category: 'arrival',
    completed: false,
    important: true,
  },
  {
    id: 'foreign-registration',
    title: locale === 'ko' ? '외국인 등록 (90일 이내)' : 'Foreign Registration (within 90 days)',
    category: 'arrival',
    completed: false,
    important: true,
  },
  {
    id: 'bank-account',
    title: locale === 'ko' ? '은행 계좌 개설' : 'Bank Account Opening',
    category: 'arrival',
    completed: false,
    important: true,
  },
  {
    id: 'student-id',
    title: locale === 'ko' ? '학생증 발급' : 'Student ID Card',
    category: 'arrival',
    completed: false,
    important: true,
  },
  {
    id: 'sim-card',
    title: locale === 'ko' ? 'SIM 카드 구매' : 'SIM Card Purchase',
    category: 'arrival',
    completed: false,
    important: false,
  },

  // Academic (학업)
  {
    id: 'course-registration',
    title: locale === 'ko' ? '수강 신청' : 'Course Registration',
    category: 'academic',
    completed: false,
    important: true,
  },
  {
    id: 'library-tour',
    title: locale === 'ko' ? '도서관 투어' : 'Library Tour',
    category: 'academic',
    completed: false,
    important: false,
  },
  {
    id: 'academic-advisor',
    title: locale === 'ko' ? '학업 지도교수 상담' : 'Academic Advisor Meeting',
    category: 'academic',
    completed: false,
    important: false,
  },

  // Life (생활)
  {
    id: 'orientation',
    title: locale === 'ko' ? '오리엔테이션 참석' : 'Orientation Attendance',
    category: 'life',
    completed: false,
    important: true,
  },
  {
    id: 'campus-tour',
    title: locale === 'ko' ? '캠퍼스 투어' : 'Campus Tour',
    category: 'life',
    completed: false,
    important: false,
  },
  {
    id: 'buddy-system',
    title: locale === 'ko' ? '버디 프로그램 신청' : 'Buddy Program Registration',
    category: 'life',
    completed: false,
    important: false,
  },
];

export default function Checklist({ t, locale }: ChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'preparation' | 'arrival' | 'academic' | 'life'>('all');

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('kku-checklist');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(defaultChecklistItems(locale));
    }
  }, [locale]);

  useEffect(() => {
    // Save to localStorage whenever items change
    if (items.length > 0) {
      localStorage.setItem('kku-checklist', JSON.stringify(items));
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const resetChecklist = () => {
    if (confirm(locale === 'ko' ? '체크리스트를 초기화하시겠습니까?' : 'Reset checklist?')) {
      setItems(defaultChecklistItems(locale));
    }
  };

  const filteredItems = filter === 'all'
    ? items
    : items.filter(item => item.category === filter);

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  const categoryLabels = {
    all: locale === 'ko' ? '전체' : 'All',
    preparation: locale === 'ko' ? '출국 전' : 'Preparation',
    arrival: locale === 'ko' ? '도착 후' : 'Arrival',
    academic: locale === 'ko' ? '학업' : 'Academic',
    life: locale === 'ko' ? '생활' : 'Life',
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-900">
            {locale === 'ko' ? '나의 체크리스트' : 'My Checklist'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {completedCount} / {totalCount} {locale === 'ko' ? '완료' : 'completed'}
          </p>
        </div>
        <button
          onClick={resetChecklist}
          className="text-sm text-indigo-600 hover:text-indigo-800 underline"
        >
          {locale === 'ko' ? '초기화' : 'Reset'}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-sm font-semibold text-indigo-900 mt-2">{progress}%</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['all', 'preparation', 'arrival', 'academic', 'life'] as const).map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="space-y-2">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all ${
              item.completed
                ? 'bg-green-50 hover:bg-green-100'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              item.completed
                ? 'border-green-600 bg-green-600'
                : 'border-gray-300'
            }`}>
              {item.completed && <Check className="w-4 h-4 text-white" />}
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className={`font-medium ${
                  item.completed ? 'text-green-900 line-through' : 'text-gray-900'
                }`}>
                  {item.title}
                </span>
                {item.important && !item.completed && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                    {locale === 'ko' ? '중요' : 'Important'}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {locale === 'ko' ? '항목이 없습니다' : 'No items'}
        </div>
      )}
    </div>
  );
}
