import axios from 'axios';

const url = 'http://localhost:3000/user';


export const register = async (formData:any) => {


    try {
        const response = await axios.post(`${url}/register`, formData);
        console.log('Response:', response.data);

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error; 
    }
};
