import React, { useState, useEffect } from 'react';
import teamService from '../../services/teamsService';
import { addTeamParticipationRequest } from '../../services/challengeService';
import { useParams } from 'react-router-dom';

const TeamsList: React.FC = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { id } = useParams();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamService.getMyTeams();
      setTeams(response); 
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleJoinRequest = async () => {
    if (!selectedTeam) {
      setErrorMessage('Please select a team');
      return;
    }
    try {
      // Send the join request to the backend
      await addTeamParticipationRequest(id, selectedTeam._id);
      // Optionally, you can update the UI to indicate success
      setSuccessMessage('Join request sent successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear message after 3 seconds
    } catch (error:any) {
      setErrorMessage(error.response.data.message);
      console.error('Error sending join request:', error);
    }
  };

  const handleTeamSelect = (team: any) => {
    setSelectedTeam(team);
  };

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Existing Teams</h3>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search teams..."
        className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
      />
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}
      {selectedTeam && (
        <div className="mb-4">
         Join with              
          <span className='capitalize text-primary font-semibold'> {selectedTeam.name}</span>
          <button onClick={handleJoinRequest} className="ml-2 px-4 py-1 bg-primary font-semibold text-white rounded-full ">
            Join
          </button>
        </div>
      )}
      <div className='max-h-40 overflow-y-auto'>
        <ul className="divide-y divide-gray-200">
          {filteredTeams.map((team) => (
            <li key={team.id} className="py-2">
              <button onClick={() => handleTeamSelect(team)} className="mr-2 px-2 py-1 bg-gray-200 text-gray-800 rounded">
            <div className="flex">
            <img src={team.imageUrl } alt="profile" className="rounded-full mr-2 max-h-8 w-8 mr-2 " />{team.name}
            </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamsList;
