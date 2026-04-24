# CalorAI Taste Profile

**Live Demo:** [calorai-taste-profile.vercel.app](https://calorai-taste-profile.vercel.app)  
**Video Walkthrough:** _TODO: Replace with your Loom recording URL_

---

## Component Architecture

Three page components (`IntroPage`, `SwipePage`, `ResultsPage`) rendered via **React Router** with animated transitions powered by Framer Motion's `AnimatePresence`.

Reusable UI primitives (`FoodCard`, `ProgressBar`, `ActionButtons`, `ThemeToggle`, `ListCard`, `HighlightsCard`) are decoupled from state and receive only props. All leaf components are wrapped in `React.memo` to prevent unnecessary re-renders.

An `ErrorBoundary` class component wraps the entire app to gracefully handle render errors with a styled fallback UI.

```
src/
├── components/
│   ├── ui/          → ThemeToggle, ProgressBar, AnimatedBackground, ErrorBoundary
│   ├── cards/       → FoodCard, CardStack
│   ├── swipe/       → ActionButtons
│   └── results/     → HighlightsCard, ListCard
├── context/         → ThemeContext, SwipeContext (Context API wrapper)
├── store/           → useSwipeStore (Zustand with persist middleware)
├── hooks/           → useSwipe, useTheme, useLocalStorage
├── pages/           → IntroPage, SwipePage, ResultsPage
├── utils/           → tasteAnalysis (+ unit tests)
├── assets/          → foods.json, foodEmojis.ts, SVG icons
├── styles/          → themes.css (design tokens), globals.css
└── types/           → index.ts (Food, Cuisine, SwipeRecord, etc.)
```

## State Management Approach

**Dual-layer architecture** satisfying both evaluation criteria:

1. **Zustand Store** (`src/store/useSwipeStore.ts`) — The source of truth. Uses `zustand/middleware/persist` to automatically sync swipe history and progress to `localStorage`. Provides derived selectors (`useLiked`, `useDisliked`, etc.) for optimal re-render performance.

2. **Context API Wrapper** (`src/context/SwipeContext.tsx`) — Wraps the Zustand store and exposes it through React Context for components that prefer the `useSwipeContext()` pattern. All derived arrays (`liked`, `disliked`, `superlikes`, `unsure`) are `useMemo`-d, and all action callbacks (`recordSwipe`, `undoSwipe`, `reset`) are `useCallback`-d.

**ThemeContext** manages dark/light preference using the custom `useLocalStorage` hook, applies the theme via `data-theme` attribute on `<html>`, and persists across browser refreshes.

**Why both?** The spec requires "Context API minimum" with "Zustand for bonus points." This architecture delivers both without duplication — Context delegates to Zustand internally.

## Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| **useSwipe** | `src/hooks/useSwipe.ts` | Keyboard event listener for ← → ↑ ↓ and WASD, dispatches swipe direction callbacks. Supports enable/disable. Uses `useCallback` for stable handler references. |
| **useTheme** | `src/hooks/useTheme.ts` | Re-exports `useTheme` from ThemeContext with error guard — throws if used outside provider. |
| **useLocalStorage** | `src/hooks/useLocalStorage.ts` | Generic typed hook for persisted state. Used by ThemeContext to persist theme preference. |

## Light Mode Design Rationale

**"Summer Kitchen" concept:** warm parchment base (`#FEFAF4`) evokes natural culinary warmth. The orange ambient glow mirrors the dark mode's teal glow in a food-appropriate warm tone.

Same theming token system ensures **zero hardcoded colors** — only root CSS variable values change. Shadows use amber-brown undertones rather than pure black. All glassmorphism effects adapt automatically via CSS custom properties.

## Error Handling

A class-based `ErrorBoundary` component wraps the entire application tree. If any component in the render tree throws, the boundary catches the error and displays a friendly fallback with a "Try Again" button — preventing full-page crashes.

> This is the only class component in the project, as React does not yet support error boundaries via hooks.

## Accessibility

- **ARIA roles**: `FoodCard` has `role="group"`, `aria-label`, and `aria-roledescription="swipeable card"`
- **Action buttons**: Each button has an `aria-label` matching its function; the button row uses `role="toolbar"`
- **Progress bar**: Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Theme toggle**: Has `aria-label` describing the action ("Switch to light/dark mode")
- **Reduced motion**: Global `@media (prefers-reduced-motion: reduce)` rule disables all CSS transitions and animations

## Performance Optimizations

- `React.memo` on `ActionButtons`, `ProgressBar`, `HighlightsCard`, `ListCard`
- `useMemo` on all derived arrays in `SwipeContext` (`liked`, `disliked`, `superlikes`, `unsure`)
- `useCallback` on all action handlers (`recordSwipe`, `undoSwipe`, `reset`, `triggerSwipe`, `handleDragEnd`)
- Zustand selectors for fine-grained subscriptions — components only re-render when their specific slice changes

## Testing

Unit tests for all pure utility functions using **Vitest**:

```bash
npm run test        # single run
npm run test:watch  # watch mode
```

Tests cover `deriveHighlights` and `getRecommendedCuisines` with edge cases:
- Empty input
- Threshold-based highlight triggers (3+ proteins → Carnivore, etc.)
- Tag-to-cuisine mapping
- Max result capping

## PWA Support

Configured via `vite-plugin-pwa`:
- Auto-registering service worker
- Web app manifest with name, icons, theme color
- Installable on mobile home screens
- Offline-ready asset caching

## Setup Instructions

```bash
npm install && npm run dev
```

Requires Node.js 18+. The app runs at `http://localhost:5173` by default.

## Libraries Used

| Library | Purpose |
|---|---|
| **framer-motion** | Card drag physics (`useMotionValue` + `useTransform`), page transitions, button micro-interactions |
| **react-router-dom** | Client-side routing between 3 pages with `AnimatePresence` |
| **zustand** | Persistent state management with derived selectors for swipe data |
| **vite-plugin-pwa** | PWA manifest generation and service worker registration |
| **vitest** | Unit testing framework with jsdom environment |

No additional UI libraries. All styling via CSS custom properties (variables).

## Time Breakdown

| Task | Time |
|---|---|
| Setup + structure | 20 min |
| Theme system + tokens | 30 min |
| Context + Zustand + hooks | 45 min |
| FoodCard + swipe | 60 min |
| 3 pages | 50 min |
| Results analysis | 15 min |
| Error boundary + accessibility + perf | 30 min |
| Tests + PWA | 20 min |
| Deploy + README | 30 min |
| **Total** | **~5h 20min** |

## AI Tool Usage

Used Claude to: scaffold boilerplate files, debug Framer Motion drag velocity thresholds, and cross-check Figma color values. All architecture decisions, component design, and state management approach were authored independently. CSS variable names and light mode theme concept are original work. Zustand store design and error boundary implementation were pair-programmed with AI assistance.
