---
name: quickcount-paskib-ui-ux
description: Builds and reviews the QuickCount Paskib React frontend using a hybrid editorial public portal and modern admin workspace, with accessible voting and wallet UI. Frontend only.
---

# QuickCount Paskib Frontend Skill

## Mission
Own frontend design and implementation for QuickCount Paskib v2. Rebuild the frontend in the existing repository using React + TypeScript. The public experience uses a distinctive editorial competition aesthetic; authenticated user and admin workspaces use clear, efficient application UI. Backend is not implemented yet.

## Hard scope boundary
- Work on frontend code, design system, mock adapters, frontend tests, and documentation only.
- Do not create a backend, database, API server, payment webhook, real OAuth integration, or server-side authorization.
- Do not claim that mock actions are real transactions or official results.
- Keep UI code independent from mock data so a future API adapter can replace the mock adapter without rewriting page components.
- Before deleting or replacing files, inspect the repository and explain the intended impact in the work plan. Remove obsolete code only when the replacement is in place and verified.
- Never delete a skill or agent configuration unless it is listed as intentionally unused in the project skill inventory.

## Product rules
- Conversion: Rp1.000 = 1 suara.
- Top-up and voting are separate flows.
- A top-up is not a vote.
- The non-refundable balance policy must be visible before a user confirms a simulated or future top-up.
- Balance must not be deducted when opening a dialog or changing a form field; in a demo, deduct only after explicit final confirmation.
- Public totals must be described as demo/sample data until connected to a verified source.
- Never fabricate real payment success, QRIS, virtual-account details, transaction references, OAuth success, live vote counts, or event deadlines.
- Authentication and role guards in frontend are UX controls only. They are not security boundaries.
- If a page needs data that the future backend may not expose, document the assumed data contract rather than inventing a backend.

## Product architecture
Build three separate route/layout areas:
1. Public portal: editorial landing page, competitions, regions, teams, leaderboard/results, voting guide, FAQ, login/register.
2. User workspace: user dashboard, voting flow, wallet/top-up, transaction history, profile.
3. Admin workspace: overview, competitions, regions, categories, teams, users, voting/results monitoring, payment review UI, reports, audit activity.
Admin routes and visible actions should be driven by typed mock roles/permissions. Do not represent these as server-enforced permissions.

## Visual direction
### Public portal: Editorial Competition
- Distinctive magazine/editorial composition: confident display typography, asymmetric but intentional layouts, strong result numerals, structured tables, generous whitespace, rules/dividers, and restrained red accents.
- Red/white is a brand cue, not a reason to paint every component red.
- Use real Paskibra/competition context. Avoid irrelevant stock photography, generic SaaS cards, crypto/casino cues, gratuitous gradients, and repetitive rounded-card grids.
- Keep results highly scannable and label their status/time/source when known.
### User and admin workspaces: Modern Operations
- Clean application shell, predictable navigation, compact but readable tables, clear forms, filters, status labels, confirmation patterns, and empty/loading/error states.
- Use a shared design token system but allow different layout density and typography between public and admin areas.
### Accessibility and responsive behavior
- Semantic HTML, keyboard support, visible focus, accessible names, sufficient contrast, reduced-motion support, and touch targets around 44px.
- Check layouts at 320, 375, 768, 1024, and 1440px when browser tools are available.
- Never claim visual verification without inspecting a rendered page.

## Technical conventions
- React + TypeScript + Vite.
- Use the dependencies already installed where sensible; add dependencies only for a concrete need.
- Prefer feature-based organization and small components.
- Keep route configuration, UI, domain types, and data adapters separated.
- Use a single consistent package manager and lockfile.
- Use integer Rupiah values; format display values through a shared formatter.
- Avoid duplicated derived state, unnecessary effects, unstable list keys, and `dangerouslySetInnerHTML`.
- Every visible control must work, navigate, show a meaningful disabled reason, or be clearly marked as a prototype.
- Use deterministic mock data and deterministic test fixtures; avoid `Math.random()` for transaction or voting identity.
- Handle loading, empty, error, unauthorized-demo-role, insufficient-balance, voting-closed, and confirmation states where relevant.

## Required workflow
1. Inspect repository, scripts, skills, and existing UI before editing.
2. Read `FRONTEND_V2_BLUEPRINT.md` and `docs/API_CONTRACT_DRAFT.md` before implementing features.
3. Preserve reusable product rules and any relevant existing agent skills; remove only skills that are irrelevant to this frontend.
4. Establish design tokens, routing, layouts, shared UI primitives, types, and mock adapters before implementing all pages.
5. Implement in small phases. Do not replace the whole app with a single giant component.
6. Keep a visible `DEMO`/`SIMULASI` status for mock payments, balances, votes, and auth.
7. Run `npm run lint`, `npm test`, and `npm run build` (or equivalent available scripts) after meaningful changes. Fix failures caused by changes and report unrelated failures accurately.
8. Update README and project docs when commands, architecture, or behavior changes.

## Completion checklist
- Public portal and admin workspace follow their distinct visual directions.
- Frontend is prepared for national and regional competitions without assuming a final backend schema.
- Mock data is isolated behind adapters.
- Voting conversion and non-refundable policy are consistent.
- No mock action is presented as a real transaction or verified official result.
- Navigation and controls work; mobile layouts have no horizontal overflow.
- Typecheck, tests, and production build are run and reported.
