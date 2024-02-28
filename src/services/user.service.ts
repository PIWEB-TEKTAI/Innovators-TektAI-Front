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
    formData.append('file', file);

    const response = await axios.patch<{ imageUrl: string }>(`${API_URL}imageUpload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Assuming the server responds with the updated user object
    const imageUrl = response.data.imageUrl;

    // Call the provided callback to handle the updated image URL
    setImageUrlCallback(imageUrl);

    console.log('Image uploaded successfully!');
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
