# CalorAI Taste Profile

**Live Demo:** https://calorai-taste-profile.vercel.app  
**Video Walkthrough:** https://loom.com/share/your-video-id

---

## Component Architecture

Three page components (IntroPage, SwipePage, ResultsPage) rendered via React Router.
Reusable UI primitives (FoodCard, ProgressBar, ActionButtons, ThemeToggle, ListCard)
are decoupled from state and receive only props.

```
src/
├── components/
│   ├── ui/          → ThemeToggle, ProgressBar
│   ├── cards/       → FoodCard, CardStack
│   ├── swipe/       → ActionButtons
│   └── results/     → HighlightsCard, ListCard
├── context/         → ThemeContext, SwipeContext
├── hooks/           → useSwipe, useTheme, useLocalStorage
├── pages/           → IntroPage, SwipePage, ResultsPage
├── utils/           → tasteAnalysis
├── assets/          → foods.json, foodEmojis.ts
├── styles/          → themes.css, globals.css
└── types/           → index.ts
```

## State Management Approach

Two Context providers to separate concerns:
- **ThemeContext**: manages dark/light preference, persisted to localStorage, applies via `data-theme` attribute on `<html>`
- **SwipeContext**: manages food queue, swipe history, liked/disliked/superlike/unsure arrays, undo, reset

Context was chosen over Zustand for explicitness at this scale. Both providers are
independent and compose cleanly in App.tsx.

## Custom Hooks

- **useSwipe**: keyboard event listener for ← → ↑ ↓ and WASD, dispatches swipe direction callbacks. Supports enable/disable.
- **useTheme**: consumes ThemeContext with error guard — throws if used outside provider
- **useLocalStorage**: generic typed hook for persisted state across browser refreshes

## Light Mode Design Rationale

"Summer Kitchen" concept: warm parchment base (`#FEFAF4`) to evoke natural culinary warmth.
The orange ambient glow mirrors the dark mode's teal glow in a food-appropriate warm tone.
Same theming token system ensures zero hardcoded colors — only root CSS variable values change.
Shadows use amber-brown undertones rather than pure black.

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

No additional UI libraries. All styling via CSS custom properties (variables).

## Time Breakdown

| Task | Time |
|---|---|
| Setup + structure | 20 min |
| Theme system + tokens | 30 min |
| Context + hooks | 35 min |
| FoodCard + swipe | 60 min |
| 3 pages | 50 min |
| Results analysis | 15 min |
| Deploy + README | 30 min |
| **Total** | **~4h 10min** |

## AI Tool Usage

Used Claude to: scaffold boilerplate files, debug Framer Motion drag velocity thresholds,
and cross-check Figma color values. All architecture decisions, component design,
and state management approach were authored independently. CSS variable names and
light mode theme concept are original work.

## Screenshots

| Dark Mode | Light Mode |
|---|---|
| ![Dark mode intro](screenshots/dark-intro.png) | ![Light mode intro](screenshots/light-intro.png) |
| ![Dark mode swipe](screenshots/dark-swipe.png) | ![Light mode swipe](screenshots/light-swipe.png) |
| ![Dark mode results](screenshots/dark-results.png) | ![Light mode results](screenshots/light-results.png) |
