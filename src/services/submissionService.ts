import axios from "axios";
import { submission } from "../types/submission";
const API_URL = "http://localhost:3000/submissions";
const url ="http://localhost:3000/submissions/AllSubmissions";

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


export const editSubmission= async (formData: any,id:any) => {
  try {
      const response = await axios.post(`${API_URL}/editSubmission/${id}` , formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
          withCredentials: true,
        });
      return response.data;

  } catch (error) {
      console.error('Error editing data:', error);
      throw error;
  }
};

export const getSubmissionById = (id:any): Promise<submission>=> {
  return axios.get(`${API_URL}/get/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data.submission;
    })
    .catch((error) => {
      throw error;
    });
};


export const deleteSubmission = async (id:any) => {
  try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        withCredentials: true,
      });
      console.log('Submission deleted Response:', response.data);
      return response.data;

  } catch (error) {
      console.error('Error deleting data:', error);
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
export const AllSubmissions = async (): Promise<submission[]>=> {
  try {
    const response = await axios
      .get(url, {
        withCredentials: true,
      });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching  AllSubmissionsSwitchRequest:", error);
    throw error;
  }
};