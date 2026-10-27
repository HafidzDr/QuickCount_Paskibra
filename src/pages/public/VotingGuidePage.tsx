import React from 'react';
import { VotingExplainer } from '../../components/VotingExplainer';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../app/providers';

export const VotingGuidePage: React.FC = () => {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem 0' }}>
      <VotingExplainer onStartTopUp={() => navigate(currentUser ? '/app/wallet/top-up' : '/login?redirect=/app/wallet/top-up')} />
    </div>
  );
};
