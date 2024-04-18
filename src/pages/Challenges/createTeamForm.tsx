// CreateTeamForm.tsx
import React, { useState, useEffect, useRef } from 'react';
import teamService from '../../services/teamsService';
import { getAllChallengers } from '../../services/user.service';
import { useAuth } from '../../components/Auth/AuthProvider';

interface Props {
  onCreateTeamSuccess: () => void;
  onReturn?: () => void;
}

const CreateTeamForm: React.FC<Props> = ({ onCreateTeamSuccess, onReturn }) => {
  const [newTeamData, setNewTeamData] = useState({
    name: '',
    selectedChallengers: [] as any[],
  });

  const [challengers, setChallengers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {userAuth} = useAuth();
  useEffect(() => {
    // Fetch list of challengers when component mounts
    fetchChallengers();
    // Add event listener to handle click outside the dropdown
    document.addEventListener('click', handleClickOutside);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const fetchChallengers = async () => {
    try {
      const response = await getAllChallengers();
     
      setChallengers( response.filter((challenger:any) => challenger._id !== userAuth?._id));
    } catch (error) {
      console.error('Error fetching challengers:', error);
      setErrorMessage('Error fetching challengers. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTeamData({ ...newTeamData, [name]: value });
  };

  const handleChallengerSelect = (challenger: any) => {
    const isAlreadySelected = newTeamData.selectedChallengers.some(selectedChallenger => selectedChallenger._id === challenger._id);
    if (!isAlreadySelected) {
      setNewTeamData({ ...newTeamData, selectedChallengers: [...newTeamData.selectedChallengers, challenger] });
    }
  };
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChallengerDeselect = (challengerId: string) => {
    const updatedChallengers = newTeamData.selectedChallengers.filter(challenger => challenger._id !== challengerId);
    setNewTeamData({ ...newTeamData, selectedChallengers: updatedChallengers });
  };
  
  const handleCreateTeam = async () => {
    try {
      await teamService.createTeam(newTeamData);
      onCreateTeamSuccess();
    } catch (error:any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const filteredChallengers = challengers.filter(challenger =>
    challenger.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <input
        type="text"
        name="name"
        value={newTeamData.name}
        onChange={handleInputChange}
        placeholder="Team Name"
        className="w-full border border-gray-300 rounded py-2 px-3 mb-3"
      />
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleToggleDropdown}
          placeholder="Search challengers..."
          className="w-full border border-gray-300 rounded py-2 px-3 mb-3"
        />
        {isOpen && (
          <div className="absolute bg-white shadow-md w-full mt-1 rounded-md overflow-y-auto max-h-40">
            <ul>
              {filteredChallengers.map(challenger => (
                <li key={challenger._id}>

                  <button onClick={() => handleChallengerSelect(challenger)} className="w-full flex text-left py-2 px-3 hover:bg-gray-200">
                  <img src={challenger.imageUrl } alt="profile" className="rounded-full max-h-8 w-8 mr-2" />

                    {challenger.FirstName} {challenger.LastName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className=" rounded p-3 mt-4 max-h-40 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Selected Challengers:</h2>
        <ul>
          {newTeamData.selectedChallengers.map(challenger => (
            <li key={challenger._id} className="flex items-center justify-between border-b py-2 border-gray-300">
             <div className="flex">
             <img src={challenger.imageUrl } alt="profile" className="rounded-full mr-2 max-h-8 w-8 " />
              <span>{challenger.FirstName} {challenger.LastName}</span>
             </div>
              <button onClick={() => handleChallengerDeselect(challenger._id)} className="text-white text-xs font-semibold p-2 rounded-full bg-red-500">Deselct</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-4">
      <button onClick={handleCreateTeam} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Create Team</button>

        <button onClick={onReturn}  className="text-blue-500 hover:underline">Return</button>
      </div>
    </div>
  );
};

export default CreateTeamForm;
