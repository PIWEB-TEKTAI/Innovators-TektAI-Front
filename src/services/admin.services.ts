import axios from "axios";
import {User} from '../types/user';
const Admin_URL = "http://localhost:3000/admin2/";
const API_URL = "http://localhost:3000/";



export const getUsersWithAccountSwitchRequest = (): Promise<User[]>=> {
  return axios
    .get(Admin_URL + "getUsersWithAccountSwitchRequest", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching  getUsersWithAccountSwitchRequest:", error);
      throw error;
    });
};
export const acceptSwitchRequest = async (id: any): Promise<any> => {
    try {
      const response = await axios.put(
        `${Admin_URL}acceptSwitchRequest/${id}`,
        null, // No data payload in the request body
        { withCredentials: true } // Include withCredentials in the configuration object
      );
      return response.data;
    } catch (error) {
      console.error('Switch company error', error);
      throw error; // Re-throw the error to handle it in the calling code if needed
    }
  };