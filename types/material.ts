export type MaterialLevel = 'pre-A1' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface Material {
  id: string;
  name: string;
  level: MaterialLevel;
  tags: string[];
  description: string;
  createdAt: Date;
}

export const MATERIAL_LEVELS: MaterialLevel[] = ['pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1'];
