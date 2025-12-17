export interface HealthMetrics {
  sleepHours: number; // 0-12+
  steps: number; // 0 - 20000+
  stressLevel: number; // 0-100 (HRV based proxy)
  lastUpdated: Date;
}

export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
  prepTime: string;
}

export interface InsightData {
  tips: string[];
  recipe: Recipe;
}

export interface ArtPiece {
  id: string;
  imageUrl: string;
  timestamp: Date;
  metricsSnapshot: HealthMetrics;
  promptUsed: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  GENERATE = 'GENERATE',
  GALLERY = 'GALLERY',
  SETTINGS = 'SETTINGS'
}