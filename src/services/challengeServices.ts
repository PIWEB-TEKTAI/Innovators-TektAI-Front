import axios from "axios";
import { challenge } from "../types/challenge";
const API_URL = "http://localhost:3000/challenge";

export const editChallenge = async (formData: any , id:any) => {
    try {
        const response = await axios.put(`${API_URL}/edit/${id}` , formData, {
            withCredentials: true,
          });
        return response.data;

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};


export const getChallengeById = (id:any): Promise<challenge>=> {
    return axios.get(`${API_URL}/get/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        return response.data.challenge;
      })
      .catch((error) => {
        throw error;
      });
  };