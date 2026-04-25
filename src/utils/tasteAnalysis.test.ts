import { describe, it, expect } from 'vitest';
import { deriveHighlights, getRecommendedCuisines } from './tasteAnalysis';
import type { Food, Cuisine } from '../types';

// ── Test helpers ──────────────────────────────────────────────────────────────

const makeFood = (overrides: Partial<Food> & { id: number; name: string }): Food => ({
  image: '',
  category: 'other',
  tags: [],
  ...overrides,
});

const CUISINES: Cuisine[] = [
  { id: 1, name: 'Italian',        emoji: '🇮🇹', description: '' },
  { id: 2, name: 'Mexican',        emoji: '🇲🇽', description: '' },
  { id: 3, name: 'Japanese',       emoji: '🇯🇵', description: '' },
  { id: 4, name: 'Mediterranean',  emoji: '🫒',  description: '' },
  { id: 5, name: 'American',       emoji: '🇺🇸', description: '' },
];

// ── deriveHighlights ─────────────────────────────────────────────────────────

describe('deriveHighlights', () => {
  it('returns empty array when no foods are liked', () => {
    expect(deriveHighlights([])).toEqual([]);
  });

  it('returns "Carnivore" when 3+ proteins are liked', () => {
    const proteins = [
      makeFood({ id: 1, name: 'Salmon',  category: 'protein', tags: ['protein'] }),
      makeFood({ id: 2, name: 'Chicken', category: 'protein', tags: ['protein'] }),
      makeFood({ id: 3, name: 'Steak',   category: 'protein', tags: ['protein'] }),
    ];
    const result = deriveHighlights(proteins);
    expect(result.some((h) => h.label === 'Carnivore')).toBe(true);
  });

  it('returns "Veggie-Lover" when 3+ vegetables are liked', () => {
    const vegs = [
      makeFood({ id: 13, name: 'Broccoli', category: 'vegetable', tags: ['vegetable'] }),
      makeFood({ id: 14, name: 'Spinach',  category: 'vegetable', tags: ['vegetable'] }),
      makeFood({ id: 15, name: 'Kale',     category: 'vegetable', tags: ['vegetable'] }),
    ];
    const result = deriveHighlights(vegs);
    expect(result.some((h) => h.label === 'Veggie-Lover')).toBe(true);
  });

  it('returns "Italian Food" when liked foods include italian tags', () => {
    const foods = [
      makeFood({ id: 8, name: 'Pasta', tags: ['italian'] }),
    ];
    const result = deriveHighlights(foods);
    expect(result.some((h) => h.label === 'Italian Food')).toBe(true);
  });

  it('returns "Health-Conscious" when 2+ healthy tags exist', () => {
    const foods = [
      makeFood({ id: 10, name: 'Quinoa',  tags: ['healthy'] }),
      makeFood({ id: 11, name: 'Oatmeal', tags: ['healthy'] }),
    ];
    const result = deriveHighlights(foods);
    expect(result.some((h) => h.label === 'Health-Conscious')).toBe(true);
  });

  it('caps highlights at 3', () => {
    const foods = [
      makeFood({ id: 1, name: 'Salmon',  category: 'protein', tags: ['protein'] }),
      makeFood({ id: 2, name: 'Chicken', category: 'protein', tags: ['protein'] }),
      makeFood({ id: 3, name: 'Steak',   category: 'protein', tags: ['protein', 'italian'] }),
      makeFood({ id: 13, name: 'Broccoli', category: 'vegetable', tags: ['vegetable', 'healthy'] }),
      makeFood({ id: 14, name: 'Spinach',  category: 'vegetable', tags: ['vegetable', 'healthy'] }),
      makeFood({ id: 15, name: 'Kale',     category: 'vegetable', tags: ['vegetable', 'japanese'] }),
    ];
    const result = deriveHighlights(foods);
    expect(result.length).toBeLessThanOrEqual(3);
  });
});

// ── getRecommendedCuisines ───────────────────────────────────────────────────

describe('getRecommendedCuisines', () => {
  it('returns empty when no foods are liked', () => {
    expect(getRecommendedCuisines([], CUISINES)).toEqual([]);
  });

  it('returns fallback cuisines when liked foods have no matching cuisine tags', () => {
    const foods = [
      makeFood({ id: 21, name: 'Greek Yogurt', tags: ['dairy', 'breakfast'] }),
      makeFood({ id: 22, name: 'Nuts',         tags: ['snack', 'fat'] }),
    ];
    const result = getRecommendedCuisines(foods, CUISINES);
    // Fallback returns up to 3 cuisines when nothing scores
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it('recommends Italian when liked foods have italian tag', () => {
    const foods = [makeFood({ id: 25, name: 'Pizza', tags: ['italian'] })];
    const result = getRecommendedCuisines(foods, CUISINES);
    expect(result.some((c) => c.name === 'Italian')).toBe(true);
  });

  it('recommends Japanese when liked foods have japanese tag', () => {
    const foods = [makeFood({ id: 24, name: 'Sushi', tags: ['japanese'] })];
    const result = getRecommendedCuisines(foods, CUISINES);
    expect(result.some((c) => c.name === 'Japanese')).toBe(true);
  });

  it('recommends American when liked foods have comfort tag', () => {
    const foods = [makeFood({ id: 27, name: 'Burger', tags: ['comfort'] })];
    const result = getRecommendedCuisines(foods, CUISINES);
    expect(result.some((c) => c.name === 'American')).toBe(true);
  });

  it('recommends Mediterranean for healthy-tagged foods', () => {
    const foods = [makeFood({ id: 10, name: 'Quinoa', tags: ['healthy'] })];
    const result = getRecommendedCuisines(foods, CUISINES);
    expect(result.some((c) => c.name === 'Mediterranean')).toBe(true);
  });

  it('caps recommendations at 4', () => {
    const foods = [
      makeFood({ id: 1, name: 'Salmon',  tags: ['protein', 'fish'] }),
      makeFood({ id: 8, name: 'Pasta',   tags: ['italian', 'comfort'] }),
      makeFood({ id: 24, name: 'Sushi',  tags: ['japanese'] }),
      makeFood({ id: 29, name: 'Tacos',  tags: ['mexican'] }),
      makeFood({ id: 10, name: 'Quinoa', tags: ['healthy'] }),
    ];
    const result = getRecommendedCuisines(foods, CUISINES);
    expect(result.length).toBeLessThanOrEqual(4);
  });
});
