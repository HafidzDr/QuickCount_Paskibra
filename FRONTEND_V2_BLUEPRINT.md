# QuickCount Paskib Frontend v2 — Blueprint

Status: **Proposed implementation blueprint**  
Scope: **Frontend only**  
Framework: **React + TypeScript + Vite**  
Backend: **Not implemented; use mock adapters only**

## 1. Product direction

QuickCount Paskib is a regional-to-national competition voting platform. The frontend has three distinct experiences:

1. **Public Portal** — editorial competition style, discoverable without login.
2. **User Workspace** — voting, wallet, transactions, and profile.
3. **Admin Workspace** — modern operational interface for managing competition data and reviewing activity.

The public landing page is the default entry for signed-out visitors, with a clear Login action. Login is required to enter the voting flow. Public results may be browsed without login, but every count in the current prototype must be labeled as demo/sample data.

## 2. Design system

### Public Portal: Editorial Competition
- Use deliberate typographic hierarchy, editorial headlines, asymmetric compositions, strong numeric result treatments, thin rules/dividers, restrained red accents, and purposeful whitespace.
- Avoid a generic SaaS appearance, excessive rounded cards, gradients as decoration, and irrelevant stock photography.
- Use contextual competition imagery only where it adds meaning; otherwise prefer typographic/data-led layouts.

### User/Admin: Modern Operations
- Use a stable app shell, sidebar or compact navigation, clear page titles, breadcrumbs where helpful, forms, filters, tables, status badges, confirmation dialogs, and explicit empty/loading/error states.
- Optimize admin screens for scanning and repetitive work, not for editorial drama.

### Shared tokens
Define tokens for color, typography, spacing, border, radius, shadow, focus ring, and z-index. Components should consume semantic tokens rather than hard-coded colors. Do not lock the final exact palette before inspecting available branding/assets; use restrained red/white as the initial brand direction.

## 3. Information architecture

### Public
- `/` — landing page
- `/competitions` — browse competitions
- `/competitions/:competitionId` — competition overview and status
- `/competitions/:competitionId/teams` — teams in a competition
- `/teams/:teamId` — team profile
- `/competitions/:competitionId/leaderboard` — public leaderboard
- `/voting-guide` — voting explanation
- `/faq` — frequently asked questions
- `/login` — login
- `/register` — registration
- `/forgot-password` — reset-request UI

### User
- `/app` — user dashboard
- `/app/vote/:competitionId/:teamId` — voting flow
- `/app/wallet` — wallet summary
- `/app/wallet/top-up` — top-up flow
- `/app/transactions` — transaction history
- `/app/profile` — profile

### Admin
- `/admin` — overview
- `/admin/competitions` — competition list and editor
- `/admin/regions` — region management
- `/admin/categories` — category management
- `/admin/teams` — team management
- `/admin/users` — user management
- `/admin/votes` — vote activity and totals
- `/admin/payments` — payment review UI
- `/admin/reports` — reports
- `/admin/audit-log` — activity history

Routes may be adjusted to match the existing repository conventions. Route guards are only client-side UX behavior until a backend exists.

## 4. Frontend architecture

Suggested structure:

```text
src/
  app/
    App.tsx
    router.tsx
    providers.tsx
  components/
    ui/
    feedback/
    data-display/
  layouts/
    PublicLayout.tsx
    UserLayout.tsx
    AdminLayout.tsx
  features/
    auth/
    competitions/
    regions/
    teams/
    leaderboard/
    voting/
    wallet/
    transactions/
    admin/
  lib/
    formatters.ts
    api/
      contracts.ts
      client.ts
  mocks/
    fixtures/
    mock-adapter.ts
  types/
  styles/
  main.tsx
```

Prefer existing dependencies if they are suitable. Recommended additions only when justified: React Router for routes, TanStack Query for server state, React Hook Form + Zod for forms, Vitest + React Testing Library for unit/component tests, and Playwright for browser flows. Do not add every library blindly; inspect package.json and scripts first.

## 5. Mock-to-API boundary

Components should call feature hooks/services, not import fixture arrays directly. Define typed service contracts for:
- authentication/session
- competitions and regions
- teams and leaderboard
- wallet and transactions
- voting
- admin management

Provide mock implementations for the current prototype. Later API implementations should satisfy the same contracts where possible. Document any contract assumptions in `docs/API_CONTRACT_DRAFT.md`. Do not create server endpoints in this frontend-only phase.

## 6. Product rules that must survive redesign

- Conversion: **Rp1.000 = 1 suara**.
- Top-up is separate from voting.
- Balance is not deducted on modal open or quantity changes; only after final explicit confirmation and a successful simulated action.
- The non-refundable policy must be visible before top-up confirmation and in FAQ/terms.
- Show fees separately if applicable.
- Public totals are demo data until a verified source exists.
- Never show fake QR codes, real-looking bank account numbers, fabricated transaction references, or claim real OAuth/payment success.
- If the app is a prototype, make simulation status visible near the relevant action, not only in a footer disclaimer.

## 7. Implementation phases

### P0 — Repository and skills audit
Inspect code, dependencies, scripts, assets, existing skill files, and lockfile. Preserve relevant project-specific skills; remove only unrelated or duplicate skill packages.

### P1 — Foundation
Set up routes, layout shells, tokens, shared UI primitives, typography, icon conventions, and error/empty/loading patterns.

### P2 — Public portal
Implement landing, competition browsing/details, team profile/directory, leaderboard, voting guide, and FAQ.

### P3 — Authentication and user workspace
Implement mock auth states, user dashboard, voting confirmation, wallet, top-up, transactions, and profile.

### P4 — Admin workspace
Implement dashboard, list/detail/form patterns, filters, mock role-based navigation, payment review UI, reports, and audit log.

### P5 — QA and handoff
Run lint/typecheck, tests, build, keyboard/accessibility review, and responsive checks at 320, 375, 768, 1024, and 1440px when browser tools are available. Document unverified visual behavior honestly.

## 8. Definition of done
- Build and local development commands work.
- Public, user, and admin route groups exist.
- The public and admin visual directions are distinct but share design tokens.
- Mock data is isolated behind adapters.
- Voting and wallet UI preserve all product rules.
- No fake integrations or official results are claimed.
- Empty/loading/error/disabled states are intentionally designed.
- Lint, tests, and production build are run; results are reported.
