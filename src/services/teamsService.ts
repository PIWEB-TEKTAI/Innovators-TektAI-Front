import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Replace this with your backend URL

const teamService = {
  createTeam: async (teamData:any) => {
    try {
      const response = await axios.post(`${BASE_URL}/teams`, teamData);
      return response.data;
    } catch (error) {
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
  }
};

export default teamService;
