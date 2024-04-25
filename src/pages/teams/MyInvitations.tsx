import React, { useEffect, useState } from 'react';
import teamService from '../../services/teamsService';
import ConnectedClientLayout from '../../layout/ConnectedClientLayout';
import { useNavigate } from 'react-router-dom';

const MyInvitations = () => {
  const [invitations, setInvitations] = useState<any[]>([]);
  const navigate = useNavigate(); // Move useNavigate hook here

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

  const navigateToTeamDetails = (teamId: any) => {
    navigate(`/teams/teamDetails/${teamId}`);
  };

  const acceptInvitation = async (teamId: any) => {
    try {
      await teamService.acceptInvitation(teamId);
      const updatedInvitations = await teamService.getInvitationsForChallenger();
      setInvitations(updatedInvitations);
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };

  const rejectInvitation = async (teamId: any) => {
    try {
      await teamService.declineInvitation(teamId);
      const updatedInvitations = await teamService.getInvitationsForChallenger();
      setInvitations(updatedInvitations);
    } catch (error) {
      console.error('Error rejecting invitation:', error);
    }
  };

  return (
    <ConnectedClientLayout>
      <div className='bg-white rounded-lg p-4'>
        <h2 className='text-black font-semibold'>My Invitations</h2>
        {invitations.map(invitation => (
          <div key={invitation._id}>
            <div className="flex items-center my-4 rounded-full bg-gray-50 p-4 max-w-[85%]">
              <div className="flex cursor-pointer items-center" onClick={() => navigateToTeamDetails(invitation._id)}>
                <img src={invitation.imageUrl} alt="profile" className="rounded-full mr-2 max-h-10 w-10 mr-2" />
                <h3 className='text-black font-semibold capitalize'>{invitation.name}</h3>
              </div>
              <div className="flex justify-end ml-auto">
                <button onClick={() => acceptInvitation(invitation._id)} className="mr-2 bg-green-500 text-white font-semibold text-sm rounded-full px-2 py-1">Accept</button>
                <button onClick={() => rejectInvitation(invitation._id)} className='bg-red-500 text-white font-semibold text-sm rounded-full px-2 py-1'>Reject</button>
              </div>
            </div>
            <ul>
              {invitation.members.map((member: any) => (
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