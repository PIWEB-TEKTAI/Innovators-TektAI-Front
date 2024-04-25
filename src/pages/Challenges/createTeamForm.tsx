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
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [newTeamData, setNewTeamData] = useState({
    name: '',
    selectedChallengers: [] as any[],
    private: false, // Initialize private as false
  });

  const [challengers, setChallengers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [selectMembersError, setSelectMembersError] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userAuth } = useAuth();

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
      setChallengers(response.filter((challenger: any) => challenger._id !== userAuth?._id));
    } catch (error) {
      console.error('Error fetching challengers:', error);
      setErrorMessage('Error fetching challengers. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name' && value === '') {
      setTitleError('Team name is required.');
    } else if (name === 'name' && value !== '') {
      setTitleError('');
    }
    setNewTeamData({ ...newTeamData, [name]: value });
  };

  const handleChallengerSelect = (challenger: any) => {
    const isAlreadySelected = newTeamData.selectedChallengers.some(
      (selectedChallenger) => selectedChallenger._id === challenger._id
    );
    if (!isAlreadySelected) {
      setNewTeamData({
        ...newTeamData,
        selectedChallengers: [...newTeamData.selectedChallengers, challenger],
      });
    }
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChallengerDeselect = (challengerId: string) => {
    const updatedChallengers = newTeamData.selectedChallengers.filter(
      (challenger) => challenger._id !== challengerId
    );
    setNewTeamData({ ...newTeamData, selectedChallengers: updatedChallengers });
    if (newTeamData.selectedChallengers.length === 0) {
      setSelectMembersError('You should select at least one member.');
    } else if (newTeamData.selectedChallengers.length !== 0) {
      setSelectMembersError('');
    }
  };

  const handleCreateTeam = async () => {
    try {
      await teamService.createTeam(newTeamData);
      onCreateTeamSuccess();
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const filteredChallengers = challengers.filter((challenger) =>
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
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-2"
      />
      {titleError && <div className="text-red-500 mb-4">{titleError}</div>}
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          name="selectTeamMembers"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleToggleDropdown}
          placeholder="Search challengers..."
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-2 "
        />
        {selectMembersError && <div className="text-red-500 mb-4">{selectMembersError}</div>}
        {isOpen && (
          <div className="absolute bg-white shadow-md w-full mt-1 rounded-md overflow-y-auto max-h-40 z-99999">
            <ul>
              {filteredChallengers.map((challenger) => (
                <li key={challenger._id}>
                  <button onClick={() => handleChallengerSelect(challenger)} className=" capitalize w-full flex text-left py-2 px-3 hover:bg-gray-200">
                    <img src={challenger.imageUrl} alt="profile" className=" rounded-full max-h-8 w-8 mr-2" />
                    {challenger.FirstName} {challenger.LastName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="text-black mt-2">
          Visibility:
          <label
            htmlFor="checkboxLabelPrivate"
            className="flex cursor-pointer select-none items-center mt-2"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="checkboxLabelPrivate"
                className="sr-only"
                onChange={() => {
                  setIsChecked(!isChecked);
                  setNewTeamData({ ...newTeamData, private: !isChecked });
                }}
              />
              <div
                className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                  isChecked && 'border-primary bg-gray dark:bg-transparent'
                }`}
              >
                <span className={`opacity-0 ${isChecked && '!opacity-100'}`}>
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                      fill="#3056D3"
                      stroke="#3056D3"
                      strokeWidth="0.4"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            Private
          </label>
        </div>
      </div>

      <div className="rounded p-3 mt-4 max-h-20 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2 text-black">Selected Challengers:</h2>
        <ul>
          {newTeamData.selectedChallengers.map((challenger) => (
            <li key={challenger._id} className="flex items-center justify-between border-b py-2 border-gray-300">
              <div className="flex">
                <img src={challenger.imageUrl} alt="profile" className="rounded-full mr-2 max-h-8 w-8 " />
                <span className='capitalize'>{challenger.FirstName} {challenger.LastName}</span>
              </div>
              <button onClick={() => handleChallengerDeselect(challenger._id)} className="text-white text-xs font-semibold p-2 rounded-full bg-red-500">Deselct</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between mt-4">
        <button onClick={handleCreateTeam} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Create Team</button>
        <button onClick={onReturn} className="text-blue-500 hover:underline">Return</button>
      </div>
    </div>
  );
};

export default CreateTeamForm;
