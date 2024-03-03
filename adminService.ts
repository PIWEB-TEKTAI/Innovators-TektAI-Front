  import axios from "axios";
  const API_URL = "http://localhost:3000/users";
  export const getUsers = () => {
    return axios
      .get(API_URL, {
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

  export const validateUser = (userId: string) => {
    return axios
      .get(`${API_URL}/validate/${userId}`, { withCredentials: true })
      .then((response) => {
        console.log("User validated successfully:", response);
        return response.data;
      })
      .catch((error) => {
        console.error("Error validating user:", error);
        throw error;
      });
  };

  export const uploadImage = (userId: string, imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return axios.post(`${API_URL}/${userId}/image`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log('Image uploaded successfully:', response);
      return response.data.imageUrl;
    })
    .catch((error) => {
      console.error('Error uploading image:', error);
      throw error;
    });
  };
