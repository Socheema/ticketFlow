# ticketFlow

Lightweight ticket management UI built with Vue 3, Vite, TypeScript and Tailwind CSS.

This repository contains a frontend application scaffolded to run locally with a dev server.
It includes a small component library (in `components/ui`), Pinia stores, routing, a theme (dark/light) toggle, and Sonner-based toast notifications.

---

## Quick start

Prerequisites:

- Node.js 16+ (or compatible LTS) and npm installed
- Git (optional)

Clone and install:

```bash
git clone <repo-url> ticketFlow
cd ticketFlow
npm install
```

Run the dev server:

```bash
npx tsc --noEmit   # quick type-check (optional, helpful before dev)
npm run dev
```

Visit http://localhost:5173 (Vite will print the actual port it uses).

Build for production:

```bash
npm run build
npm run preview  # serve the built app locally
```

---

## Project structure (important files)

- `src/` — main source folder
	- `main.ts` — app entry; mounts Pinia, router, theme init
	- `App.vue` — root component (includes Toaster)
	- `pages/` — route-level pages (LandingPage, Login, Signup, Dashboard, TicketManagement)
	- `components/` — shared components and small UI pieces
		- `ui/` — small design-system components (VButton, VCard, VInput, VSelect, VBadge, etc.)
		- `figma/` — figma-related converted components (ImageWithFallback)
		- `DecorativeCircles.vue`, `WaveBackground.vue` — decorative assets used by landing
	- `stores/` — Pinia stores (auth, tickets)
	- `composables/` — reusable logic (e.g. `useTheme.ts` to toggle dark mode)
	- `styles/globals.css` — Tailwind + theme CSS variables and utility overrides

- `package.json` — npm scripts and dependencies
- `index.html` — app HTML template
- `tsconfig.json` — TypeScript config
- `tailwind.config.cjs` & `postcss.config.cjs` — Tailwind/PostCSS

---

## Key features & notes

- Theme (dark/light)
	- The project uses a class-based dark mode strategy. The `useTheme` composable toggles the `.dark` class on the document element and persists the preference in `localStorage`.
	- Colors are defined using CSS custom properties in `src/styles/globals.css`. Use the semantic helper classes (provided in the same file) such as `text-foreground`, `text-muted`, `bg-card` and `border-muted` in components to ensure correct behavior across themes.

- Toasts
	- Sonner toasts are integrated via a small Vue wrapper and mounted at the app root. Use `toast.success(...)`, `toast.error(...)` from `sonner` to show notifications.

- UI primitives
	- `src/components/ui` contains small, reusable components. They prefer theme-aware classes where possible. If you add components, prefer using CSS variables and the helper classes rather than hard-coded Tailwind color utilities so dark mode works smoothly.

- React/TSX artifacts
	- Some `.tsx` files from earlier prototypes were retained in `react_backup/`. The active app uses Vue SFCs. Do not import `.tsx` files in new Vue code.

---

## Development tips

- Prefer semantic theme classes
	- Replace direct Tailwind color utilities (e.g. `text-gray-900`, `bg-white`) with the provided helpers or add `dark:` variants. This repository already contains overrides that map common light utilities to dark surfaces when `.dark` is present; using the semantic helpers is cleaner and future-proof.

- Working with the theme
	- To toggle theme programmatically:

```ts
import { useTheme } from './src/composables/useTheme'
const { toggle, isDark, init } = useTheme()
init() // called already in main.ts
toggle()
```

- Adding toasts
	- Import `toast` from `sonner` in your component and call `toast.success('Saved')` or `toast.error('Failed')`.

---

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — bundle for production
- `npm run preview` — locally preview production build
- `npm run lint` — (if present) run linters
- `npx tsc --noEmit` — run TypeScript type-check

---

## Troubleshooting

- If dev server does not start or port conflicts occur, Vite may probe another port; check the terminal output for the served URL.
- If you get `.vue` import/type errors, ensure `src/env.d.ts` (type shims) exists and `tsconfig.json` includes the `src` directory.
- If a component looks bright in dark mode, check for hard-coded Tailwind background/text utilities (e.g., `bg-white`, `text-gray-900`) and replace them with semantic classes (`bg-card`, `text-foreground`) or `dark:` variants.

---

## Next improvements (recommended)

- Replace remaining hardcoded Tailwind color utilities across the codebase with semantic classes or CSS variables.
- Add a small set of visual regression or end-to-end tests (Cypress / Playwright) to verify theme and critical flows (login, create ticket, toasts).
- Consider extracting the small UI primitives into a separate package if reused across projects.

---

If you want, I can run a sweep to convert remaining `bg-*`/`text-*` usages to semantic classes automatically, or start the dev server and run a quick visual smoke test.

License: MIT (change as needed)

