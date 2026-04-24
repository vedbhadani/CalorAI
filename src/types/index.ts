export type SwipeDirection = 'like' | 'dislike' | 'superlike' | 'unsure';
export type Theme = 'dark' | 'light';

export interface Food {
  id: number;
  name: string;
  image: string;
  category: 'protein' | 'carb' | 'vegetable' | 'other';
  tags: string[];
}

export interface Cuisine {
  id: number;
  name: string;
  emoji: string;
  description: string;
}

export interface SwipeRecord {
  food: Food;
  direction: SwipeDirection;
  timestamp: number;
}
