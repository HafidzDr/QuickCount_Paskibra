export type Id = string;
export type Role = 'USER' | 'ADMIN';
export type CompetitionScope = 'NATIONAL' | 'PROVINCE' | 'REGENCY_CITY';
export type CompetitionStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'FINAL';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
export type TransactionKind = 'TOP_UP' | 'VOTE';
export type DemoState = 'DEMO';

export interface User {
  id: Id;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  createdAt: string;
}

export interface Region {
  id: Id;
  name: string;
  scope: CompetitionScope;
  code: string;
}

export interface Competition {
  id: Id;
  slug: string;
  name: string;
  scope: CompetitionScope;
  region: string;
  status: CompetitionStatus;
  startsAt: string;
  endsAt: string;
  description: string;
  totalVotes: number;
  totalTeams: number;
  demoState: DemoState;
}

export interface Team {
  id: Id;
  competitionId: Id;
  contingentNumber: string;
  name: string;
  school: string;
  region: string;
  province: string;
  rank: number;
  verifiedVotes: number;
  imageUrl?: string;
  tagline: string;
  leaderName: string;
  coachName: string;
  demoState: DemoState;
}

export interface WalletSummary {
  userId: Id;
  balanceRupiah: number;
  estimatedVotes: number;
  demoState: DemoState;
}

export interface Transaction {
  id: Id;
  userId: Id;
  kind: TransactionKind;
  title: string;
  subtitle: string;
  amountRupiah: number;
  feeRupiah: number;
  totalPaidRupiah: number;
  votesCount?: number;
  teamId?: Id;
  teamName?: string;
  paymentMethod?: string;
  status: PaymentStatus;
  date: string;
  referenceNumber: string;
  demoState: DemoState;
}

export interface VoteRecord {
  id: Id;
  userId: Id;
  competitionId: Id;
  teamId: Id;
  teamName: string;
  contingentNumber: string;
  votesCount: number;
  costRupiah: number;
  createdAt: string;
  status: 'VERIFIED_DEMO';
}

export interface PaymentOption {
  id: string;
  name: string;
  category: 'QRIS' | 'VIRTUAL_ACCOUNT' | 'E_WALLET';
  feeRupiah: number;
  description: string;
}

export interface AuditLogItem {
  id: Id;
  actorName: string;
  actorRole: Role;
  action: string;
  entity: string;
  details: string;
  timestamp: string;
}
