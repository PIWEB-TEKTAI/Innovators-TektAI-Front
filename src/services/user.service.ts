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
interface UserProfileProps {
  setImageUrlCallback: (url: string) => void;
}

export const uploadImage = async (file: File, setImageUrlCallback: UserProfileProps['setImageUrlCallback']) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post<{ imageUrl: string }>(`${API_URL}imageUpload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    // Assuming the server responds with the updated user object
    const imageUrl = response.data.imageUrl;

    // Call the provided callback to handle the updated image URL
    setImageUrlCallback(imageUrl);

    console.log('Image uploaded successfully!');
    return { success: true, imageUrl, message: 'Image uploaded successfully!' };

  } catch (error) {
    console.error('Error uploading image:', error);
    return { success: false, message: 'Error uploading image. Please try again.' };

  }
};

export const updateUser = async (updatedUserData: any): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}/updateProfile`, updatedUserData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('update error', error);
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
};
export const updateCompany = async (updatedCompanyData: any): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}updateCompany`, updatedCompanyData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Update company error', error);
    throw error; // Re-throw the error to handle it in the calling code if needed
  }
};


export const checkEmailUnique = async (email: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${API_URL}/checkEmailUnique`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials in cross-origin requests
      }
    );

    return response.data.isUnique;
  } catch (error) {
    console.error('Error checking email uniqueness:', error);
    throw new Error('Error checking email uniqueness');
  }
};