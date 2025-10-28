'use client';

import { useState } from 'react';
import { DollarSign, CloudRain, MapPin, Calculator } from 'lucide-react';

interface UsefulToolsProps {
  locale: string;
}

export default function UsefulTools({ locale }: UsefulToolsProps) {
  const [amount, setAmount] = useState<string>('100');
  const [currency, setCurrency] = useState<'USD' | 'KRW'>('USD');

  // 환율 (예시 - 실제로는 API에서 가져와야 함)
  const exchangeRate = 1300;

  const convertedAmount = currency === 'USD'
    ? (parseFloat(amount) || 0) * exchangeRate
    : (parseFloat(amount) || 0) / exchangeRate;

  const tools = [
    {
      icon: DollarSign,
      title: locale === 'ko' ? '환율 계산기' : 'Currency Converter',
      color: 'bg-green-600',
      component: (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Amount"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'KRW')}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="USD">USD</option>
              <option value="KRW">KRW</option>
            </select>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">
              {locale === 'ko' ? '환전 결과' : 'Converted Amount'}
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {currency === 'USD'
                ? `₩${convertedAmount.toLocaleString('ko-KR', { maximumFractionDigits: 0 })}`
                : `$${convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {locale === 'ko' ? `환율: $1 = ₩${exchangeRate.toLocaleString()}` : `Rate: $1 = ₩${exchangeRate.toLocaleString()}`}
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: CloudRain,
      title: locale === 'ko' ? '날씨 정보' : 'Weather',
      color: 'bg-blue-600',
      component: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">22°C</div>
              <div className="text-sm text-gray-600">
                {locale === 'ko' ? '맑음' : 'Clear'}
              </div>
            </div>
            <div className="text-6xl">☀️</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-gray-600">{locale === 'ko' ? '습도' : 'Humidity'}</div>
              <div className="font-semibold">60%</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-gray-600">{locale === 'ko' ? '바람' : 'Wind'}</div>
              <div className="font-semibold">5 m/s</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="text-gray-600">{locale === 'ko' ? '강수' : 'Rain'}</div>
              <div className="font-semibold">0%</div>
            </div>
          </div>
          <a
            href="https://weather.naver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-sm text-indigo-600 hover:text-indigo-800 underline"
          >
            {locale === 'ko' ? '자세히 보기' : 'View More'}
          </a>
        </div>
      ),
    },
    {
      icon: MapPin,
      title: locale === 'ko' ? '교통 정보' : 'Transportation',
      color: 'bg-purple-600',
      component: (
        <div className="space-y-3">
          <div className="space-y-2">
            <a
              href="https://map.kakao.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="font-semibold text-gray-900">🗺️ {locale === 'ko' ? '카카오맵' : 'Kakao Map'}</div>
              <div className="text-sm text-gray-600">{locale === 'ko' ? '길찾기 및 지도' : 'Navigation & Maps'}</div>
            </a>
            <a
              href="https://www.subway.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="font-semibold text-gray-900">🚇 {locale === 'ko' ? '지하철 노선도' : 'Subway Map'}</div>
              <div className="text-sm text-gray-600">{locale === 'ko' ? '서울 지하철 정보' : 'Seoul Subway Info'}</div>
            </a>
            <a
              href="https://www.bustago.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="font-semibold text-gray-900">🚌 {locale === 'ko' ? '버스 정보' : 'Bus Info'}</div>
              <div className="text-sm text-gray-600">{locale === 'ko' ? '실시간 버스 위치' : 'Real-time Bus'}</div>
            </a>
          </div>
        </div>
      ),
    },
    {
      icon: Calculator,
      title: locale === 'ko' ? '유용한 링크' : 'Useful Links',
      color: 'bg-orange-600',
      component: (
        <div className="space-y-2">
          <a
            href="https://www.hikorea.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="font-semibold text-gray-900">🏛️ Hi Korea</div>
            <div className="text-sm text-gray-600">{locale === 'ko' ? '출입국·외국인정책본부' : 'Immigration Office'}</div>
          </a>
          <a
            href="https://www.study.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="font-semibold text-gray-900">📚 {locale === 'ko' ? '국립국제교육원' : 'NIIED'}</div>
            <div className="text-sm text-gray-600">{locale === 'ko' ? '유학생 지원 정보' : 'Student Support'}</div>
          </a>
          <a
            href="https://www.gukje.ac.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="font-semibold text-gray-900">🏫 {locale === 'ko' ? 'KKU 공식 사이트' : 'KKU Official'}</div>
            <div className="text-sm text-gray-600">{locale === 'ko' ? '학교 홈페이지' : 'University Website'}</div>
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {tools.map((tool, index) => {
        const Icon = tool.icon;
        return (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className={`${tool.color} p-3 rounded-full`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{tool.title}</h3>
            </div>
            {tool.component}
          </div>
        );
      })}
    </div>
  );
}
