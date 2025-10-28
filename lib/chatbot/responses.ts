import { Locale } from '../i18n/config';

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  ko: string;
  en: string;
}

// 키워드 기반 응답 시스템
export const responses: Record<string, ChatResponse> = {
  // 입학 관련
  admissions: {
    ko: '입학 절차는 다음과 같습니다:\n\n1. 온라인 지원서 작성\n2. 필요 서류 제출 (성적증명서, 졸업증명서, 추천서)\n3. 서류 심사\n4. 합격 통지\n5. 등록금 납부\n6. 비자 신청\n\n자세한 내용은 입학 안내 페이지를 확인해주세요.',
    en: 'The admission process is as follows:\n\n1. Complete online application\n2. Submit required documents (transcripts, diploma, recommendation letters)\n3. Document review\n4. Admission notification\n5. Tuition payment\n6. Visa application\n\nPlease check our Admission Guide page for more details.',
  },
  application: {
    ko: '지원서는 온라인으로 제출하실 수 있습니다. 필요한 서류는:\n\n• 고등학교/대학교 졸업증명서\n• 성적증명서\n• 영어 능력 증명서 (TOEFL/IELTS)\n• 자기소개서\n• 추천서 2부\n\n지원 마감일은 학기 시작 3개월 전입니다.',
    en: 'You can submit your application online. Required documents include:\n\n• High school/university diploma\n• Academic transcripts\n• English proficiency test (TOEFL/IELTS)\n• Personal statement\n• 2 recommendation letters\n\nApplication deadline is 3 months before semester starts.',
  },

  // 장학금 관련
  scholarships: {
    ko: '경국대학교는 다양한 장학금을 제공합니다:\n\n🏆 성적우수 장학금: 등록금의 50-100%\n🌏 국가별 특별 장학금: 등록금의 30-50%\n💼 근로 장학금: 월 50-100만원\n📚 학업 장려 장학금: 학기당 200-500만원\n\n자세한 정보는 장학금 페이지에서 확인하세요.',
    en: 'Kyungkuk University offers various scholarships:\n\n🏆 Merit-based scholarship: 50-100% tuition\n🌏 Country-specific scholarship: 30-50% tuition\n💼 Work-study program: ₩500K-1M/month\n📚 Academic excellence award: ₩2-5M/semester\n\nCheck our Scholarships page for details.',
  },
  tuition: {
    ko: '학비는 전공에 따라 다릅니다:\n\n• 인문사회: 학기당 약 300만원\n• 자연과학: 학기당 약 350만원\n• 공학: 학기당 약 400만원\n• 의학: 학기당 약 500만원\n\n생활비는 월 70-100만원 정도 예상하시면 됩니다.',
    en: 'Tuition varies by major:\n\n• Humanities/Social Sciences: ~₩3M/semester\n• Natural Sciences: ~₩3.5M/semester\n• Engineering: ~₩4M/semester\n• Medicine: ~₩5M/semester\n\nLiving expenses are approximately ₩700K-1M/month.',
  },

  // 프로그램 관련
  programs: {
    ko: '인기 프로그램:\n\n🎓 학부 (4년)\n• 경영학\n• 컴퓨터공학\n• 국제관계학\n• 한국학\n\n📚 대학원 (2-3년)\n• MBA\n• 공학석사\n• 국제학석사\n\n수업 언어: 한국어 또는 영어',
    en: 'Popular Programs:\n\n🎓 Undergraduate (4 years)\n• Business Administration\n• Computer Science\n• International Relations\n• Korean Studies\n\n📚 Graduate (2-3 years)\n• MBA\n• Engineering\n• International Studies\n\nLanguage: Korean or English',
  },
  english: {
    ko: '영어로 진행되는 프로그램:\n\n• Global MBA\n• International Business\n• Computer Science (일부)\n• Engineering (일부)\n\n대부분의 프로그램은 한국어와 영어를 병행합니다. 한국어 능력이 부족한 경우 영어 트랙을 선택할 수 있습니다.',
    en: 'Programs taught in English:\n\n• Global MBA\n• International Business\n• Computer Science (partial)\n• Engineering (partial)\n\nMost programs offer both Korean and English tracks. Students with limited Korean can choose English-taught courses.',
  },

  // 비자 관련
  visa: {
    ko: '학생 비자(D-2) 신청 절차:\n\n1. 입학 허가서 발급\n2. 표준입학허가서 발급\n3. 본국 한국 대사관/영사관 방문\n4. 비자 신청 및 인터뷰\n5. 비자 발급 (약 2주 소요)\n\n입국 후 90일 이내 외국인등록증을 발급받으셔야 합니다.',
    en: 'Student Visa (D-2) Application Process:\n\n1. Receive admission letter\n2. Get Certificate of Admission\n3. Visit Korean Embassy/Consulate\n4. Apply for visa and interview\n5. Visa issuance (~2 weeks)\n\nYou must register as a foreigner within 90 days of arrival.',
  },
  documents: {
    ko: '비자 신청 필요 서류:\n\n• 입학허가서\n• 표준입학허가서\n• 여권\n• 증명사진\n• 재정증명서\n• 건강진단서\n• 범죄경력증명서\n\n국가별로 추가 서류가 필요할 수 있습니다.',
    en: 'Required documents for visa:\n\n• Admission letter\n• Certificate of Admission\n• Passport\n• Photos\n• Financial proof\n• Health certificate\n• Criminal record check\n\nAdditional documents may be required by country.',
  },

  // 캠퍼스 생활
  campus: {
    ko: '캠퍼스 생활 정보:\n\n🏠 기숙사: 1인실/2인실/4인실 선택 가능\n🍽️ 식당: 한식, 양식, 할랄 식당 운영\n📚 도서관: 24시간 개방\n💪 체육관: 최신 시설 완비\n🎭 동아리: 100개 이상\n\n국제 학생 전용 라운지와 기도실도 있습니다.',
    en: 'Campus Life Information:\n\n🏠 Dormitory: Single/double/quad rooms\n🍽️ Cafeteria: Korean, Western, Halal food\n📚 Library: Open 24/7\n💪 Gym: State-of-the-art facilities\n🎭 Clubs: 100+ options\n\nInternational student lounge and prayer room available.',
  },
  housing: {
    ko: '주거 옵션:\n\n🏢 기숙사 (권장)\n• 캠퍼스 내 위치\n• 월 30-50만원\n• 인터넷, 난방 포함\n\n🏘️ 오프캠퍼스\n• 원룸: 월 40-70만원\n• 셰어하우스: 월 30-50만원\n\n기숙사 신청은 입학 확정 후 가능합니다.',
    en: 'Housing Options:\n\n🏢 On-campus Dormitory (Recommended)\n• Campus location\n• ₩300-500K/month\n• Internet, heating included\n\n🏘️ Off-campus\n• Studio: ₩400-700K/month\n• Share house: ₩300-500K/month\n\nDormitory application opens after admission.',
  },

  // 한국 생활
  korea: {
    ko: '한국 생활 정보:\n\n🌡️ 기후: 사계절이 뚜렷\n🚇 교통: 지하철/버스 편리\n💳 생활비: 월 70-100만원\n🏥 의료보험: 의무 가입\n📱 통신: 주요 통신사 3곳\n\n한국어를 배우시면 생활이 더 편리합니다.',
    en: 'Living in Korea:\n\n🌡️ Climate: Four distinct seasons\n🚇 Transport: Convenient subway/bus\n💳 Living costs: ₩700K-1M/month\n🏥 Health insurance: Mandatory\n📱 Mobile: 3 major carriers\n\nLearning Korean will make life easier.',
  },

  // 언어
  language: {
    ko: '한국어 학습:\n\n📖 무료 한국어 수업 제공\n• 초급, 중급, 고급 레벨\n• 주 2-3회, 2시간\n• 학기 중 진행\n\n🎓 TOPIK 준비 과정\n• 시험 대비반 운영\n• 모의고사 제공\n\n언어 교환 프로그램도 있습니다.',
    en: 'Korean Language Learning:\n\n📖 Free Korean classes\n• Beginner, intermediate, advanced\n• 2-3 times/week, 2 hours\n• During semester\n\n🎓 TOPIK Preparation\n• Test prep courses\n• Mock exams\n\nLanguage exchange program available.',
  },

  // 연락처
  contact: {
    ko: '연락처 정보:\n\n📧 이메일: global@kku.ac.kr\n📞 전화: +82-2-1234-5678\n💬 카카오톡: @kkuglobal\n🌐 웹사이트: www.kku.ac.kr/global\n\n운영 시간: 평일 9:00-18:00 (한국 시간)\n\n긴급 상황: +82-10-1234-5678',
    en: 'Contact Information:\n\n📧 Email: global@kku.ac.kr\n📞 Phone: +82-2-1234-5678\n💬 KakaoTalk: @kkuglobal\n🌐 Website: www.kku.ac.kr/global\n\nOffice Hours: Weekdays 9:00-18:00 (KST)\n\nEmergency: +82-10-1234-5678',
  },

  // 기본 응답
  default: {
    ko: '죄송합니다. 정확한 답변을 찾지 못했습니다.\n\n자주 묻는 질문:\n• 입학 절차\n• 장학금 정보\n• 프로그램 안내\n• 비자 정보\n• 캠퍼스 생활\n\n더 자세한 상담이 필요하시면 global@kku.ac.kr로 문의해주세요.',
    en: 'Sorry, I couldn\'t find an exact answer.\n\nFrequently asked topics:\n• Admission process\n• Scholarship information\n• Program guide\n• Visa information\n• Campus life\n\nFor detailed consultation, please contact global@kku.ac.kr',
  },
};

// 키워드 매칭 함수
export function findResponse(message: string, locale: Locale = 'ko'): string {
  const lowerMessage = message.toLowerCase();

  // 키워드 매칭 규칙
  const keywords: Record<string, string[]> = {
    admissions: ['입학', '지원', 'admission', 'apply', 'application', '신청'],
    scholarships: ['장학금', 'scholarship', '학비', 'tuition', '비용', 'cost', '돈', 'money'],
    programs: ['프로그램', 'program', '전공', 'major', '학과', 'department', '과정', 'course'],
    english: ['영어', 'english', '수업', 'class', 'language'],
    visa: ['비자', 'visa', 'immigration', '이민'],
    documents: ['서류', 'document', '증명서', 'certificate'],
    campus: ['캠퍼스', 'campus', '생활', 'life', '시설', 'facility'],
    housing: ['기숙사', 'dormitory', 'housing', '숙소', 'accommodation'],
    korea: ['한국', 'korea', '생활', 'living', '문화', 'culture'],
    language: ['한국어', 'korean language', 'topik', '배우', 'learn'],
    contact: ['연락', 'contact', '전화', 'phone', '이메일', 'email'],
  };

  // 키워드 매칭
  for (const [key, words] of Object.entries(keywords)) {
    if (words.some(word => lowerMessage.includes(word))) {
      const response = responses[key as keyof typeof responses];
      if (!response) continue;
      return response[locale as keyof ChatResponse] || response.en;
    }
  }

  // 기본 응답
  const defaultResponse = responses.default;
  return defaultResponse[locale as keyof ChatResponse] || defaultResponse.en;
}

// 빠른 답변 매핑
export function getQuickReplyResponse(quickReply: string, locale: Locale = 'ko'): string {
  const mapping: Record<string, string> = {
    admissions: 'admissions',
    scholarships: 'scholarships',
    programs: 'programs',
    visa: 'visa',
    campus: 'campus',
  };

  const responseKey = mapping[quickReply] || 'default';
  const response = responses[responseKey as keyof typeof responses];
  return response[locale as keyof ChatResponse] || response.en;
}
