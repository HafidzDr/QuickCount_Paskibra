# QuickCount Paskib — Frontend v2

QuickCount Paskib is being rebuilt as a responsive React + TypeScript frontend for regional and national competition voting. **The backend does not exist yet; this repository is frontend-only.**

## Product direction
- **Public portal:** editorial competition design with strong typography, clear results hierarchy, intentional whitespace, and restrained red accents.
- **User workspace:** accessible account, voting, wallet, and transaction flows.
- **Admin workspace:** modern operational UI for managing competitions and reviewing activity.
- **Framework:** React + TypeScript + Vite.

## Product rules
- `Rp1.000 = 1 suara`.
- Top-up and voting are separate.
- Balance is not deducted until the final explicit vote confirmation succeeds in the current demo flow.
- Top-up balance is non-refundable; disclose this before top-up confirmation.
- Demo payments, wallet balances, vote totals, login, and admin permissions must be clearly labeled as simulations.
- No backend, database, real payment gateway, OAuth server, or API routes are implemented in this project at this stage.

## Project guidance
- `AGENTS.md` — coding-agent rules and scope.
- `FRONTEND_V2_BLUEPRINT.md` — product direction, routes, architecture, phases, and definition of done.
- `docs/API_CONTRACT_DRAFT.md` — proposed frontend-facing domain contracts for later discussion; not a backend specification.
- `docs/AGENT_SKILLS_INVENTORY.md` — retained and removed agent skills.

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm test
npm run build
```

The current scripts and UI may still reflect the previous one-page prototype until the v2 implementation phases are completed. Do not interpret the blueprint as proof that every listed route has already been implemented.
