import React, { useState, useEffect, useRef } from 'react';
import teamService from '../../services/teamsService';
import { getAllChallengers } from '../../services/user.service';
import { useAuth } from '../../components/Auth/AuthProvider';

interface Props {
  team: any;
  onClose: () => void;
}

const InviteMembersForm: React.FC<Props> = ({ onClose, team }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [newInvitations, setNewInvitations] = useState({
    selectedChallengers: [] as any[],
    emailInvitations: [] as any[],
  });

  const [challengers, setChallengers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [selectMembersError, setSelectMembersError] = useState('');
  const [emailInvitation, setEmailInvitation] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userAuth } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [EmailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleAddEmail = () => {
    if (email.trim() !== '') {
      setEmails([...emails, email]);
      setEmail(''); // Clear the input field after adding the email
    }
    setNewInvitations({
      ...newInvitations,
      emailInvitations: [...emails, email],
    });
  };

  const handleDeleteEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
    setNewInvitations({
      ...newInvitations,
      emailInvitations: newEmails,
    });
  };

  useEffect(() => {
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

  const handleChallengerSelect = (challenger: any) => {
    const isAlreadySelected = newInvitations.selectedChallengers.some(
      (selectedChallenger) => selectedChallenger._id === challenger._id
    );
    if (!isAlreadySelected) {
      setNewInvitations({
        ...newInvitations,
        selectedChallengers: [...newInvitations.selectedChallengers, challenger],
      });
    }
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChallengerDeselect = (challengerId: string) => {
    const updatedChallengers = newInvitations.selectedChallengers.filter(
      (challenger) => challenger._id !== challengerId
    );
    setNewInvitations({ ...newInvitations, selectedChallengers: updatedChallengers });
    if (newInvitations.selectedChallengers.length === 0) {
      setSelectMembersError('You should select at least one member.');
    } else if (newInvitations.selectedChallengers.length !== 0) {
      setSelectMembersError('');
    }
  };

  const handleInviteMembers = async () => {
    try {
      await teamService.inviteMembers(team._id, newInvitations.selectedChallengers, newInvitations.emailInvitations);
      setSuccessMessage('Invitation sent successfully.');
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

  const checkEmail = (value: any) => {
    setEmail(value);
    if (!value.trim()) {
      setEmailError('Please enter your email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="fixed z-9999 mt-4 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Invite Members
                </h3>
                <div className="p-4">
                  {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                  {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
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
                    <div>
                      <div className="sm:flex items-center">
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => checkEmail(e.target.value)}
                          placeholder="Invite members by email"
                          className="flex-grow rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-2"
                        />
                        <button onClick={handleAddEmail}
                          className='rounded-md p-3 mb-2 mx-2 bg-primary text-white text-sm font-semibold disabled:bg-opacity-60'
                          disabled={EmailError !== ""}
                        >
                          Add Email
                        </button>
                      </div>
                      {EmailError && <p className="error-msg">{EmailError}</p>}
                      <ul className='flex flex flex-wrap'>
                        {emails.map((email, index) => (
                          <li key={index} className='flex items-center m-1 bg-gray-200 rounded-full text-primary font-semibold py-1 px-2'>
                            {email} <button className='ml-1 text-red-500' onClick={() => handleDeleteEmail(index)}>x</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded p-3 mt-4 max-h-20 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-2 text-black">Selected Challengers:</h2>
                    <ul>
                      {newInvitations.selectedChallengers.map((challenger) => (
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
                    <button
                     disabled={emails.length === 0 && newInvitations.selectedChallengers.length === 0}

                     onClick={handleInviteMembers} className="bg-primary bg-opacity-95 hover:bg-opacity-100 disabled:bg-opacity-60 text-white py-2 px-4 rounded">Invite Members</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
            onClick={onClose}
             className="w-full bg-primary inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteMembersForm;
