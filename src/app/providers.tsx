import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, WalletSummary, Team, Competition, Transaction, VoteRecord } from '../types';
import {
  AuthService,
  WalletService,
  TeamService,
  CompetitionService,
  VotingService,
} from '../mocks/mockServices';

interface AppContextType {
  currentUser: User | null;
  wallet: WalletSummary;
  teams: Team[];
  competitions: Competition[];
  transactions: Transaction[];
  votes: VoteRecord[];
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<User>;
  logout: () => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  topUp: (amount: number, fee: number, method: string) => Promise<void>;
  voteForTeam: (competitionId: string, teamId: string, votesCount: number) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(AuthService.getCurrentUser());
  const [wallet, setWallet] = useState<WalletSummary>({ userId: 'usr-101', balanceRupiah: 0, estimatedVotes: 0, demoState: 'DEMO' });
  const [teams, setTeams] = useState<Team[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [votes, setVotes] = useState<VoteRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadAll = async () => {
    setIsLoading(true);
    try {
      const [allTeams, allComps, allTxs, allVotes] = await Promise.all([
        TeamService.listByCompetition(),
        CompetitionService.list(),
        WalletService.getTransactions(),
        VotingService.listVotes(),
      ]);
      setTeams(allTeams);
      setCompetitions(allComps);
      setTransactions(allTxs);
      setVotes(allVotes);

      if (currentUser) {
        const wal = await WalletService.getSummary(currentUser.id);
        setWallet(wal);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const login = async (email: string, password?: string) => {
    const user = await AuthService.login(email, password);
    setCurrentUser(user);
    const wal = await WalletService.getSummary(user.id);
    setWallet(wal);
    return user;
  };

  const logout = async () => {
    await AuthService.logout();
    setCurrentUser(null);
  };

  const register = async (name: string, email: string) => {
    const user = await AuthService.register(name, email);
    setCurrentUser(user);
    const wal = await WalletService.getSummary(user.id);
    setWallet(wal);
  };

  const topUp = async (amount: number, fee: number, method: string) => {
    if (!currentUser) throw new Error('Harus login terlebih dahulu.');
    const result = await WalletService.topUp(currentUser.id, amount, fee, method);
    setWallet(result.wallet);
    setTransactions((prev) => [result.transaction, ...prev]);
  };

  const voteForTeam = async (competitionId: string, teamId: string, votesCount: number) => {
    if (!currentUser) throw new Error('Harus login untuk memberikan suara.');
    const result = await VotingService.submitVote(currentUser.id, competitionId, teamId, votesCount);
    setWallet(result.updatedWallet);
    setTransactions((prev) => [result.transaction, ...prev]);
    setVotes((prev) => [result.voteRecord, ...prev]);

    // Update local teams rank and list
    const updatedTeams = await TeamService.listByCompetition();
    setTeams(updatedTeams);
  };

  const refreshData = async () => {
    await loadAll();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        wallet,
        teams,
        competitions,
        transactions,
        votes,
        isLoading,
        login,
        logout,
        register,
        topUp,
        voteForTeam,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
};
