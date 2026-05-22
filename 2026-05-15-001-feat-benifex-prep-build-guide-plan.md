---
title: "feat: Benifex Interview-Prep Build Guide — Employee Benefits Admin Dashboard"
type: feat
status: active
date: 2026-05-15
origin: benifex-prep-plan.md
---

# feat: Benifex Interview-Prep Build Guide — Employee Benefits Admin Dashboard

## Overview

A step-by-step build guide for a small Employee Benefits Admin dashboard, designed as interview-prep for a Senior Frontend Engineer role at Benifex (£70-90k, UK). The app is built using Benifex's exact frontend stack — **React, TypeScript, Redux, Redux-Sagas, RsBuild, MSW** — so the user has hands-on experience with the new tooling before the technical interview and a tangible artefact to demo.

Scope chosen: **Stretch / wow-factor** (~17-22h). Beyond the core CRUD-style flows in `benifex-prep-plan.md`, this plan adds optimistic UI with rollback, an accessibility pass, Storybook for two components, and Vitest+RTL+MSW tests — to give the technical interview a stronger narrative.

## Problem Frame

The user needs to apply for the Benifex role with credibility on tools they have not yet used in anger. Their portfolio (`/Users/Personal/Desktop/development/portfolio`) shows:

- **Strong existing fit:** React (Expert, 5y), TypeScript (Expert, 4y), Redux Toolkit (Expert, 4y), REST APIs (Expert, 6y), Tailwind (Proficient, 2y), Vitest+RTL (Proficient).
- **Adjacent / partial:** Vite (Proficient — RsBuild is Vite-adjacent), JS ES2024 generators (knows them but rarely uses them).
- **Genuine gaps:** Redux-Sagas, RsBuild, MSW.

The build is therefore optimised as a **learning vehicle disguised as a demo app**: the work that genuinely teaches Sagas/MSW/RsBuild is front-loaded; the UI is intentionally familiar territory so the user does not lose hours on CSS.

## Requirements Trace

- R1. App is built with React + TypeScript + Redux + Redux-Sagas + RsBuild + MSW (the exact Benifex stack).
- R2. App contains all four features from `benifex-prep-plan.md`: Dashboard, Employee list, Employee detail (with enrol/unenrol toggle), Benefits catalogue.
- R3. Async flows use Redux-Sagas — not thunks, not RTK Query — so the user can articulate the `call`/`put`/`takeLatest` mental model in an interview.
- R4. Enrolment toggle is implemented with **optimistic UI + rollback on failure** to demonstrate non-trivial Saga patterns.
- R5. MSW handlers cover every route in the prep plan and the seed data feels real (10-15 employees, 8-10 benefits).
- R6. App is deployed to a public Vercel URL the user can put on their CV.
- R7. At least one feature flow is covered by a Vitest + React Testing Library test that uses MSW handlers — proving the user understands the testing story end-to-end.
- R8. Code is accessible (WCAG 2.2 AA-ish — semantic HTML, focus-visible, keyboard reachable, ARIA where needed). This matches the job ad's emphasis on accessibility and the user's stated WCAG expertise.
- R9. Two components (`StatCard`, `EmployeeRow`) live in Storybook so the user can talk to component-driven development in the interview.

## Scope Boundaries

**In scope:**
- Single-tenant data model (no multi-org switching despite the "Unified Admin" framing — out of scope for a 20h build).
- English-only UI copy.
- Light + dark mode if cheap; otherwise light-only.
- Read-only benefits catalogue.
- Browser-only MSW (no Node integration beyond Vitest test setup).

**Explicit non-goals:**
- Auth / login screens — assume an authenticated admin.
- Real backend, persistence beyond an in-memory MSW store, or any .NET integration.
- Bulk operations, CSV import/export, audit logging — tempting but not interview-essential.
- Internationalisation, currency formatting beyond GBP.
- E2E tests with Playwright — Vitest+RTL+MSW gives enough story.
- A custom design system — Tailwind utilities + a handful of components is enough.

## Context & Research

### Relevant Existing Patterns (User's Portfolio)

- `package.json` uses npm (`package-lock.json` present, no `pnpm-lock.yaml`) — **use npm** for consistency.
- TypeScript with `strict: true` is the user's norm — keep that in the new project.
- Tailwind v4 is used in the portfolio. For RsBuild + Tailwind, **Tailwind v3 + autoprefixer + postcss** is the safest integration path and matches what a corporate platform like Benifex more likely runs in production. Note the trade-off in the styling unit.
- `@/` path alias is the user's convention (`tsconfig.json` `paths`) — replicate it.
- Functional components with named exports, hooks-based, no class components.

### Carried-Forward Decisions From Origin Document (`benifex-prep-plan.md`)

- Project name: `benefits-admin`
- Project structure: `src/app`, `src/components/{ui,layout}`, `src/features/{dashboard,employees,benefits}`, `src/store`, `src/mocks`, `src/lib`
- MSW handlers organised by domain (`employees.ts`, `benefits.ts`, etc.)
- Redux store split into slices per domain, each with its own `slice.ts`, `sagas.ts`, `selectors.ts`
- Routing: **React Router v6** (the origin doc favours this; Benifex more likely use it than TanStack Router).
- Deployment: Vercel with `buildCommand: npm run build`, `outputDirectory: dist`.
- Seed data volume: ~12 employees, ~9 benefits across 4 categories.

### External References (Versions to Pin)

| Package | Version (May 2026) | Why |
|---|---|---|
| `@rsbuild/core` + `@rsbuild/plugin-react` | latest 1.x | RsBuild has been stable since late 2024; current docs at rsbuild.dev |
| `@reduxjs/toolkit` | 2.x | The user knows RTK Expert-level; `createSlice` is the realistic combo with Sagas |
| `react-redux` | 9.x | Hooks API |
| `redux-saga` | 1.x | Stable for years |
| `msw` | 2.x | The 2.x API (`http.get`, not `rest.get`) is current |
| `react-router-dom` | 6.x | Stick to v6, not v7 — v6 is more widely deployed |
| `tailwindcss` | 3.4.x | v3 for RsBuild stability; v4 if user wants to gamble |
| `typescript` | 5.x | Matches portfolio |
| `vitest` + `@testing-library/react` | latest | User already knows these |

## Key Technical Decisions

- **Use Redux Toolkit `createSlice` + Redux-Sagas (not RTK Query, not thunks).** The job ad explicitly lists Redux-Sagas. The user already knows RTK, so they keep their familiar `createSlice` reducer-authoring while bolting Sagas on for async — this is the realistic stack a team running classic Redux-Sagas would actually write today.
- **Optimistic UI for the enrolment toggle.** This is the unit that genuinely flexes Sagas: dispatch optimistic update → call API → on failure, rollback. It mirrors real benefits-platform flows and gives a great interview answer to "tell me about a non-trivial async flow".
- **MSW v2 with `http.get`/`http.patch` handlers.** The v1 API (`rest.get`) is deprecated; using v2 means the user is talking to current docs in an interview.
- **In-memory MSW store, not pure stub responses.** Patch handlers mutate an in-memory map so the UI feels real between page navigations.
- **React Router v6 + lazy routes.** Lazy-load feature routes — small flex on code-splitting that costs nothing.
- **Tailwind v3 + PostCSS** for RsBuild stability. Note v4 as a stretch.
- **No state-management library beyond Redux.** No Zustand, no React Query — the point is to show Redux+Sagas mastery.
- **`@/` path alias** matching the user's portfolio convention.
- **Strict TypeScript, no `any`.** Use `unknown` + narrowing for API responses.

## Open Questions

### Resolved During Planning

- **Routing library?** → React Router v6 (origin doc preference; Benifex likely use it).
- **Tailwind v3 or v4?** → v3 for RsBuild integration stability; note v4 as optional.
- **Tests in scope?** → Yes — one critical flow (employee detail toggle) tested end-to-end with MSW.
- **Package manager?** → npm (matches user's portfolio).
- **Auth?** → Out of scope; assume authed admin.
- **Storybook?** → Yes for two components, as a wow-factor signal. Deferred to last unit so it doesn't block core demo.

### Deferred to Implementation

- **Exact Saga effect choices for the toggle flow** (`takeLatest` vs `takeEvery` per-employee-per-benefit) — decide while writing the saga; the test scenario constrains the outcome.
- **Light/dark theme toggle** — add only if time permits in the Polish unit.
- **Exact seed-data names/roles** — invent during MSW handler writing; not worth pre-specifying.
- **PostCSS plugin order for Tailwind v3 with RsBuild** — check `@rsbuild/plugin-react` docs at install time; the integration is one-line config but version-sensitive.

## High-Level Technical Design

> *This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent (you) should treat it as context, not code to reproduce.*

### Data flow for the enrolment toggle (the centrepiece Saga)

```
User clicks "Enrol" on benefit X for employee Y
        │
        ▼
dispatch(enrolment/toggleRequested { employeeId, benefitId, optimisticNewStatus })
        │
        ├─► Reducer immediately applies optimisticNewStatus to local state
        │   (UI updates instantly — toggle flips, button shows loading)
        │
        ▼
Saga watcher (takeLatest on toggleRequested) picks it up
        │
        ▼
worker saga:
  try:
    yield call(api.patchEnrolment, employeeId, benefitId)
    yield put(enrolment/toggleSucceeded { employeeId, benefitId, serverEnrolment })
    │   (reducer reconciles state with server truth)
  catch err:
    yield put(enrolment/toggleFailed { employeeId, benefitId, previousStatus, error })
        │
        ▼
        Reducer rolls back to previousStatus
        UI shows a toast: "Could not update enrolment. Try again."
```

### Module shape

```
src/
  app/
    App.tsx              router + provider tree
    routes.tsx           lazy-loaded route definitions
  components/
    ui/                  Button, Card, Badge, Table, Toast, Spinner
    layout/              Sidebar, TopBar, PageHeader
  features/
    dashboard/           DashboardPage + stat cards
    employees/           EmployeesListPage, EmployeeDetailPage, EmployeeRow
    benefits/            BenefitsCataloguePage, BenefitCard
  store/
    employees/           slice + sagas + selectors
    benefits/            slice + sagas + selectors
    dashboard/           slice + sagas + selectors
    enrolments/          slice + sagas + selectors  ← the toggle saga lives here
    rootReducer.ts
    rootSaga.ts
    store.ts             configureStore + sagaMiddleware
    hooks.ts             typed useAppDispatch / useAppSelector
  mocks/
    handlers/{employees,benefits,enrolments,dashboard}.ts
    data/{employees,benefits,enrolments}.ts
    browser.ts           MSW service worker setup
    server.ts            MSW Node setup (for Vitest)
  lib/
    api.ts               typed fetch wrappers
    cx.ts                tailwind classnames helper
```

## Implementation Units

> Work through these top-to-bottom. Each unit is sized roughly 1-3 hours. Mark them `[x]` as you go.

---

- [ ] **Unit 1: Create the repo and scaffold RsBuild + React + TypeScript**

**Goal:** A running RsBuild dev server displaying a default "Hello" React + TS page, in a fresh git repo.

**Requirements:** R1

**Dependencies:** None

**Files:**
- Create: `package.json`, `tsconfig.json`, `rsbuild.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `.gitignore`, `README.md`, `.nvmrc`

**Approach:**
1. From `/Users/Personal/Desktop/benifex`, create the project folder: `mkdir benefits-admin && cd benefits-admin`.
2. Initialise git: `git init && git branch -m main`.
3. Scaffold with the RsBuild CLI (preferred — picks current versions): `npm create rsbuild@latest -- --template react-ts --dir .` (run inside the empty `benefits-admin` folder; pick "React" + "TypeScript" if interactive).
4. Confirm `rsbuild.config.ts` exists with `pluginReact()` registered.
5. Pin Node version via `.nvmrc` (e.g. `20`) — matches Benifex's likely runtime.
6. Update `tsconfig.json` with `"strict": true`, `"paths": { "@/*": ["./src/*"] }`, `"baseUrl": "."`.
7. Add the same path alias in `rsbuild.config.ts` via `source.alias`.
8. Run `npm run dev` — confirm dev server is up at `http://localhost:3000` (or whatever RsBuild reports).
9. Commit: `chore: scaffold rsbuild react-ts project`.

**Patterns to follow:**
- Mirror the user's portfolio `tsconfig.json` — strict mode, `@/` alias.

**Test scenarios:**
- Test expectation: none -- pure scaffolding, no behavioural code yet.

**Verification:**
- `npm run dev` boots cleanly with zero TS errors.
- Browser shows the default React page.
- `@/main` import works (try one) — the path alias resolves.

---

- [ ] **Unit 2: Tailwind CSS + base styles**

**Goal:** Tailwind utility classes work in `App.tsx`, design tokens (colours, font) feel intentional.

**Requirements:** R2, R8

**Dependencies:** Unit 1

**Files:**
- Create: `tailwind.config.ts`, `postcss.config.js`, `src/styles/globals.css`
- Modify: `src/main.tsx` (import globals.css), `rsbuild.config.ts` (PostCSS may need explicit setup — usually not for v3)

**Approach:**
1. Install: `npm i -D tailwindcss@^3.4 postcss autoprefixer`.
2. Generate config: `npx tailwindcss init -p` (creates `tailwind.config.js` + `postcss.config.js`). Rename `tailwind.config.js` → `tailwind.config.ts` and re-author with typed `Config`.
3. Set `content: ['./index.html', './src/**/*.{ts,tsx}']` in tailwind config.
4. Create `src/styles/globals.css` with `@tailwind base; @tailwind components; @tailwind utilities;` and `@layer base` overrides for `:focus-visible` outline (R8 — accessibility).
5. Import `./styles/globals.css` at the top of `src/main.tsx`.
6. Define a small token set in `tailwind.config.ts`: brand primary, surface, muted, success, danger. Don't overthink — pick something Benifex-y (the green/purple hearts in the job ad hint at the palette).
7. Smoke test: change `<h1>` in `App.tsx` to `<h1 className="text-3xl font-bold text-emerald-600">Benefits Admin</h1>`.
8. Commit: `chore: tailwind v3 setup with design tokens`.

**Patterns to follow:**
- User's portfolio `app/globals.css` for `@layer base` shape.

**Test scenarios:**
- Test expectation: none -- styling layer, covered visually.

**Verification:**
- Tailwind utilities apply visibly.
- `:focus-visible` ring shows on `<button>` tab-focus.
- No PostCSS errors in dev server output.

> **Tailwind v4 stretch:** If you want to use v4, install `tailwindcss@^4` + `@tailwindcss/postcss`, drop the `tailwind.config.ts`, and write the config in `globals.css` via `@theme`. Skip this on the first pass — get a working app first.

---

- [ ] **Unit 3: Redux store + Redux-Sagas wiring (no features yet)**

**Goal:** A configured Redux store with saga middleware, `rootReducer`, `rootSaga`, and typed hooks — wired into `App.tsx` via `<Provider>`. No domain logic yet.

**Requirements:** R1, R3

**Dependencies:** Unit 1

**Files:**
- Create: `src/store/store.ts`, `src/store/rootReducer.ts`, `src/store/rootSaga.ts`, `src/store/hooks.ts`
- Modify: `src/main.tsx` (wrap `<App>` in `<Provider store={store}>`)

**Approach:**
1. Install: `npm i @reduxjs/toolkit react-redux redux-saga`.
2. `store.ts`: import `configureStore`, instantiate `sagaMiddleware = createSagaMiddleware()`, pass via `middleware: (gDM) => gDM({ thunk: false }).concat(sagaMiddleware)`, then `sagaMiddleware.run(rootSaga)`.
3. `rootReducer.ts`: `combineReducers({})` for now — empty.
4. `rootSaga.ts`: `function* rootSaga() { yield all([]) }` — empty.
5. `hooks.ts`: export typed `useAppDispatch` and `useAppSelector` using `RootState` and `AppDispatch` types from `store.ts`.
6. Wrap `<App />` in `<Provider store={store}>` in `main.tsx`.
7. Commit: `feat: configure redux store with saga middleware`.

**Patterns to follow:**
- Standard Redux Toolkit `configureStore` shape — user knows this from portfolio.
- Disable the default thunk middleware since we are deliberately not using it (interview narrative: "we use Sagas instead").

**Test scenarios:**
- Test expectation: none yet -- store wiring is verified by Unit 4's first slice.

**Verification:**
- App still boots, no console errors.
- Redux DevTools (browser extension) shows the store with no slices.

---

- [ ] **Unit 4: MSW v2 setup + seed data + handlers for all routes**

**Goal:** Every route from `benifex-prep-plan.md` is intercepted by MSW with believable seed data, and MSW starts in dev only.

**Requirements:** R5

**Dependencies:** Unit 1

**Files:**
- Create:
  - `src/mocks/data/employees.ts` (~12 employees)
  - `src/mocks/data/benefits.ts` (~9 benefits across Health/Finance/Tech/Lifestyle)
  - `src/mocks/data/enrolments.ts` (initial enrolments — some employees enrolled in some benefits)
  - `src/mocks/handlers/employees.ts` (GET `/api/employees`, GET `/api/employees/:id`)
  - `src/mocks/handlers/benefits.ts` (GET `/api/benefits`)
  - `src/mocks/handlers/enrolments.ts` (GET `/api/employees/:id/enrolments`, PATCH `/api/employees/:id/enrolments/:benefitId`)
  - `src/mocks/handlers/dashboard.ts` (GET `/api/dashboard/stats`)
  - `src/mocks/handlers/index.ts` (export combined handlers array)
  - `src/mocks/browser.ts` (setupWorker for dev)
  - `src/mocks/store.ts` (in-memory mutable store: `let enrolmentsByEmployee = { ... }`)
- Modify: `src/main.tsx` to conditionally start MSW

**Approach:**
1. Install: `npm i -D msw@^2`.
2. Generate the service worker: `npx msw init public/ --save`.
3. Build seed data — invent 12 employees across 3-4 departments (Engineering, People, Sales, Marketing) and 9 benefits (Bupa, Pension Top-Up, Cycle to Work, Tech Salary Sacrifice, Gym, EAP, Life Assurance, Birthday Off, Wellness Days). Use the data values from the job ad to make it feel real.
4. Use `http.get` / `http.patch` from MSW v2: `http.get('/api/employees', () => HttpResponse.json(employees))`.
5. The PATCH handler must read the toggle direction from the request body, mutate `src/mocks/store.ts`, and return the updated `Enrolment`. **Add a 400ms artificial delay** (`await delay(400)`) so optimistic UI is observable. Use a tiny random failure rate (`Math.random() < 0.1`) and `return new HttpResponse(null, { status: 500 })` to give the rollback path something to do — **toggle this off before deploying**.
6. In `main.tsx`, before `createRoot().render(...)`, conditionally `await worker.start({ onUnhandledRequest: 'bypass' })` when `import.meta.env.DEV`.
7. Commit: `feat: msw handlers and seed data for all api routes`.

**Patterns to follow:**
- MSW v2 docs (mswjs.io) — `http`, `HttpResponse`, `delay`.

**Test scenarios:**
- Test expectation: none here -- MSW is verified indirectly by every feature unit. Manually verify via DevTools Network tab in Unit 7.

**Verification:**
- `npm run dev` logs `[MSW] Mocking enabled` in console.
- Hitting `http://localhost:3000/api/employees` in DevTools fetch returns JSON.
- The artificial failure flag can be flipped on/off from one place.

> **Important before deploy:** disable the random failure injection in the PATCH handler. Leaving it on in production = a broken-looking demo. Mark this as a TODO in `enrolments.ts`.

---

- [ ] **Unit 5: API client layer + first feature slice (dashboard) — the Saga reference pattern**

**Goal:** A typed `api.ts` fetch wrapper and the **dashboard slice + saga + selectors** working end-to-end against MSW. This unit is the canonical reference the other feature slices copy.

**Requirements:** R1, R3

**Dependencies:** Units 3, 4

**Files:**
- Create:
  - `src/lib/api.ts` — typed `get`/`patch` wrappers; throws on non-2xx
  - `src/store/dashboard/slice.ts` — `{ loading, stats, error }`, actions: `fetchRequested`, `fetchSucceeded`, `fetchFailed`
  - `src/store/dashboard/sagas.ts` — `watchFetchDashboard` + `fetchDashboardWorker`
  - `src/store/dashboard/selectors.ts` — `selectDashboardStats`, `selectDashboardLoading`
- Modify:
  - `src/store/rootReducer.ts` — register `dashboard` reducer
  - `src/store/rootSaga.ts` — include `watchFetchDashboard`

**Approach:**
1. `lib/api.ts` exports `apiGet<T>(path: string): Promise<T>` and `apiPatch<T>(path: string, body: unknown): Promise<T>`. Both use `fetch`, parse JSON, throw a typed `ApiError` on non-2xx.
2. `slice.ts` — author with `createSlice`. State shape: `{ loading: 'idle' | 'pending' | 'failed', stats: DashboardStats | null, error: string | null }`. Reducers update state on success/failure.
3. `sagas.ts` — the canonical worker/watcher pattern:
   - Worker: `yield call(apiGet, '/api/dashboard/stats')`, `yield put(actions.fetchSucceeded(stats))`, catch → `yield put(actions.fetchFailed(message))`.
   - Watcher: `yield takeLatest(actions.fetchRequested.type, worker)`.
4. `selectors.ts` — plain memoised selectors (use `createSelector` from RTK if any derived data, otherwise plain functions).
5. Register both in root reducer + root saga.
6. Commit: `feat: dashboard slice + saga + api wrapper`.

**Execution note:** This is the unit that teaches the Saga mental model. Slow down here — type it out by hand, not via paste. The shape will repeat for every other slice, so getting it cleanly first matters.

**Patterns to follow:**
- redux-saga docs `Beginner Tutorial` is the right reference.
- Worker/watcher separation — never mix them.

**Test scenarios:**
- Happy path: dispatching `fetchRequested` triggers the worker, which dispatches `fetchSucceeded` with the MSW response payload.
- Error path: if MSW returns 500, worker dispatches `fetchFailed` with a non-empty error string.

**Verification:**
- Redux DevTools shows the action sequence: `dashboard/fetchRequested` → (network call) → `dashboard/fetchSucceeded { payload: {...} }`.
- `selectDashboardStats(store.getState())` returns the seed data.

---

- [ ] **Unit 6: Routing + layout shell (Sidebar, TopBar, page chrome)**

**Goal:** React Router v6 with four lazy-loaded routes, wrapped in a sidebar+topbar layout. Each route currently renders a placeholder "PageName page" string.

**Requirements:** R2, R8

**Dependencies:** Unit 2

**Files:**
- Create:
  - `src/app/routes.tsx` — `createBrowserRouter` + lazy imports
  - `src/components/layout/AppShell.tsx` — sidebar + topbar + `<Outlet />`
  - `src/components/layout/Sidebar.tsx`
  - `src/components/layout/TopBar.tsx`
  - `src/components/layout/PageHeader.tsx`
  - Placeholder pages: `src/features/dashboard/DashboardPage.tsx`, `src/features/employees/EmployeesListPage.tsx`, `src/features/employees/EmployeeDetailPage.tsx`, `src/features/benefits/BenefitsCataloguePage.tsx`
- Modify: `src/App.tsx` → `<RouterProvider router={router} />`

**Approach:**
1. Install: `npm i react-router-dom@^6`.
2. Routes: `/` → DashboardPage, `/employees` → EmployeesListPage, `/employees/:id` → EmployeeDetailPage, `/benefits` → BenefitsCataloguePage.
3. Use `React.lazy` + `Suspense` for each page to demonstrate code splitting.
4. Sidebar — semantic `<nav>` with `<a>` (React Router `<NavLink>`); active styles via `aria-current="page"`.
5. TopBar — page title + a quiet skip-link target for the main content (R8).
6. Add a `<a className="sr-only focus:not-sr-only" href="#main">Skip to content</a>` at the top of the body for keyboard users.
7. Commit: `feat: routing + app shell layout`.

**Patterns to follow:**
- Semantic HTML — `<nav>`, `<main>`, `<aside>` (not `<div>` soup).
- `aria-current="page"` on the active NavLink.

**Test scenarios:**
- Happy path: clicking each sidebar link navigates to the right URL and updates the page heading.
- Edge case: refreshing on a deep route (`/employees/emp-3`) does not 404.
- Accessibility: tab order moves Skip-link → first sidebar link → main content.

**Verification:**
- All four routes reachable from the sidebar.
- Tab order is sensible; `:focus-visible` ring shows on every interactive element.
- Lighthouse a11y score on the empty pages ≥ 95.

---

- [ ] **Unit 7: Dashboard page — render the stat cards**

**Goal:** DashboardPage fetches stats on mount and renders three `StatCard`s. Loading state shows a skeleton; error state shows a retry button.

**Requirements:** R2, R3, R8

**Dependencies:** Units 5, 6

**Files:**
- Create: `src/features/dashboard/components/StatCard.tsx`, `src/features/dashboard/components/StatCardSkeleton.tsx`, `src/features/dashboard/components/DashboardError.tsx`
- Modify: `src/features/dashboard/DashboardPage.tsx`

**Approach:**
1. In `DashboardPage.tsx`, dispatch `dashboardActions.fetchRequested()` on mount inside a `useEffect`.
2. `useAppSelector(selectDashboardStats)` to read the data; render `StatCard` for each of: Total Employees, Active Enrolments, Monthly Cost (formatted GBP).
3. `StatCard` props: `{ label, value, hint? }`. Use `aria-live="polite"` on the values so screen readers announce updates.
4. Currency formatting: `new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value)`.
5. Skeleton: a `<StatCardSkeleton />` shown while `loading === 'pending'` and `stats === null`.
6. Error: if `loading === 'failed'`, render a retry button that re-dispatches `fetchRequested`.
7. Commit: `feat(dashboard): render stat cards with loading + error states`.

**Patterns to follow:**
- `<dl>` + `<dt>` + `<dd>` is semantically right for label-value pairs (R8).
- Don't double-fetch — guard the `useEffect` with `if (loading === 'idle')`.

**Verification:**
- Numbers in the cards match the seed data totals.
- Network tab shows exactly one request to `/api/dashboard/stats` per page load.

---

- [ ] **Unit 8: Employees list — searchable + filterable table**

**Goal:** A page that lists employees in a table, with a search box (filters by name) and a department filter. Click a row → navigates to detail.

**Requirements:** R2, R3, R8

**Dependencies:** Units 5, 6

**Files:**
- Create:
  - `src/store/employees/slice.ts`, `sagas.ts`, `selectors.ts`
  - `src/features/employees/components/EmployeeTable.tsx`
  - `src/features/employees/components/EmployeeRow.tsx`
  - `src/features/employees/components/EmployeeFilters.tsx`
  - `src/components/ui/SearchInput.tsx`
- Modify: `src/features/employees/EmployeesListPage.tsx`, rootReducer, rootSaga

**Approach:**
1. Slice/saga: same shape as dashboard.
2. Filter state lives in **URL search params** (`?q=alex&dept=engineering`), not Redux — keeps URLs shareable.
3. `EmployeeTable` is a semantic `<table>` with `<th scope="col">` headers. Each row is keyboard-activatable via `tabIndex={0}` + `onKeyDown` Enter → navigate.
4. Search input is debounced ~250ms.
5. Show "X of Y employees" count above the table. Empty state when filters produce zero results.
6. Commit: `feat(employees): list page with search and department filter`.

**Verification:**
- URL ↔ filter state round-trips cleanly.
- Keyboard: tab to first row, press Enter → navigates to detail page.

---

- [ ] **Unit 9: Employee detail + the optimistic-UI enrolment toggle (centrepiece Saga)**

**Goal:** Employee detail page with profile and a list of all benefits with enrolment status. Each benefit has a toggle that **optimistically updates** and **rolls back on API failure**, with a toast on failure.

**Requirements:** R2, R3, R4, R8

**Dependencies:** Unit 8

**Files:**
- Create:
  - `src/store/enrolments/slice.ts`, `sagas.ts`, `selectors.ts`
  - `src/store/benefits/slice.ts`, `sagas.ts`, `selectors.ts`
  - `src/features/employees/components/EnrolmentToggle.tsx`
  - `src/features/employees/components/EmployeeProfile.tsx`
  - `src/features/employees/components/BenefitsForEmployee.tsx`
  - `src/components/ui/Toast.tsx` + `ToastProvider.tsx`
- Modify: `EmployeeDetailPage.tsx`, rootReducer, rootSaga

**The toggle saga — three actions:**
- `toggleRequested({ employeeId, benefitId, optimisticNewStatus, previousStatus })` — reducer applies optimistic update immediately, adds key to `togglingKeys`.
- `toggleSucceeded({ employeeId, benefitId, serverEnrolment })` — reconciles with server, removes key.
- `toggleFailed({ employeeId, benefitId, previousStatus, error })` — rolls back to `previousStatus`, removes key, saga dispatches toast.

**Key decision:** Use **`takeEvery`**, not `takeLatest` — each employee+benefit pair is independent and must not cancel another. Be ready to explain this choice in interview.

**Toggle UI:** `<button role="switch" aria-checked={status === 'active'}>` — correct ARIA semantics for a toggle.

**Verification:**
- Failure rollback works: toggle flips → flips back → toast appears.
- Concurrent toggles resolve independently without cancelling each other.
- Disable MSW failure injection before declaring done.

---

- [ ] **Unit 10: Benefits catalogue — read-only grouped view**

**Goal:** Benefits page renders all benefits grouped by category as cards.

**Requirements:** R2, R3, R8

**Dependencies:** Unit 9 (benefits slice already exists)

**Approach:**
1. Group benefits by category client-side using a memoised `createSelector`.
2. Each category as `<section aria-labelledby="cat-health">` with `<h2>` heading.
3. `BenefitCard` shows name, monthly cost (GBP), description, category badge.
4. Commit: `feat(benefits): catalogue page grouped by category`.

---

- [ ] **Unit 11: Accessibility audit pass + polish**

**Goal:** App passes a basic accessibility audit; focus states, error toasts, empty states, and meta tags are consistent and correct.

**Requirements:** R8

**Dependencies:** Units 7–10

**Approach:**
1. Lighthouse on every page — target ≥ 95 accessibility, ≥ 90 performance.
2. axe DevTools — fix every violation.
3. Keyboard-only tab through the entire app.
4. Global keyboard shortcut: `/` focuses the search input on the employees page.
5. Set `<html lang="en">`, page `<title>` per route.
6. Standardise `<EmptyState>`, `<LoadingState>`, `<ErrorState>` components.
7. Commit: `feat: a11y audit pass + polish`.

---

- [ ] **Unit 12: Vitest + RTL + MSW — one critical-flow test**

**Goal:** A test that exercises the **optimistic toggle + rollback** end-to-end using MSW in Node mode.

**Requirements:** R7

**Dependencies:** Unit 9

**Files:**
- Create: `vitest.config.ts`, `src/test/setup.ts`, `src/mocks/server.ts`, `src/features/employees/__tests__/EmployeeDetailPage.test.tsx`

**Approach:**
1. Install: `npm i -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`.
2. `src/mocks/server.ts`: `setupServer(...handlers)` from `msw/node`.
3. Write the **rollback test**:
   - Render `EmployeeDetailPage` with a `<Provider>` + `<MemoryRouter>`.
   - Click an off-toggle → assert `aria-checked` is immediately `true` (optimistic).
   - Override PATCH handler to return 500: `server.use(http.patch(..., () => HttpResponse.error()))`.
   - Wait for rollback → assert `aria-checked` is back to `false`.
   - Assert toast with error message is present.
4. Second simpler test: search filter on `EmployeesListPage`.
5. Commit: `test: critical-flow coverage for toggle rollback`.

**Key notes:**
- Use `userEvent.click` not `fireEvent.click`.
- `server.use(...)` for per-test overrides — don't mutate shared handlers.
- Create a `renderWithProviders` helper to keep tests tidy.

---

- [ ] **Unit 13: Storybook for `StatCard` and `EmployeeRow`**

**Goal:** Two components have Storybook stories covering their key states.

**Requirements:** R9

**Dependencies:** Units 7, 8

**Approach:**
1. `npx storybook@latest init --type react`.
2. `preview.ts` imports `globals.css` so Tailwind works in stories.
3. `StatCard.stories.tsx` — stories: Default, LongLabel, ZeroValue, WithHint.
4. `EmployeeRow.stories.tsx` — stories: Default, ManyBenefits, NoneEnrolled, LongName.
5. Commit: `chore: storybook with two seed components`.

---

- [ ] **Unit 14: Deploy to Vercel + final demo readiness**

**Goal:** App is live at a public URL, MSW works in the production build, README is interview-ready.

**Requirements:** R6

**Dependencies:** All prior units

**Approach:**
1. **Disable MSW failure injection in `enrolments.ts`.** Critical.
2. In `main.tsx`, always start MSW (no real backend — this is a demo).
3. `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
4. Push to GitHub (`pjedbrooke/benefits-admin`), import to Vercel dashboard.
5. Smoke test every feature on the deployed URL; refresh on a deep route.
6. `README.md`: 1-paragraph description, screenshot, tech stack with one-line justifications, "what I'd add next" section.
7. Commit: `chore: deploy config + readme polish`.

> The SPA rewrite in `vercel.json` is essential — without it, refreshing on `/employees/emp-3` returns a 404.

---

## System-Wide Impact

- **Interaction graph:** The toggle saga touches `enrolments` slice (state) + `benefits` slice (read) + `employees` slice (read) + `Toast` provider (effect). Keep `previousStatus` in the action payload so rollback never has to look it up.
- **Error propagation:** API failures bubble through `apiGet`/`apiPatch` as thrown `ApiError`. Sagas catch and dispatch `…Failed` actions. No try/catch in components.
- **State lifecycle risks:**
  - Concurrent toggles for different (employee, benefit) pairs must not interfere. `takeEvery` (not `takeLatest`) is correct for the toggle saga. **`takeLatest` here would silently cancel in-flight requests and corrupt state.**
  - Rapid same-pair toggles: disable the toggle while a request is in flight (`togglingKeys` set).

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Tailwind v3 + RsBuild PostCSS integration breaks. | Follow Unit 2 exactly with v3 + `tailwindcss init -p`. Fall back to manual `postcss.config.js` if needed. Do not jump to v4 mid-build. |
| Storybook + RsBuild builder mismatch. | Storybook auto-detects via `@storybook/react-vite` as fallback — interop works fine for stories. |
| MSW service worker not loading in production on Vercel. | Run `npx msw init public/ --save` and confirm `mockServiceWorker.js` is committed. Test locally via `npm run build && npx serve dist` before deploying. |
| Forgetting to disable random PATCH failure injection before deploy. | Put a `// TODO: SET TO FALSE BEFORE DEPLOY` comment in `enrolments.ts`. Add checklist line in Unit 14. |
| Saga learning curve overruns estimate. | Front-load Unit 5 (canonical reference saga). Once it clicks, remaining slices are mechanical. |
| Stretch scope (~17-22h) overruns. | Ship after Unit 11 (~12h) if time is tight. Tests (Unit 12) are non-negotiable. Defer Storybook (Unit 13) if needed. |

## Documentation / Operational Notes

- **README.md** — one paragraph of context, a screenshot, tech stack with one-line justifications, "what I'd add next".
- **`docs/saga-decisions.md`** (optional but powerful) — 200 words on "why takeEvery, why optimistic, why no thunks". A great artefact to share with the interviewer after Unit 9.
- **Live URL + repo link** belong on the CV alongside the role application.

## Sources & References

- **Origin document:** `benifex-prep-plan.md`
- User portfolio (existing skills reference): `/Users/Personal/Desktop/development/portfolio`
- Benifex job ad: pasted into conversation 2026-05-15
- RsBuild docs: rsbuild.dev (current 1.x guides)
- MSW v2 docs: mswjs.io (note: `http` not `rest`)
- Redux-Saga docs: redux-saga.js.org (`Beginner Tutorial` is the right starting point)
- React Router v6 docs: reactrouter.com/en/6 (not v7 — pin to v6)
