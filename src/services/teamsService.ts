import axios from 'axios';

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
      const response = await axios.get(`${BASE_URL}/teams/${id}`);
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
  joinTeamRequest: async (teamId:any, userId:any) => {
    try {
      const response = await axios.post(`${BASE_URL}/teams/${teamId}/join`, { userId });
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
  }
  
};

export default teamService;