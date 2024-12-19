export type MaterialLevel = 'pre-A1' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface Material {
  id: string;
  name: string;
  content: any,
  level: MaterialLevel;
  tags: string[];
  description: string;
  createdAt: string;
}

export const MATERIAL_LEVELS: MaterialLevel[] = ['pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1'];
