import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../app/providers';
import { TeamDirectory } from '../../components/TeamDirectory';
import { Team } from '../../types';

export const TeamsPage: React.FC = () => {
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
      <TeamDirectory teams={teams} onSelectTeamToVote={handleSelectTeamToVote} />
    </div>
  );
};
