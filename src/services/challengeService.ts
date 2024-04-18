import axios from "axios";
const API_URL = "http://localhost:3000/challenge";

export const addChallenge = async (formData: any , captchaToken:any) => {
    try {
      const captchaResponse = await axios.post("http://localhost:3000/verify-captcha" , { token : captchaToken });
      console.log('CAPTCHA Verification Response:', captchaResponse.data);

      if (!captchaResponse.data.success) {
          throw new Error('CAPTCHA verification failedddd');
      }
        const response = await axios.post(`${API_URL}/add` , formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          });
        return response.data;

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};
export const addSoloParticipationRequest = async (challengeId:any, userId:any) => {
  try {
    const response = await axios.post(`${API_URL}/${challengeId}/addSoloParticipationRequest`, { userId },
{  withCredentials: true}  );
    return response.data; 
  } catch (error) {
    console.error('Error adding participation request:', error);
    throw error; // Handle the error in your component
  }
};
export const addTeamParticipationRequest = async (challengeId:any, teamId:any) => {
  try {
    const response = await axios.post(`${API_URL}/${challengeId}/addTeamParticipationRequest/${teamId}`,{},
{  withCredentials: true}  );
    return response.data; 
  } catch (error) {
    console.error('Error adding participation request:', error);
    throw error; // Handle the error in your component
  }
};
export const participationService = {
  getAllParticipations: async (challengeId:any) => {
    try {
      const response = await axios.get(`${API_URL}/${challengeId}/participations`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
export const acceptParticipation = async (challengeId:any, userId:any,type:string) => {
  try {
    const response = await axios.put(`${API_URL}/${challengeId}/accept-participation/${userId}`,{type},{  withCredentials: true} );
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw error if request fails
  }
};


export const declineParticipation = async (challengeId:any, userId:any) => {
  try {
    const response = await axios.put(`${API_URL}/${challengeId}/decline/participation/${userId}`,{},{  withCredentials: true} );
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw error if request fails
  }
};