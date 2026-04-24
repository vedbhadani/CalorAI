import type { Food, Cuisine } from '../types';

export const deriveHighlights = (liked: Food[]) => {
  const highlights: { emoji: string; label: string }[] = [];

  if (liked.filter(f => f.category === 'protein').length >= 3)
    highlights.push({ emoji: '🥩', label: 'Carnivore' });
  if (liked.filter(f => f.category === 'vegetable').length >= 3)
    highlights.push({ emoji: '🥗', label: 'Veggie-Lover' });

  const allTags = liked.flatMap(f => f.tags);
  const tagCount = allTags.reduce<Record<string, number>>((acc, t) => {
    acc[t] = (acc[t] ?? 0) + 1; return acc;
  }, {});

  if (tagCount['italian'])    highlights.push({ emoji: '🇮🇹', label: 'Italian Food' });
  if (tagCount['japanese'])   highlights.push({ emoji: '🇯🇵', label: 'Japanese Food' });
  if (tagCount['mexican'])    highlights.push({ emoji: '🇲🇽', label: 'Mexican Food' });
  if (tagCount['healthy'] >= 2) highlights.push({ emoji: '🥗', label: 'Health-Conscious' });
  if (tagCount['fruit'])      highlights.push({ emoji: '🍇', label: 'Fruit-Lover' });
  if (tagCount['indulgent'] >= 2) highlights.push({ emoji: '🍕', label: 'Comfort-Lover' });

  return highlights.slice(0, 3); // Figma shows max 3
};

export const getRecommendedCuisines = (liked: Food[], cuisines: Cuisine[]) => {
  const likedTags = new Set(liked.flatMap(f => f.tags));
  
  const cuisineTags: Record<string, string[]> = {
    'Italian': ['italian', 'pasta', 'pizza'],
    'Mexican': ['mexican', 'tacos'],
    'Japanese': ['japanese', 'sushi', 'ramen', 'fish'],
    'Mediterranean': ['healthy', 'salad', 'fish', 'vegetable'],
    'American': ['comfort', 'burger', 'steak', 'red-meat', 'protein']
  };

  return cuisines
    .filter(c => {
      const matchTags = cuisineTags[c.name] || [c.name.toLowerCase()];
      return matchTags.some(tag => likedTags.has(tag));
    })
    .slice(0, 4);
};
