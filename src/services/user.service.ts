import axios from "axios";
import {User} from '../types/User';
const API_URL = "http://localhost:3000/user/";


export const getProfile = (): Promise<User>=> {
  return axios
    .get(API_URL + "profile", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data.user;
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      throw error;
    });
};

