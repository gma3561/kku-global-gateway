'use client';

import { Phone, AlertCircle, Hospital, Building2, Shield } from 'lucide-react';

interface EmergencyContactsProps {
  locale: string;
}

const contacts = {
  ko: [
    { icon: AlertCircle, label: '응급전화 (112)', number: '112', category: '긴급' },
    { icon: Phone, label: '경찰 (112)', number: '112', category: '긴급' },
    { icon: Hospital, label: '화재/구급 (119)', number: '119', category: '긴급' },
    { icon: Building2, label: 'KKU 국제교류처', number: '02-450-3114', category: '학교' },
    { icon: Shield, label: '학생지원센터', number: '02-450-3500', category: '학교' },
    { icon: Phone, label: '외국인 종합안내센터', number: '1345', category: '지원' },
    { icon: Building2, label: 'Hi Korea (출입국)', number: '1345', category: '지원' },
    { icon: Hospital, label: '응급의료정보센터', number: '1339', category: '의료' },
  ],
  en: [
    { icon: AlertCircle, label: 'Emergency (112)', number: '112', category: 'Emergency' },
    { icon: Phone, label: 'Police (112)', number: '112', category: 'Emergency' },
    { icon: Hospital, label: 'Fire/Ambulance (119)', number: '119', category: 'Emergency' },
    { icon: Building2, label: 'KKU International Office', number: '02-450-3114', category: 'School' },
    { icon: Shield, label: 'Student Support Center', number: '02-450-3500', category: 'School' },
    { icon: Phone, label: 'Foreigner Help Center', number: '1345', category: 'Support' },
    { icon: Building2, label: 'Hi Korea (Immigration)', number: '1345', category: 'Support' },
    { icon: Hospital, label: 'Emergency Medical Info', number: '1339', category: 'Medical' },
  ],
};

export default function EmergencyContacts({ locale }: EmergencyContactsProps) {
  const contactList = locale === 'ko' ? contacts.ko : contacts.en;

  const handleCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-red-900 mb-6">
        {locale === 'ko' ? '긴급 연락처' : 'Emergency Contacts'}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {contactList.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <button
              key={index}
              onClick={() => handleCall(contact.number)}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:shadow-md ${
                contact.category === '긴급' || contact.category === 'Emergency'
                  ? 'bg-red-50 hover:bg-red-100 border-2 border-red-200'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className={`p-3 rounded-full ${
                contact.category === '긴급' || contact.category === 'Emergency'
                  ? 'bg-red-600'
                  : 'bg-indigo-600'
              }`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-gray-900">{contact.label}</div>
                <div className="text-sm text-gray-600">{contact.number}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-900">
          {locale === 'ko'
            ? '⚠️ 긴급 상황 시 112(경찰) 또는 119(화재/구급)로 즉시 연락하세요.'
            : '⚠️ In emergency, call 112 (Police) or 119 (Fire/Ambulance) immediately.'}
        </p>
      </div>
    </div>
  );
}
