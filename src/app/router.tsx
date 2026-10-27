import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './providers';

// Layouts
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Auth Pages (Split Screen Login)
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';

// User Workspace (Dashboard Utama Kompetisi & Klasemen)
import { UserDashboardPage } from '../pages/user/UserDashboardPage';
import { CompetitionDetailPage } from '../pages/user/CompetitionDetailPage';
import { VotingFlowPage } from '../pages/user/VotingFlowPage';
import { WalletPage } from '../pages/user/WalletPage';
import { TopUpPage } from '../pages/user/TopUpPage';
import { TransactionsPage } from '../pages/user/TransactionsPage';
import { ProfilePage } from '../pages/user/ProfilePage';

// Admin Workspace
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminCompetitionsPage } from '../pages/admin/AdminCompetitionsPage';
import { AdminTeamsPage } from '../pages/admin/AdminTeamsPage';
import { AdminVotesPage } from '../pages/admin/AdminVotesPage';
import { AdminPaymentsPage } from '../pages/admin/AdminPaymentsPage';
import { AdminReportsPage } from '../pages/admin/AdminReportsPage';

// Protected Route Guard for User Workspace
const UserProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isLoading } = useApp();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-paper)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Memuat sesi QuickCount Paskib...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Protected Route Guard for Admin Workspace
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isLoading } = useApp();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-paper)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Memuat sesi Admin...
        </div>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <Navigate to="/login?redirect=/admin" replace />;
  }

  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* 1. Root & Auth Routes: Tampilan Login Minimalis Split-Screen (Murni tanpa Navbar/Footer) */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Redirect rute legacy publik ke dashboard terautentikasi */}
      <Route path="/competitions" element={<Navigate to="/app" replace />} />
      <Route path="/teams" element={<Navigate to="/app" replace />} />
      <Route path="/leaderboard" element={<Navigate to="/app" replace />} />

      {/* 2. User Workspace Group: Dashboard Utama & Detail Kompetisi */}
      <Route
        path="/app"
        element={
          <UserProtectedRoute>
            <UserLayout />
          </UserProtectedRoute>
        }
      >
        <Route index element={<UserDashboardPage />} />
        <Route path="competitions/:competitionId" element={<CompetitionDetailPage />} />
        <Route path="vote/:competitionId/:teamId" element={<VotingFlowPage />} />
        <Route path="wallet" element={<WalletPage />} />
        <Route path="wallet/top-up" element={<TopUpPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 3. Admin Workspace Group: Dashboard Operasional */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="competitions" element={<AdminCompetitionsPage />} />
        <Route path="teams" element={<AdminTeamsPage />} />
        <Route path="votes" element={<AdminVotesPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
