import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import teamService from '../../services/teamsService';
import { getAllChallengers } from '../../services/user.service';
import { useAuth } from '../../components/Auth/AuthProvider';

interface EditTeamModalProps {
  onClose: () => void;
  teamId: string;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({ onClose, teamId }) => {
  const [name, setName] = useState<string>('');
  const [selectedChallengers, setSelectedChallengers] = useState<any[]>([]);
  const [availableChallengers, setAvailableChallengers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>();
  const [isPrivate, setIsPrivate] = useState<boolean>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userAuth } = useAuth();
  const [isOpen,setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch list of challengers when component mounts
    fetchTeamDetails();
    // Add event listener to handle click outside the dropdown
    document.addEventListener('click', handleClickOutside);
    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

    const fetchTeamDetails = async () => {
      try {
        const teamDetails = await teamService.getTeamById(teamId);
        setName(teamDetails.name);
        setIsChecked(teamDetails.private);
    
        const combinedSelectedChallengers = [...teamDetails.members, ...teamDetails.invitations];
    
        const selectedChallengersWithTypes = combinedSelectedChallengers.map(challenger => ({
          ...challenger,
          type: teamDetails.members?.some((member:any) => member._id === challenger._id) ? 'member' : 'invitation'
        }));
    
        setSelectedChallengers(selectedChallengersWithTypes);
    
        const response = await getAllChallengers();
        const allChallengers = response.filter(
          (challenger: any) => challenger._id !== userAuth?._id && !teamDetails.members.some((selected: any) => selected._id === challenger._id) &&!teamDetails.invitations.some((selected: any) => selected._id === challenger._id)
        );
        setAvailableChallengers(allChallengers);
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
      
    };
    
    
  
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  const handleChallengerSelect = (challenger: any) => {
    setSelectedChallengers((prevSelected) => [...prevSelected, challenger]);
    setAvailableChallengers((prevAvailable) => prevAvailable.filter((avail) => avail._id !== challenger._id));
  };

  const handleChallengerDeselect = (challengerId: string) => {
    const deselectedChallenger = selectedChallengers.find((challenger) => challenger._id === challengerId);
    if (deselectedChallenger) {
      setAvailableChallengers((prevAvailable) => [...prevAvailable, deselectedChallenger]);
    }
    setSelectedChallengers((prevSelected) =>
      prevSelected.filter((challenger) => challenger._id !== challengerId)
    );
  };

  const handleSearchChallengers = (query: string) => {
    setSearchQuery(query);
        const filteredChallengers = availableChallengers.filter(
      (challenger) =>
        `${challenger.FirstName} ${challenger.LastName}`
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    setAvailableChallengers(filteredChallengers);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEditTeam = async () => {
    try {
      // Make an API call to update the team with the new details
      await teamService.editTeam(teamId,  name,  selectedChallengers,isPrivate );
      // Close the modal after editing
      onClose();
    } catch (error) {
      console.error('Error editing team:', error);
    }
  };
  const filteredChallengers = availableChallengers.filter((challenger) =>
    challenger.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 overflow-y-auto z-9999 mt-8" >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-lg font-bold mb-4">Edit Team</h2>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Team Name"
              className="w-full capitalize rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-2"
            />
            <div>
              <h2 className="text-lg font-bold mb-2">Select Challengers:</h2>
              <div className="relative" ref={dropdownRef}>
                <input 
                  type="text"
                  name="searchChallengers"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleToggleDropdown}
                  placeholder="Search challengers..."
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-2"
                />
                {isOpen &&
                   <ul className="absolute bg-white shadow-md w-full mt-1 rounded-md overflow-y-auto max-h-40 z-99999">
                   {filteredChallengers.map((challenger) => (
                     <li key={challenger._id}>
                       <button onClick={() => handleChallengerSelect(challenger)} className="capitalize w-full flex text-left py-2 px-3 hover:bg-gray-200">
                         <img src={challenger.imageUrl} alt="profile" className="rounded-full max-h-8 w-8 mr-2" />
                         {`${challenger.FirstName} ${challenger.LastName}`}
                       </button>
                     </li>
                   ))}
                 </ul>
                }
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
                  setIsPrivate(!isChecked);
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
              <div className="rounded p-3 mt-4 max-h-25 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-2 text-black">Selected Challengers:</h2>
                <ul>
                  {selectedChallengers.map((challenger) => (
                    <li key={challenger._id} className="flex items-center justify-between border-b py-2 border-gray-300">
                      <div className="flex">
                        <img src={challenger.imageUrl} alt="profile" className="rounded-full mr-2 max-h-8 w-8 " />
                        <span className='capitalize'>{challenger.FirstName} {challenger.LastName}</span>
                      </div>
                     <div>
                     {challenger.type == "member" ? 
                      (<span className='bg-green-500 text-white font-semibold rounded-full text-xs px-2 py-1'>Member</span> ):
                      (<span className='bg-orange-500 text-white font-semibold rounded-full  text-xs mx-2 px-2 py-1'>Invitation sent</span>)
                      }
                      <button onClick={() => handleChallengerDeselect(challenger._id)} className="text-white text-xs font-semibold px-2 py-1 rounded-full bg-red-500">Deselect</button>
                     </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button  type="button" onClick={handleEditTeam} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              Save Changes
            </button>
            <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTeamModal;
