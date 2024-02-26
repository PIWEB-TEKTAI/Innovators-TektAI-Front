import axios from "axios";
import Cookies from 'universal-cookie';

const API_URL = "http://localhost:3000/auth/";
const cookies = new Cookies();
export const login = (email: string, password: string) => {

  return axios.post('http://localhost:3000/login', { email: email, password: password}, { withCredentials: true })
    .then((response) => {
      if (response.data.token) {
        cookies.set('token', response.data.token,{ path: '/' ,httpOnly:true});
      }

      return response.data;
    });
};

export const logout = () => {
  cookies.remove("token");
};

export const getCurrentUser = () => {
  const token = cookies.get('token');
console.log(token)
  if (token) return token;

  return null;
};

export const getUsers = () => {
  return axios
    .get(API_URL + "users", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error;
    });
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
};
export const checkAuthentication = async () => {
  try {
    const response = await axios.get(`${API_URL}securedResource`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Authentication failed:', error);
    throw error; // Re-throw the error to handle it in the calling code if needed
  }

};
