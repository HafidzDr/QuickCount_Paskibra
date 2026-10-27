import {
  User,
  Competition,
  Team,
  Transaction,
  VoteRecord,
  WalletSummary,
  AuditLogItem,
  PaymentOption,
  Region,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_ADMIN,
  INITIAL_COMPETITIONS,
  INITIAL_TEAMS,
  INITIAL_WALLET,
  INITIAL_TRANSACTIONS,
  INITIAL_VOTES,
  INITIAL_AUDIT_LOGS,
  INITIAL_REGIONS,
  PAYMENT_METHODS,
} from './fixtures';

export interface ICompetitionService {
  list(): Promise<Competition[]>;
  getById(id: string): Promise<Competition | null>;
  create(data: Omit<Competition, 'id' | 'totalVotes' | 'totalTeams' | 'demoState'>): Promise<Competition>;
  updateStatus(id: string, status: Competition['status']): Promise<Competition | null>;
}

export interface ITeamService {
  listByCompetition(competitionId?: string): Promise<Team[]>;
  getById(id: string): Promise<Team | null>;
  create(data: Omit<Team, 'id' | 'rank' | 'verifiedVotes' | 'demoState'>): Promise<Team>;
}

export interface IWalletService {
  getSummary(userId: string): Promise<WalletSummary>;
  topUp(userId: string, amount: number, fee: number, method: string): Promise<{ wallet: WalletSummary; transaction: Transaction }>;
  getTransactions(userId?: string): Promise<Transaction[]>;
}

export interface IVotingService {
  previewCost(votesCount: number): { costRupiah: number; valid: boolean };
  submitVote(userId: string, competitionId: string, teamId: string, votesCount: number): Promise<{
    voteRecord: VoteRecord;
    updatedTeam: Team;
    updatedWallet: WalletSummary;
    transaction: Transaction;
  }>;
  listVotes(userId?: string): Promise<VoteRecord[]>;
}

export interface IAuthService {
  getCurrentUser(): User | null;
  login(email: string, password?: string): Promise<User>;
  logout(): Promise<void>;
  register(name: string, email: string): Promise<User>;
}

export interface IAdminService {
  getAuditLogs(): Promise<AuditLogItem[]>;
  getRegions(): Promise<Region[]>;
  getPaymentOptions(): Promise<PaymentOption[]>;
}

class MockStorage {
  // Auth-First: default sesi awal adalah null agar pengguna masuk via login
  currentUser: User | null = null;
  competitions: Competition[] = [...INITIAL_COMPETITIONS];
  teams: Team[] = [...INITIAL_TEAMS];
  wallet: WalletSummary = { ...INITIAL_WALLET };
  transactions: Transaction[] = [...INITIAL_TRANSACTIONS];
  votes: VoteRecord[] = [...INITIAL_VOTES];
  auditLogs: AuditLogItem[] = [...INITIAL_AUDIT_LOGS];
  regions: Region[] = [...INITIAL_REGIONS];

  private recalcRanks() {
    this.teams.sort((a, b) => b.verifiedVotes - a.verifiedVotes);
    this.teams = this.teams.map((t, idx) => ({ ...t, rank: idx + 1 }));
  }

  updateTeamVotes(teamId: string, addedVotes: number): Team {
    const target = this.teams.find((t) => t.id === teamId);
    if (!target) throw new Error('Team not found');
    target.verifiedVotes += addedVotes;
    this.recalcRanks();

    // Update competition total
    const comp = this.competitions.find((c) => c.id === target.competitionId);
    if (comp) comp.totalVotes += addedVotes;

    return { ...target };
  }
}

const storage = new MockStorage();

export const CompetitionService: ICompetitionService = {
  async list() {
    return [...storage.competitions];
  },
  async getById(id) {
    return storage.competitions.find((c) => c.id === id || c.slug === id) || null;
  },
  async create(data) {
    const comp: Competition = {
      ...data,
      id: `comp-${Date.now()}`,
      totalVotes: 0,
      totalTeams: 0,
      demoState: 'DEMO',
    };
    storage.competitions.push(comp);
    storage.auditLogs.unshift({
      id: `aud-${Date.now()}`,
      actorName: storage.currentUser?.name || 'Admin',
      actorRole: 'ADMIN',
      action: 'BUAT_KOMPETISI',
      entity: 'COMPETITION',
      details: `Menambahkan kompetisi baru: ${comp.name}`,
      timestamp: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB',
    });
    return comp;
  },
  async updateStatus(id, status) {
    const target = storage.competitions.find((c) => c.id === id);
    if (!target) return null;
    target.status = status;
    return { ...target };
  },
};

export const TeamService: ITeamService = {
  async listByCompetition(competitionId) {
    if (!competitionId) return [...storage.teams];
    return storage.teams.filter((t) => t.competitionId === competitionId);
  },
  async getById(id) {
    return storage.teams.find((t) => t.id === id) || null;
  },
  async create(data) {
    const nextRank = storage.teams.length + 1;
    const team: Team = {
      ...data,
      id: `team-${Date.now()}`,
      rank: nextRank,
      verifiedVotes: 0,
      demoState: 'DEMO',
    };
    storage.teams.push(team);
    const comp = storage.competitions.find((c) => c.id === team.competitionId);
    if (comp) comp.totalTeams += 1;
    return team;
  },
};

export const WalletService: IWalletService = {
  async getSummary(_userId) {
    return { ...storage.wallet };
  },
  async topUp(userId, amount, fee, method) {
    storage.wallet.balanceRupiah += amount;
    storage.wallet.estimatedVotes = Math.floor(storage.wallet.balanceRupiah / 1000);

    const tx: Transaction = {
      id: `trx-topup-${Date.now()}`,
      userId,
      kind: 'TOP_UP',
      title: 'Top Up Saldo E-Wallet',
      subtitle: `Metode: ${method}`,
      amountRupiah: amount,
      feeRupiah: fee,
      totalPaidRupiah: amount + fee,
      paymentMethod: method,
      status: 'SUCCESS',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB',
      referenceNumber: `QC-TOPUP-${Math.floor(100000 + Math.random() * 900000)}`,
      demoState: 'DEMO',
    };
    storage.transactions.unshift(tx);
    return { wallet: { ...storage.wallet }, transaction: tx };
  },
  async getTransactions(userId) {
    if (!userId) return [...storage.transactions];
    return storage.transactions.filter((t) => t.userId === userId);
  },
};

export const VotingService: IVotingService = {
  previewCost(votesCount: number) {
    const safeCount = Math.max(0, Math.floor(votesCount));
    return {
      costRupiah: safeCount * 1000,
      valid: safeCount > 0,
    };
  },
  async submitVote(userId, competitionId, teamId, votesCount) {
    const cost = votesCount * 1000;
    if (storage.wallet.balanceRupiah < cost) {
      throw new Error(`Saldo dompet tidak mencukupi (Perlu Rp${cost.toLocaleString('id-ID')})`);
    }

    // Deduct balance
    storage.wallet.balanceRupiah -= cost;
    storage.wallet.estimatedVotes = Math.floor(storage.wallet.balanceRupiah / 1000);

    // Add votes to team
    const updatedTeam = storage.updateTeamVotes(teamId, votesCount);

    const tx: Transaction = {
      id: `trx-vote-${Date.now()}`,
      userId,
      kind: 'VOTE',
      title: `Dukungan: ${updatedTeam.name}`,
      subtitle: `${updatedTeam.school} (${votesCount} Suara)`,
      amountRupiah: cost,
      feeRupiah: 0,
      totalPaidRupiah: cost,
      votesCount,
      teamId,
      teamName: updatedTeam.name,
      status: 'SUCCESS',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' WIB',
      referenceNumber: `QC-VOTE-${Math.floor(100000 + Math.random() * 900000)}`,
      demoState: 'DEMO',
    };
    storage.transactions.unshift(tx);

    const voteRecord: VoteRecord = {
      id: `vote-${Date.now()}`,
      userId,
      competitionId,
      teamId,
      teamName: updatedTeam.name,
      contingentNumber: updatedTeam.contingentNumber,
      votesCount,
      costRupiah: cost,
      createdAt: tx.date,
      status: 'VERIFIED_DEMO',
    };
    storage.votes.unshift(voteRecord);

    return {
      voteRecord,
      updatedTeam,
      updatedWallet: { ...storage.wallet },
      transaction: tx,
    };
  },
  async listVotes(userId) {
    if (!userId) return [...storage.votes];
    return storage.votes.filter((v) => v.userId === userId);
  },
};

export const AuthService: IAuthService = {
  getCurrentUser() {
    return storage.currentUser;
  },
  async login(email, password = '') {
    const trimmedEmail = email.trim().toLowerCase();

    // Validasi kredensial demo
    if (password && password.length < 4) {
      throw new Error('Kata sandi minimal 4 karakter.');
    }

    // Penentuan role akun otomatis berdasarkan identitas kredensial
    // Email yang mengandung 'admin' atau berakhiran @quickcountpaskib.id -> ADMIN
    if (trimmedEmail.includes('admin') || trimmedEmail.endsWith('@quickcountpaskib.id')) {
      storage.currentUser = {
        ...INITIAL_ADMIN,
        email: trimmedEmail,
        name: trimmedEmail === INITIAL_ADMIN.email ? INITIAL_ADMIN.name : 'Administrator Panitia',
      };
    } else {
      // Seluruh akun lainnya otomatis menjadi USER (Pemilih)
      storage.currentUser = {
        ...INITIAL_USER,
        email: trimmedEmail,
        name: trimmedEmail === INITIAL_USER.email ? INITIAL_USER.name : 'Pemilih Paskibra',
      };
    }

    return storage.currentUser;
  },
  async logout() {
    storage.currentUser = null;
  },
  async register(name, email) {
    const trimmedEmail = email.trim().toLowerCase();
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: trimmedEmail,
      role: 'USER',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    storage.currentUser = newUser;
    return newUser;
  },
};

export const AdminService: IAdminService = {
  async getAuditLogs() {
    return [...storage.auditLogs];
  },
  async getRegions() {
    return [...storage.regions];
  },
  async getPaymentOptions() {
    return [...PAYMENT_METHODS];
  },
};
