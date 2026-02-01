# Portfolio Project - AI Agent Guidelines

## Project Overview
This is a **Next.js 16+ portfolio/skills showcase** demonstrating various React patterns through interactive examples (Redux, Context API, virtualization, infinite scroll, debouncing, authentication, lazy loading, service workers, push notifications). Built with **Next.js App Router**, Tailwind CSS 4, Redux Toolkit, and Firebase.

## Architecture & File Structure

### Next.js App Router Pattern (Next.js 16+)
- **`app/`**: All routes follow App Router conventions
- **`app/page.js`**: Homepage with skills grid (links to `/skills/[skill]`)
- **`app/skills/[skill]/page.js`**: Dynamic skill detail pages
- **`app/layout.js`**: Root layout wraps all pages with ThemeProvider + Navbar
- **Route-specific demos**: Each skill has its own folder (e.g., `app/redux/page.js`, `app/context-api/page.js`)

### Key Components Organization
```
components/
  ├── *Demo.js          # Feature demonstrations (e.g., VirtualizationDemo.js)
  ├── Navbar.js         # Uses useTheme() hook from ThemeProvider
  ├── ThemeProvider.js  # Context provider for dark mode (wraps entire app)
  └── hooks/            # Reusable custom hooks
```

### State Management
- **Redux**: Global store in `store/index.js` + `store/shopSlice.js` using Redux Toolkit
  - Uses `createAsyncThunk` for async operations (see `fetchProducts`, `processCheckout`)
  - Redux is NOT wrapped in a provider in layout.js - only used in specific demo pages
- **Context API**: Theme management via `ThemeProvider.js` (wraps entire app)
  - Custom `useTheme()` hook exports `{isDark, toggleTheme}`
  - Syncs with localStorage and `document.documentElement.classList` for Tailwind's `dark:` classes

### Skills Navigation Pattern
- **`app/utils/skills_list.js`**: Central array of skill objects with `{slug, title, short, color}`
- Homepage maps over skills array to render clickable cards
- Each card links to `/skills/[skill]` where slug matches the dynamic route
- Skill detail pages fetch data from a local `skillData` object (not API)

## Critical Next.js 16+ Conventions

### 1. Async Params (Breaking Change)
```javascript
// ✅ CORRECT (Next.js 16+)
export default async function SkillPage({ params }) {
  const { skill } = await params; // params is a Promise!
}

// ❌ WRONG (pre-16 style)
export default function SkillPage({ params }) {
  const { skill } = params; // Will crash
}
```

### 2. Client Components
- **Mark with `"use client";`** at the top for:
  - State hooks (`useState`, `useEffect`, `useContext`)
  - Event handlers (`onClick`, `onChange`)
  - Browser APIs (`localStorage`, `window`, service workers)
- Server components are default - use for static content, data fetching

### 3. Firebase SSR Safety
Firebase is initialized only on client side with `typeof window !== "undefined"` check (see `app/firebase/firebase-config.js`). Never call Firebase directly from server components.

## Custom Hooks Pattern

### Location & Usage
- **App-specific hooks**: `app/hooks/` (useToggle, useEscape, useFetchData)
- **Component-specific hooks**: `components/hooks/` (useFetch, useLocalStorage, useUserData)
- All custom hooks follow `use*` naming convention

### Example Patterns
```javascript
// Simple state encapsulation
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue(prev => !prev);
  return [value, toggle];
}

// LocalStorage sync with SSR safety
function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    return raw ? JSON.parse(raw) : initialValue;
  });
  // ... sync to localStorage via useEffect
}
```

## Styling & Theming

### Dark Mode Implementation
1. **Tailwind config** (`tailwind.config.js`): `darkMode: 'class'` enables `.dark` class-based toggling
2. **ThemeProvider** manages theme state + localStorage persistence
3. **Adds/removes `.dark` class** on `document.documentElement`
4. Use `dark:` prefix for dark mode styles: `dark:bg-zinc-900 dark:text-zinc-50`

### Tailwind Conventions
- **Spacing**: Consistent use of `px-6`, `py-16`, `max-w-6xl`, `mx-auto`
- **Color palette**: `zinc-*` for neutrals, `indigo-*` for primary actions
- **Gradients for skill cards**: `bg-gradient-to-br from-{color}-400 to-{color}-500`
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints

## Firebase Integration

### Push Notifications Setup
- **Client**: `app/firebase/firebase-config.js` initializes Firebase Messaging
- **Service Worker**: `public/firebase-sw.js` handles background notifications
- **Server**: `app/api/send-push/route.js` uses Firebase Admin SDK
  - Loads service account JSON from project root (see candidates list in route.js)
  - ⚠️ **Security**: Keep `.json` files in `.gitignore` (not committed)

### Service Account Loading
API route checks for `FIREBASE_SERVICE_ACCOUNT` env var OR searches for common filenames:
```javascript
const candidates = [
  "portfolio-5fabd-firebase-adminsdk-fbsvc-0a6eb20801.json",
  "serviceAccountKey.json",
  // ... more variants
];
```

## Development Workflow

### Commands
```bash
npm run dev       # Start dev server with Turbo (--turbo flag)
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint check
```

### Common Patterns
- **New skill demo**: Add to `app/utils/skills_list.js`, create component in `components/`, create page in `app/skills/[skill]/page.js`
- **Custom hook**: Create in `app/hooks/` or `components/hooks/`, follow `use*` naming, handle SSR safety with `typeof window` checks
- **API route**: Create in `app/api/[name]/route.js`, export `GET`/`POST` handlers

## Key Dependencies
- **Next.js 16.0.3**: Latest App Router features
- **React 19**: Latest React version
- **Redux Toolkit**: `createSlice`, `createAsyncThunk` for async state
- **Firebase**: Messaging for push notifications, Admin SDK for server-side
- **Tailwind CSS 4**: Using `@tailwindcss/postcss` (v4 setup)

## Common Gotchas
1. **Always await params** in Next.js 16+ dynamic routes
2. **"use client" directive** required for hooks and interactivity
3. **typeof window check** before accessing browser APIs
4. **ThemeProvider must wrap app** in layout.js for useTheme() to work
5. **Tailwind darkMode: 'class'** in config is essential for theme toggle
6. **Firebase service account** should be in .gitignore (check it's there!)

## Testing Approach
This is a demo/portfolio project - no formal test suite. Verify features by:
- Running dev server and manually testing each skill demo
- Checking dark mode toggle persists across page reloads
- Testing Firebase push notifications with API route

---

*For more details on Next.js 16 changes, see: https://nextjs.org/blog/next-16*
