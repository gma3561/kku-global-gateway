const fs = require('fs');
const path = require('path');

const langs = ['vi', 'ru', 'uz', 'tl', 'th', 'ms', 'kk'];

langs.forEach(lang => {
  const filePath = path.join(__dirname, '..', 'lib', 'i18n', 'translations', `${lang}.ts`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add missing nav items
  content = content.replace(
    /nav: \{([^}]+)dashboard: [^,]+,\n([^}]+)logout: [^,]+,\n  \},/,
    `nav: {
    home: 'Home',
    preparation: 'Preparation',
    arrival: 'Arrival',
    campusLife: 'Campus Life',
    dashboard: 'Dashboard',
    findProgram: 'Find Program',
    admissionGuide: 'Admission Guide',
    costsScholarships: 'Costs & Scholarships',
    studentStories: 'Student Stories',
    koreaInfo: 'Living in Korea',
    applyNow: 'Apply Now',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
  },`
  );
  
  // Add new sections before footer
  content = content.replace(
    /(scheduleConsultation: [^,]+,)\n  \},\n  footer:/,
    `$1
    needHelp: 'Need Help?',
  },
  preparation: {
    title: 'Study Abroad Preparation',
    description: 'Step-by-step preparation guide for KKU',
    visa: { title: 'Visa Application', description: 'Student visa application process and required documents' },
    documents: { title: 'Required Documents', description: 'Essential documents for admission and visa' },
    accommodation: { title: 'Accommodation', description: 'Dormitory and housing options' },
    travel: { title: 'Flight & Travel', description: 'Flight booking and travel preparation' },
    checklist: { title: 'Pre-Departure Checklist' },
  },
  arrival: {
    title: 'After Arrival',
    description: 'First week and first month checklist after arriving in Thailand',
    firstWeek: { title: 'First Week (Days 1-7)' },
    firstMonth: { title: 'First Month (Days 1-30)' },
  },
  campusLife: {
    title: 'Campus Life',
    description: 'Academic life, activities, and growth at KKU',
    academics: { title: 'Academic Management' },
    facilities: { title: 'Campus Facilities' },
    activities: { title: 'Student Activities' },
  },
  dashboard: {
    title: 'My Dashboard',
    description: 'Study abroad preparation and campus life progress',
  },
  footer:`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Updated ${lang}.ts`);
});

console.log('\n✅ All translation files updated!');
