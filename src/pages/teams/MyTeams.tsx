import React, { useEffect, useState } from 'react';
import teamService from '../../services/teamsService';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useNavigate } from 'react-router-dom';

const MyTeams = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const navigate = useNavigate(); // Move useNavigate hook here

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await teamService.getMyTeams(); // Assuming you have a service method to fetch your teams
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const navigateToTeamDetails = (teamId: any) => {
    navigate(`/teams/teamDetails/${teamId}`);
  };

  return (
    <ConnectedClientLayout>
      <div className='bg-white rounded-lg p-4'>
        <h2>My Teams</h2>
        <div className="grid sm:grid-cols-3 sm:gap-4 grid-cols-1">
          {teams.map(team => (
            <div key={team._id} className="cursor-pointer" onClick={() => navigateToTeamDetails(team._id)}>
              <div className="flex flex-col items-center my-4 rounded-lg bg-gray-50 p-4 ">
                <img src={team.imageUrl} alt="profile" className="rounded-full mr-2 my-2 max-h-16 w-16 mr-2" />
                <h3 className='text-black font-semibold capitalize'>{team.name}</h3>
              </div>
              <ul>
                {team.members.map((member: any) => (
                  <li key={member._id}>{member.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default MyTeams;
