'use client';

import { useState, useRef, useEffect } from 'react';
import { Translation } from '@/lib/i18n/translations/ko';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Minimize2, Send } from 'lucide-react';
import { ChatMessage, findResponse, getQuickReplyResponse } from '@/lib/chatbot/responses';
import { Locale } from '@/lib/i18n/config';

interface ChatBotProps {
  t: Translation;
  locale: Locale;
}

export default function ChatBot({ t, locale }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 초기 환영 메시지
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        text: t.chatbot.greeting,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, t.chatbot.greeting]);

  // 메시지 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // 봇 응답 시뮬레이션 (1-2초 딜레이)
    setTimeout(() => {
      const response = findResponse(input, locale);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (quickReply: string) => {
    const response = getQuickReplyResponse(quickReply, locale);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: t.chatbot.quickReplies[quickReply as keyof typeof t.chatbot.quickReplies],
      isBot: false,
      timestamp: new Date(),
    };

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: response,
      isBot: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full shadow-2xl flex items-center justify-center text-white z-50 hover:shadow-blue-500/50 transition-shadow"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 채팅 창 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 60 : 600
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* 헤더 */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">{t.chatbot.title}</h3>
                  <p className="text-xs text-blue-100">{t.chatbot.subtitle}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                  aria-label={t.chatbot.minimize}
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                  aria-label={t.chatbot.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* 메시지 영역 */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.isBot
                            ? 'bg-white text-gray-800 shadow-md'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className="text-xs mt-1 opacity-60">
                          {message.timestamp.toLocaleTimeString(locale, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* 타이핑 인디케이터 */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white rounded-2xl px-4 py-3 shadow-md">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* 빠른 답변 (첫 메시지 후에만 표시) */}
                {messages.length === 1 && (
                  <div className="px-4 py-2 bg-white border-t flex gap-2 flex-wrap">
                    {Object.keys(t.chatbot.quickReplies).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleQuickReply(key)}
                        className="px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full transition-colors"
                      >
                        {t.chatbot.quickReplies[key as keyof typeof t.chatbot.quickReplies]}
                      </button>
                    ))}
                  </div>
                )}

                {/* 입력 영역 */}
                <div className="p-4 bg-white border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t.chatbot.placeholder}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
