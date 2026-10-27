# Frontend API Contract Draft

Status: **Draft for future backend discussion**  
This file documents frontend expectations only. It does not define or implement backend endpoints.

## Principles
- Use typed DTOs at the service boundary; keep UI components independent of transport details.
- Represent money as integer Rupiah values, never floating-point currency.
- Distinguish pending, success, failed, cancelled, and expired states where applicable.
- Treat frontend role/permission checks as display/navigation behavior only.
- Until a backend exists, use deterministic mock fixtures and visibly label all simulated outcomes.

## Proposed domain shapes

These are frontend planning types, not approved database schemas.

```ts
type Id = string;
type CompetitionScope = "NATIONAL" | "PROVINCE" | "REGENCY_CITY";
type CompetitionStatus = "DRAFT" | "SCHEDULED" | "OPEN" | "CLOSED" | "FINAL" | "CANCELLED";
type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "EXPIRED" | "CANCELLED";
type TransactionKind = "TOP_UP" | "VOTE";
type DemoState = "DEMO" | "LIVE";

interface Region {
  id: Id;
  name: string;
  level: CompetitionScope;
  parentRegionId?: Id | null;
}

interface Competition {
  id: Id;
  slug: string;
  name: string;
  scope: CompetitionScope;
  regionId?: Id | null;
  status: CompetitionStatus;
  startsAt?: string | null;
  endsAt?: string | null;
  demoState: DemoState;
}

interface Team {
  id: Id;
  competitionId: Id;
  name: string;
  schoolOrOrganization: string;
  regionId?: Id | null;
  logoUrl?: string | null;
  voteCount: number;
  resultLabel: "DEMO" | "VERIFIED";
}

interface WalletSummary {
  balanceRupiah: number;
  estimatedVotes: number;
  demoState: DemoState;
}

interface Transaction {
  id: Id;
  kind: TransactionKind;
  amountRupiah: number;
  feeRupiah: number;
  status: PaymentStatus;
  createdAt: string;
  demoState: DemoState;
}

interface VoteRequest {
  competitionId: Id;
  teamId: Id;
  quantity: number;
  costRupiah: number;
}
```

## Proposed service boundaries

Use interfaces such as `AuthService`, `CompetitionService`, `TeamService`, `WalletService`, `VotingService`, and `AdminService`. Each feature can initially depend on a mock implementation.

Possible method names for frontend planning:
- `getCurrentSession()`, `login()`, `logout()`
- `listCompetitions(filters)`, `getCompetition(id)`
- `listTeams(competitionId, filters)`, `getTeam(id)`
- `getLeaderboard(competitionId)`
- `getWalletSummary()`, `createTopUpIntent(input)`, `listTransactions(filters)`
- `previewVote(input)`, `confirmVote(input)`
- Admin list/create/update methods for regions, competitions, categories, teams, and users

These method names are not a commitment to specific HTTP routes. Confirm the real contract when backend planning begins.

## Business rules
- `estimatedVotes = floor(balanceRupiah / 1000)`.
- `costRupiah = quantity * 1000` unless a later product decision changes this rule.
- A top-up must not be counted as a vote.
- UI must not imply funds are real or persistent while using mock services.
- Do not invent fees, expiry periods, refund exceptions, voter limits, or official result status.
