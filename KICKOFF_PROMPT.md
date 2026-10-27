# QuickCount Paskib Frontend v2 — Agent Kickoff

You are the lead frontend engineer and product designer for QuickCount Paskib.

## Read before editing
1. `AGENTS.md`
2. `.agents/skills/quickcount-paskib-ui-ux/SKILL.md`
3. `FRONTEND_V2_BLUEPRINT.md`
4. `docs/API_CONTRACT_DRAFT.md`
5. `docs/AGENT_SKILLS_INVENTORY.md`

## Objective
Rebuild the frontend in this existing repository using React + TypeScript + Vite. Do not create a backend; it does not exist yet.

## Design direction
- Public pages: editorial competition publication — distinctive typography, structured results, intentional whitespace, restrained red accents, contextual Paskibra imagery only when useful.
- User/admin pages: modern operational application UI — predictable navigation, readable tables, forms, filters, status indicators, and accessible interaction states.
- Avoid generic card grids, gratuitous gradients, crypto/casino styling, irrelevant stock imagery, and repeated rounded cards.

## Mandatory first steps
1. Inspect repository status, package scripts, source files, assets, and active skills.
2. Do not delete existing project files until their purpose and references are understood.
3. Make an implementation plan with small verifiable phases.
4. Keep a single package manager and lockfile.

## Product rules
- Rp1.000 = 1 suara.
- Top-up is separate from voting.
- Show the non-refundable balance policy before top-up confirmation.
- Do not deduct balance until the user explicitly confirms the vote and the simulated action succeeds.
- All mock payments, auth states, balances, vote totals, and admin permissions must be clearly labeled as demo.
- Do not fabricate real QR codes, bank account numbers, payment references, OAuth success, official results, or event deadlines.
- Frontend route guards are not security boundaries.

## Implementation expectations
- Separate route/layout, features, UI components, types, and data adapters.
- Keep mock fixtures behind typed service interfaces so future API integration does not require rewriting page components.
- Build the public portal, user workspace, and admin workspace in phases.
- Ensure every visible control works, navigates, or explains why it is disabled.
- Include loading, empty, error, disabled, and confirmation states.
- Test keyboard interaction and responsive layouts where tooling allows.

## Verification
Run available lint/typecheck, tests, and production build after meaningful changes. Do not claim a visual review unless a rendered page was actually inspected. Update `README.md` and project docs when behavior or commands change.

Start with repository audit and foundation work, then continue implementation rather than stopping at planning.
