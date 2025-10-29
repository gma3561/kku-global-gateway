'use client';

import { useState, useEffect } from 'react';
import { Calculator, Home, Utensils, Bus, BookOpen, Heart } from 'lucide-react';

interface CostCalculatorProps {
  t: any;
}

export default function CostCalculator({ t }: CostCalculatorProps) {
  const [tuition, setTuition] = useState(3000000);
  const [housing, setHousing] = useState(400000);
  const [food, setFood] = useState(300000);
  const [transport, setTransport] = useState(100000);
  const [books, setBooks] = useState(150000);
  const [misc, setMisc] = useState(200000);
  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState<'KRW' | 'USD'>('KRW');

  useEffect(() => {
    const sum = tuition + housing + food + transport + books + misc;
    setTotal(sum);
  }, [tuition, housing, food, transport, books, misc]);

  const formatMoney = (amount: number) => {
    if (currency === 'USD') {
      return `$${(amount / 1300).toFixed(2)}`;
    }
    return `₩${amount.toLocaleString()}`;
  };

  const convertValue = (krw: number) => {
    return currency === 'USD' ? Math.round(krw / 1300) : krw;
  };

  const handleChange = (setter: (val: number) => void, value: string) => {
    const numValue = parseInt(value) || 0;
    const krwValue = currency === 'USD' ? numValue * 1300 : numValue;
    setter(krwValue);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Calculator className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t.calculator?.title || 'Monthly Living Cost Calculator'}
            </h2>
            <p className="text-gray-600">{t.calculator?.subtitle || 'Estimate your monthly expenses in Korea'}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrency('KRW')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currency === 'KRW' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            KRW (₩)
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              currency === 'USD' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Inputs */}
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <BookOpen className="w-4 h-4 mr-2 text-purple-600" />
              {t.calculator?.tuition || 'Tuition (per semester)'}
            </label>
            <input
              type="number"
              value={convertValue(tuition)}
              onChange={(e) => handleChange(setTuition, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Home className="w-4 h-4 mr-2 text-blue-600" />
              {t.calculator?.housing || 'Housing (per month)'}
            </label>
            <input
              type="number"
              value={convertValue(housing)}
              onChange={(e) => handleChange(setHousing, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Utensils className="w-4 h-4 mr-2 text-green-600" />
              {t.calculator?.food || 'Food (per month)'}
            </label>
            <input
              type="number"
              value={convertValue(food)}
              onChange={(e) => handleChange(setFood, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Bus className="w-4 h-4 mr-2 text-yellow-600" />
              {t.calculator?.transport || 'Transportation (per month)'}
            </label>
            <input
              type="number"
              value={convertValue(transport)}
              onChange={(e) => handleChange(setTransport, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <BookOpen className="w-4 h-4 mr-2 text-red-600" />
              {t.calculator?.books || 'Books & Supplies (per month)'}
            </label>
            <input
              type="number"
              value={convertValue(books)}
              onChange={(e) => handleChange(setBooks, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Heart className="w-4 h-4 mr-2 text-pink-600" />
              {t.calculator?.misc || 'Miscellaneous (per month)'}
            </label>
            <input
              type="number"
              value={convertValue(misc)}
              onChange={(e) => handleChange(setMisc, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 h-fit sticky top-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{t.calculator?.summary || 'Cost Summary'}</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-700">
              <span>{t.calculator?.monthlyTotal || 'Monthly Total'}</span>
              <span className="font-semibold">{formatMoney(housing + food + transport + books + misc)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{t.calculator?.semesterTuition || 'Semester Tuition'}</span>
              <span className="font-semibold">{formatMoney(tuition)}</span>
            </div>
            <div className="h-px bg-gray-300"></div>
            <div className="flex justify-between text-gray-900 text-lg font-bold">
              <span>{t.calculator?.semesterTotal || 'Semester Total (6 months)'}</span>
              <span className="text-blue-600">{formatMoney(total * 6 + tuition)}</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-3">{t.calculator?.breakdown || 'Monthly Breakdown'}</h4>
            <div className="space-y-2">
              {[
                { label: t.calculator?.housing || 'Housing', value: housing, color: 'bg-blue-500' },
                { label: t.calculator?.food || 'Food', value: food, color: 'bg-green-500' },
                { label: t.calculator?.transport || 'Transport', value: transport, color: 'bg-yellow-500' },
                { label: t.calculator?.books || 'Books', value: books, color: 'bg-red-500' },
                { label: t.calculator?.misc || 'Misc', value: misc, color: 'bg-pink-500' },
              ].map((item) => {
                const monthlyTotal = housing + food + transport + books + misc;
                const percentage = monthlyTotal > 0 ? (item.value / monthlyTotal) * 100 : 0;
                return (
                  <div key={item.label} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{item.label}</span>
                        <span>{percentage.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} transition-all duration-300`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-800">
              💡 {t.calculator?.tip || 'Tip: These are estimated costs. Actual expenses may vary based on lifestyle and location.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
