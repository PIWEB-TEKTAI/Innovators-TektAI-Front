import React, { useEffect, useState } from 'react';
import teamService from '../../services/teamsService';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useNavigate } from 'react-router-dom';
import CreateTeamModal from './CreateTeamModal';
import EditTeamModal from './EditTeamModal';
import EditTeamForm from './EditTeamModal';
import Modal from '../../components/modal';
import { useAuth } from '../../components/Auth/AuthProvider';

const MyTeams = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAdvancedSettingsMap, setShowAdvancedSettingsMap] = useState<any>({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedteam, setSelectedTeam] = useState<any>();
  const [showDeleteConfirmationModal,setShowDeleteConfirmationModal] =useState<boolean>(false);
  const {userAuth} = useAuth();
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await teamService.getMyTeams();
        setTeams(teamsData);
        // Initialize showAdvancedSettingsMap with default values
        const initialSettingsMap: { [key: string]: boolean } = {};
        teamsData.forEach((team:any) => {
          initialSettingsMap[team._id] = false;
        });
        setShowAdvancedSettingsMap(initialSettingsMap);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const navigateToTeamDetails = (teamId: any) => {
    navigate(`/teams/teamDetails/${teamId}`);
  };

  const handleToggleAdvancedSettings = (teamId: string) => {
    setShowAdvancedSettingsMap((prevSettingsMap) => ({
      ...prevSettingsMap,
      [teamId]: !prevSettingsMap[teamId],
    }));
  };
  
  const handleToggleEditModal = (team:any) => {
    setSelectedTeam(team);
    setShowEditModal(true); 
    setShowAdvancedSettingsMap(false);// Show the edit modal
  };

  return (
    <ConnectedClientLayout>
      {showDeleteConfirmationModal&&        
      <Modal
        showModal={showDeleteConfirmationModal}
        setShowModal={setShowDeleteConfirmationModal}
        title="Delete Team"
        content="Are you sure you want to delete this Team?"
      />}
      {showCreateModal && <CreateTeamModal onClose={() => setShowCreateModal(false)} />}
      {showEditModal &&  <EditTeamModal teamId={selectedteam._id} onClose={() => setShowEditModal(false)} />} {/* Render EditTeamModal */}

      <div className='bg-white rounded-lg p-4'>
        <div className="flex justify-between items-center mb-4">
          <h2 className='text-black font-semibold'>My Teams</h2>
          <button onClick={() => setShowCreateModal(true)} className="text-md p-2 bg-primary border border-gray-500 rounded-md text-white  font-semibold group">Create A New Team</button>
        </div>
        <div className="grid sm:grid-cols-3 sm:gap-4 grid-cols-1">
          {teams.map(team => (
            <div key={team._id} className="cursor-pointer my-4 rounded-lg bg-gray-50 p-2 relative" >
             {team.leader == userAuth._id &&  
             <div className="flex justify-end ">
                <button onClick={() => handleToggleAdvancedSettings(team._id)} className="text-md p-2 rounded-md text-gray-700 font-semibold rotate-90 ">
                  ...
                </button>
                {showAdvancedSettingsMap[team._id] && (
                  <div className="absolute z-9999 top-0 left-full mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={() => handleToggleEditModal(team)}>Edit</button>
                      <button className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left" onClick={
                        ()=>{
                          setShowDeleteConfirmationModal(!showDeleteConfirmationModal)
                          setShowAdvancedSettingsMap(false)
                        }

                      }>Delete</button>
                    </div>
                  </div>
                )}
              </div>}
              <div className="flex flex-col items-center py-2">
                <div onClick={() => navigateToTeamDetails(team._id)}>
                  <img src={team.imageUrl} alt="profile" className="rounded-full mr-2 my-2 max-h-16 w-16 mr-2" />
                  <h3 className='text-black font-semibold capitalize'>{team.name}</h3>
                </div>
                <ul>
                  {team.members.map((member: any) => (
                    <li key={member._id}>{member.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConnectedClientLayout>
  );
};

export default MyTeams;
