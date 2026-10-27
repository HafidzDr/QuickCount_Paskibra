import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { Leaderboard } from '../../components/Leaderboard';
import { Team } from '../../types';

export const LeaderboardPage: React.FC = () => {
  const { teams, currentUser } = useApp();
  const navigate = useNavigate();

  const handleSelectTeamToVote = (team: Team) => {
    if (!currentUser) {
      navigate(`/login?redirect=/app/vote/${team.competitionId}/${team.id}`);
    } else {
      navigate(`/app/vote/${team.competitionId}/${team.id}`);
    }
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <Leaderboard teams={teams} onSelectTeamToVote={handleSelectTeamToVote} />
    </div>
  );
};
