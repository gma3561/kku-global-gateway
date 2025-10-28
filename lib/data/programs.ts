export interface Program {
  id: number;
  title: string;
  level: 'bachelor' | 'master' | 'doctoral';
  duration: string;
  tuition: number;
  language: 'korean' | 'english' | 'both';
  description: string;
  features: string[];
}

export const programs: Program[] = [
  {
    id: 1,
    title: 'Business Administration',
    level: 'bachelor',
    duration: '4 years',
    tuition: 3000000,
    language: 'both',
    description: 'Comprehensive business education with focus on global markets and entrepreneurship.',
    features: ['International Business', 'Marketing', 'Finance', 'Entrepreneurship'],
  },
  {
    id: 2,
    title: 'Computer Science',
    level: 'bachelor',
    duration: '4 years',
    tuition: 3500000,
    language: 'english',
    description: 'Cutting-edge technology education with hands-on programming and AI focus.',
    features: ['AI & Machine Learning', 'Software Engineering', 'Data Science', 'Cybersecurity'],
  },
  {
    id: 3,
    title: 'International Relations',
    level: 'bachelor',
    duration: '4 years',
    tuition: 2800000,
    language: 'both',
    description: 'Study global politics, diplomacy, and international cooperation.',
    features: ['Diplomacy', 'Global Politics', 'International Law', 'Area Studies'],
  },
  {
    id: 4,
    title: 'Mechanical Engineering',
    level: 'bachelor',
    duration: '4 years',
    tuition: 3200000,
    language: 'korean',
    description: 'Advanced engineering education with strong industry connections.',
    features: ['Robotics', 'Manufacturing', 'CAD/CAM', 'Industrial Design'],
  },
  {
    id: 5,
    title: 'Korean Language & Culture',
    level: 'bachelor',
    duration: '4 years',
    tuition: 2500000,
    language: 'korean',
    description: 'Immersive study of Korean language, history, and culture.',
    features: ['Language Studies', 'Korean History', 'K-Culture', 'Translation'],
  },
  {
    id: 6,
    title: 'MBA (Master of Business Administration)',
    level: 'master',
    duration: '2 years',
    tuition: 5000000,
    language: 'english',
    description: 'Executive MBA program for experienced professionals.',
    features: ['Leadership', 'Strategic Management', 'Global Business', 'Innovation'],
  },
  {
    id: 7,
    title: 'Data Science',
    level: 'master',
    duration: '2 years',
    tuition: 4500000,
    language: 'english',
    description: 'Advanced data analytics and machine learning program.',
    features: ['Big Data', 'Machine Learning', 'Data Visualization', 'Statistical Analysis'],
  },
  {
    id: 8,
    title: 'International Development',
    level: 'master',
    duration: '2 years',
    tuition: 4000000,
    language: 'english',
    description: 'Graduate program focused on sustainable development and global cooperation.',
    features: ['Sustainable Development', 'Policy Analysis', 'Project Management', 'Research Methods'],
  },
  {
    id: 9,
    title: 'Computer Engineering (Ph.D.)',
    level: 'doctoral',
    duration: '3-4 years',
    tuition: 4000000,
    language: 'english',
    description: 'Research-focused doctoral program in cutting-edge computing.',
    features: ['Advanced AI', 'Quantum Computing', 'Research', 'Publications'],
  },
  {
    id: 10,
    title: 'Business Strategy (Ph.D.)',
    level: 'doctoral',
    duration: '3-4 years',
    tuition: 4500000,
    language: 'english',
    description: 'Doctoral research in business strategy and organizational behavior.',
    features: ['Strategic Research', 'Organizational Theory', 'Academic Publishing', 'Teaching'],
  },
];
