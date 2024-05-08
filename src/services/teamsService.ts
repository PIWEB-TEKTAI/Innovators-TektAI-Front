import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000'; // Replace this with your backend URL
const teamService = {
  createTeam: async (teamData:any) => {
    try {
      const response = await axios.post(`${BASE_URL}/teams`, teamData,{withCredentials:true});
      return response.data;
    } catch (error) {
      throw error;
    }
  },
 getAllTeams : async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/all`);
      return response.data;
    } catch (error) {
      throw error; // Throw the error to handle it in the component
    }
  },
  getMyTeams : async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/myTeams`,{withCredentials:true});
      return response.data;
    } catch (error) {
      throw error; // Throw the error to handle it in the component
    }
  },
  getTeamById: async (id:any) => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/${id}`,{withCredentials:true});
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getInvitationsForChallenger: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/challenger/invitations`,{withCredentials:true});
      return response.data;
    } catch (error) {
      console.error('Error fetching invitations:', error);
      throw error;
    }
  },
  joinTeamRequest: async (teamId:any) => {
    try {
      const response = await axios.post(`${BASE_URL}/teams/${teamId}/join`,{},{withCredentials:true});
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  findTeamByLeader: async (leaderId:any) => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/find-by-leader/${leaderId}`);
      return response.data.team;
    } catch (error) {
      throw error;
    }
  },
  getJoinRequests: async (teamId:any) => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/${teamId}/requests`,{withCredentials:true});
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  acceptJoinRequest: async (teamId:any, userId:any) => {
    try {
      const response = await axios.put(`${BASE_URL}/teams/${teamId}/accept/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  inviteByLink : async (teamId:any) => {
    try {
      const response = await axios.post(`${BASE_URL}/teams/${teamId}/invite/link`, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Set withCredentials to true for sending cookies
      });
      return response.data;
    } catch (error) {
      console.error('Error inviting members by link:', error);
      throw new Error('Error inviting members by link');
    }
  },
  
  handleInvitationLink : async (token:any) => {
    try {
      const response = await axios.get(`${BASE_URL}/teams/invitationByLink/${token}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error handling invitation link:', error);
      throw new Error('Error handling invitation link');
    }
  },
  declineJoinRequest: async (teamId:any, userId:any) => {
    try {
      const response = await axios.put(`${BASE_URL}/teams/${teamId}/decline/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  acceptInvitation: async (teamId:any) => {
    try {
      const response = await axios.put(`${BASE_URL}/teams/${teamId}/accept-invitation`,{},{withCredentials:true});
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Decline invitation
  declineInvitation: async (teamId:any) => {
    try {
      const response = await axios.put(`${BASE_URL}/teams/${teamId}/decline-invitation`,{},{withCredentials:true});
      return response.data;
    } catch (error) {
      throw error;
    }
  },
   editTeam : async (teamId:any, name:any, selectedChallengers:any, isprivate:any) => {
    try {
      const response = await axios.put(`${BASE_URL}/teams/edit/${teamId}`, { name, selectedChallengers, isprivate });
      return response.data;
    } catch (error) {
      console.error('Error editing team:', error);
      throw new Error('Error editing team');
    }
    
  },
  inviteMembers :async (teamId:any, userIds:any, emailInvitations:any) => {
    try {
      const response = await axios.put(`${BASE_URL}/teams/invite-members`, { teamId, userIds, emailInvitations });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  
};

export default teamService;
