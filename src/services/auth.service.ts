import axios from "axios";
import Cookies from 'universal-cookie';

const API_URL = "http://localhost:3000/auth/";
const cookies = new Cookies();

/*export const login = (email: string, password: string) => {

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
};*/
// auth.service.js



export const getCurrentUser = () => {
  const token = cookies.get('token');
console.log(token)
  if (token) return token;

  return null;
};
export const signInWithGoogle = async (user:any) => {
  try {
  const response = await axios.post(`${API_URL}/setToken`, {user }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Re-throw the error to handle it in the calling code if needed
  }

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

export const signIn = async (email: string, password: string,captchaToken:any) => {
  try {
    const captchaResponse = await axios.post("http://localhost:3000/verify-captcha" , { token : captchaToken });

   if (!captchaResponse.data.success) {
        throw new Error('CAPTCHA verification failed');
        console.log("captcha");
    }
    const response = await axios.post(`${API_URL}/signin`, { email, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
export const signOut = async () => {
  try {
    const response = await fetch(`${API_URL}/signOut`, {
      method: 'POST',
      credentials: 'include', 
    });

    if (response.ok) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
   
      return true; 
    } else {
      console.error('Sign-out failed.');
      return false; 
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkAuthentication = async () => {
  try {
    const response = await axios.get(`${API_URL}securedResource`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error; // Re-throw the error to handle it in the calling code if needed
  }


 
};
