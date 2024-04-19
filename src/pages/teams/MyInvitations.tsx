import React, { useEffect, useState } from 'react';
import teamService from '../../services/teamsService';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useNavigate } from 'react-router-dom';

const MyInvitations = () => {
  const [invitations, setInvitations] = useState<any[]>([]);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const invitationsData = await teamService.getInvitationsForChallenger();
        setInvitations(invitationsData);
      } catch (error) {
        console.error('Error fetching invitations:', error);
      }
    };

    fetchInvitations();
  }, []);
  const navigateToTeamDetails = (teamId:any) => {
    const navigate = useNavigate();
    navigate(`/teams/teamDetails/${teamId}`);
  };
  return (
    <ConnectedClientLayout>
          <div className=' bg-white rounded-lg p-4'>
      <h2>Invitations</h2>
      {invitations.map(invitation => (
        <div key={invitation._id}>
       <div className="flex justify-around items-center my-4 rounded-full bg-gray-50 p-4 max-w-[90%]">
           <div className="flex" onClick={()=>navigateToTeamDetails(invitation._id)}>
           <img src={invitation.imageUrl} alt="profile" className="rounded-full mr-2 max-h-8 w-8 mr-2" />
            <h3 className='text-black font-semibold'>{invitation.name}</h3>
           </div>
            
            <div className="flex  justify-end ml-auto">
                <button className="mr-2 bg-green-500 text-white font-semibold text-xs rounded-full px-2 py-1">Accept</button>
                <button className='bg-red-500 text-white font-semibold text-xs rounded-full px-2 py-1'>Reject</button>
            </div>
            </div>

          <ul>
            {invitation.members.map((member:any) => (
              <li key={member._id}>{member.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </ConnectedClientLayout>
  );
};

export default MyInvitations;
