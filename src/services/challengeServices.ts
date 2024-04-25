import axios from "axios";
import { challenge } from "../types/challenge";
const API_URL = "http://localhost:3000/challenge";

export const editChallenge = async (formData: any , id:any , captchaToken:any) => {
    try {
      const captchaResponse = await axios.post("http://localhost:3000/verify-captcha" , { token : captchaToken });
      console.log('CAPTCHA Verification Response:', captchaResponse.data);

      if (!captchaResponse.data.success) {
          throw new Error('CAPTCHA verification failedddd');
      }
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
  export const getDiscussionsByChallengeId = async (challengeId: any) => {
    try {
      const response = await axios.get(`${API_URL}/${challengeId}/discussions`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error getting discussions by challenge ID:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };
  export const likeDiscussion = async (discussionId: any) => {
    try {
      const response = await axios.post(`${API_URL}/${discussionId}/like`,{}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error getting discussions by challenge ID:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };
  export const unlikeDiscussion = async (discussionId: any) => {
    try {
      const response = await axios.post(`${API_URL}/${discussionId}/unlike`,{}, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error('Error getting discussions by challenge ID:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };
