import axios from "axios";
const API_URL = "http://localhost:3000/submissions";

export const addSubmission= async (formData: any,id:any) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/addSubmission` , formData, {
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
export const getSubmissionsByChallengeId = async (challengeId: any) => {
  try {
    const response = await axios.get(`${API_URL}/${challengeId}/submissions`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error getting submissions by challenge ID:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};