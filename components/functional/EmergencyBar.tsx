'use client';

import { Phone, MessageCircle, AlertCircle } from 'lucide-react';

interface EmergencyBarProps {
  t: any;
}

export default function EmergencyBar({ t }: EmergencyBarProps) {
  const emergencyContacts = [
    {
      name: t.emergency?.contacts?.campus || 'Campus Security',
      number: '02-2600-2000',
      icon: <AlertCircle className="w-5 h-5" />,
      type: 'urgent' as const,
    },
    {
      name: t.emergency?.contacts?.international || 'International Office',
      number: '02-2600-2100',
      icon: <Phone className="w-5 h-5" />,
      type: 'normal' as const,
    },
    {
      name: t.emergency?.contacts?.support || '24/7 Student Support',
      number: '02-2600-2200',
      icon: <MessageCircle className="w-5 h-5" />,
      type: 'support' as const,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-3 px-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 animate-pulse" />
            <span className="font-bold text-lg">{t.emergency?.title || 'Emergency Contacts'}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {emergencyContacts.map((contact, index) => (
              <a
                key={index}
                href={`tel:${contact.number.replace(/-/g, '')}`}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  contact.type === 'urgent'
                    ? 'bg-white text-red-600 hover:bg-gray-100'
                    : contact.type === 'normal'
                    ? 'bg-red-700 hover:bg-red-800'
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
              >
                {contact.icon}
                <div className="text-left">
                  <div className="text-xs opacity-90">{contact.name}</div>
                  <div className="text-sm font-bold">{contact.number}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
