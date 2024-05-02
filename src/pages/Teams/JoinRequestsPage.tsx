import React, { useEffect, useState } from 'react';
import teamService from '../../services/teamsService';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthProvider';
import JoinRequests from './JoinRequests';

const JoinRequestsPage = () => {
  const [team, setTeam] = useState<any>(null);
  const [loading, setLoading] = useState(true); // State to track loading status
  const navigate = useNavigate();
  const { userAuth } = useAuth();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamData = await teamService.findTeamByLeader(userAuth?._id);
        setTeam(teamData);
        setLoading(false); // Set loading to false when data is fetched successfully
      } catch (error) {
        console.error('Error fetching invitations:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchTeam();
  }, [userAuth]);

  // Render loading indicator if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render JoinRequests component only when team data is available
  return (
    <ConnectedClientLayout>
      <div className='bg-white rounded-lg p-4'>
        <h2 className='text-black font-semibold'>Team / Join Requests</h2>
        {team && <JoinRequests team={team} />}
      </div>
    </ConnectedClientLayout>
  );
};

export default JoinRequestsPage;
