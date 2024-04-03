import axios from "axios";
const API_URL = "http://localhost:3000/challenge";

export const addChallenge = async (formData: any) => {
    try {
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