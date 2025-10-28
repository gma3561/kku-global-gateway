'use client';

import { useState } from 'react';
import type { Translation } from '@/lib/i18n/translations/ko';

interface CalendarEvent {
  date: string;
  title: string;
  type: 'important' | 'event' | 'academic' | 'social';
}

interface CalendarProps {
  t: Translation;
  locale: string;
}

export default function Calendar({ t, locale }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample events - in real app, this would come from props or API
  const events: CalendarEvent[] = [
    { date: '2025-11-01', title: locale === 'ko' ? '외국인 등록 마감' : 'Foreign Registration Deadline', type: 'important' },
    { date: '2025-11-05', title: locale === 'ko' ? '오리엔테이션 (국제학생)' : 'Orientation (International Students)', type: 'event' },
    { date: '2025-11-10', title: locale === 'ko' ? '수강 신청 시작' : 'Course Registration Opens', type: 'academic' },
    { date: '2025-11-15', title: locale === 'ko' ? '기숙사 회의' : 'Dormitory Meeting', type: 'social' },
    { date: '2025-11-20', title: locale === 'ko' ? '중간고사 시작' : 'Midterm Exams Begin', type: 'academic' },
    { date: '2025-11-25', title: locale === 'ko' ? '문화 축제' : 'Cultural Festival', type: 'event' },
  ];

  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Month navigation
  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  // Get events for a specific date
  const getEventsForDate = (day: number): CalendarEvent[] => {
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  // Check if date has events
  const hasEvents = (day: number): boolean => {
    return getEventsForDate(day).length > 0;
  };

  // Month names
  const monthNames = locale === 'ko'
    ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = locale === 'ko'
    ? ['일', '월', '화', '수', '목', '금', '토']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate calendar days
  const calendarDays = [];

  // Empty cells before first day
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="h-12 md:h-16"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getEventsForDate(day);
    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
    const dateObj = new Date(year, month, day);
    const isSelected = selectedDate?.toDateString() === dateObj.toDateString();

    calendarDays.push(
      <button
        key={day}
        onClick={() => setSelectedDate(dateObj)}
        className={`
          h-12 md:h-16 p-1 md:p-2 rounded-lg transition-all relative
          ${isToday ? 'bg-indigo-100 border-2 border-indigo-600' : ''}
          ${isSelected ? 'bg-indigo-200 ring-2 ring-indigo-600' : ''}
          ${!isToday && !isSelected ? 'hover:bg-indigo-50' : ''}
          ${dayEvents.length > 0 ? 'font-semibold' : ''}
        `}
      >
        <div className={`text-sm md:text-base ${isToday ? 'text-indigo-900' : 'text-gray-700'}`}>
          {day}
        </div>
        {dayEvents.length > 0 && (
          <div className="flex justify-center gap-0.5 mt-0.5 md:mt-1">
            {dayEvents.slice(0, 3).map((event, idx) => (
              <div
                key={idx}
                className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${
                  event.type === 'important' ? 'bg-red-500' :
                  event.type === 'event' ? 'bg-blue-500' :
                  event.type === 'academic' ? 'bg-green-500' :
                  'bg-purple-500'
                }`}
              ></div>
            ))}
          </div>
        )}
      </button>
    );
  }

  // Get events for selected date
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate.getDate()) : [];

  return (
    <div className="bg-white rounded-2xl p-4 md:p-8 shadow-lg">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-indigo-900">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition-colors flex items-center justify-center text-indigo-900"
          >
            ←
          </button>
          <button
            onClick={nextMonth}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-100 hover:bg-indigo-200 transition-colors flex items-center justify-center text-indigo-900"
          >
            →
          </button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
        {dayNames.map((day, index) => (
          <div
            key={index}
            className={`text-center text-xs md:text-sm font-semibold py-2 ${
              index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6">
        {calendarDays}
      </div>

      {/* Event Legend */}
      <div className="flex flex-wrap gap-3 md:gap-4 mb-6 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-600">{locale === 'ko' ? '중요' : 'Important'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-600">{locale === 'ko' ? '행사' : 'Event'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">{locale === 'ko' ? '학사' : 'Academic'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-purple-500"></div>
          <span className="text-gray-600">{locale === 'ko' ? '사교' : 'Social'}</span>
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-800 mb-4">
            {selectedDate.toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h4>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedDateEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors"
                >
                  <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                    event.type === 'important' ? 'bg-red-500' :
                    event.type === 'event' ? 'bg-blue-500' :
                    event.type === 'academic' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-gray-800">{event.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {event.type === 'important' ? (locale === 'ko' ? '중요' : 'Important') :
                       event.type === 'event' ? (locale === 'ko' ? '행사' : 'Event') :
                       event.type === 'academic' ? (locale === 'ko' ? '학사 일정' : 'Academic') :
                       (locale === 'ko' ? '사교 행사' : 'Social Event')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              {locale === 'ko' ? '이 날짜에 예정된 일정이 없습니다.' : 'No events scheduled for this date.'}
            </p>
          )}
        </div>
      )}

      {/* Upcoming Events Summary */}
      {!selectedDate && events.length > 0 && (
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-800 mb-4">
            {locale === 'ko' ? '다가오는 일정' : 'Upcoming Events'}
          </h4>
          <div className="space-y-2">
            {events.slice(0, 4).map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === 'important' ? 'bg-red-500' :
                    event.type === 'event' ? 'bg-blue-500' :
                    event.type === 'academic' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`}></div>
                  <div>
                    <div className="font-medium text-sm text-gray-800">{event.title}</div>
                    <div className="text-xs text-gray-500">{event.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
