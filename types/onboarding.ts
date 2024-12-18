export type Language = {
  code: string;
  name: string;
};

export type Subject = {
  id: string;
  name: string;
  category: string;
};

export type TeachingStyle = {
  id: string;
  name: string;
  description: string;
};

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
];

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', category: 'Science' },
  { id: 'physics', name: 'Physics', category: 'Science' },
  { id: 'chemistry', name: 'Chemistry', category: 'Science' },
  { id: 'biology', name: 'Biology', category: 'Science' },
  { id: 'literature', name: 'Literature', category: 'Arts' },
  { id: 'history', name: 'History', category: 'Humanities' },
  { id: 'programming', name: 'Programming', category: 'Technology' },
  { id: 'music', name: 'Music', category: 'Arts' },
];

export const TEACHING_STYLES: TeachingStyle[] = [
  {
    id: 'visual',
    name: 'Visual Learning',
    description: 'Using diagrams, charts, and visual aids to explain concepts',
  },
  {
    id: 'interactive',
    name: 'Interactive Learning',
    description: 'Engaging through discussions and hands-on activities',
  },
  {
    id: 'structured',
    name: 'Structured Learning',
    description: 'Following a systematic, step-by-step approach',
  },
  {
    id: 'practical',
    name: 'Practical Application',
    description: 'Focusing on real-world examples and applications',
  },
];