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
  // Explicit early return for empty input — no preferences, no recommendations
  if (liked.length === 0) return [];

  const likedTags = new Set(liked.flatMap(f => f.tags));

  const cuisineTags: Record<string, string[]> = {
    'Italian':       ['italian', 'pasta', 'pizza'],
    'Mexican':       ['mexican', 'tacos'],
    'Japanese':      ['japanese', 'sushi', 'ramen', 'fish'],
    'Mediterranean': ['healthy', 'salad', 'fish', 'vegetable'],
    'American':      ['comfort', 'burger', 'steak', 'red-meat', 'protein'],
  };

  // Score each cuisine by how many of its tags appear in liked foods
  const scored = cuisines.map(c => {
    const matchTags = cuisineTags[c.name] ?? [c.name.toLowerCase()];
    const score = matchTags.filter(tag => likedTags.has(tag)).length;
    return { cuisine: c, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // If no cuisine matched at all, return top 3 as a graceful fallback
  const hasAnyMatch = scored.some(s => s.score > 0);
  if (!hasAnyMatch) {
    return cuisines.slice(0, 3);
  }

  // Otherwise return only matched cuisines, capped at 4
  return scored
    .filter(s => s.score > 0)
    .map(s => s.cuisine)
    .slice(0, 4);
};

export const deriveLifestyleGoals = (liked: Food[]): string[] => {
  const allTags = new Set(liked.flatMap(f => f.tags));
  const goals: string[] = [];

  if (allTags.has('healthy'))    goals.push('Health-Conscious');
  if (allTags.has('protein'))    goals.push('High Protein');
  if (allTags.has('breakfast'))  goals.push('Breakfast Lover');
  if (allTags.has('vegan'))      goals.push('Plant-Based');
  if (allTags.has('fish'))       goals.push('Pescatarian');
  if (allTags.has('red-meat'))   goals.push('Meat Lover');
  if (allTags.has('indulgent'))  goals.push('Comfort Eater');
  if (allTags.has('comfort'))    goals.push('Comfort Food Fan');

  // Always show at least 2 items — fallback if no tags match
  if (goals.length === 0) {
    goals.push('Balanced Diet', 'Open to Everything');
  }

  return goals.slice(0, 4); // Cap at 4 items
};
