import React, { useState, useEffect } from 'react';
import teamService from '../../services/teamsService';

interface Team {
  id: string;
  name: string;
}

const TeamsList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamService.getAllTeams();
      setTeams(response); 
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
        className="w-full border rounded py-2 px-3 mb-4"
      />
      <div className='max-h-40 overflow-y-auto'>
        <ul className="divide-y divide-gray-200">
          {filteredTeams.map((team) => (
            <li key={team.id} className="py-2">
              {team.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamsList;
