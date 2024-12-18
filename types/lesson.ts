export type LessonLevel = 'pre-A1' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface Lesson {
  id: string;
  name: string;
  level: LessonLevel;
  tags: string[];
  description: string;
  createdAt: Date;
}

export const LESSON_LEVELS: LessonLevel[] = ['pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1'];