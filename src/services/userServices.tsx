import axios from 'axios';

const url = 'http://localhost:3000/user';


export const register = async (formData:any) => {


    try {
        const response = await axios.post(`${url}/register`, formData);
        console.log('Response:', response.data);
        return response.data

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error; 
    }
};



export const verifyEmail = async (id:any , token:any) => {

    try {
        const response = await axios.post(`${url}/EmailVerification/${token}/${id}`);
        console.log('Response:', response.data);
        return response.data

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error; 
    }
};


export const resendVerifcationEmail = async (formData:any) => {

    try {
        const response = await axios.post(`${url}/resendEmail` ,formData );
        console.log('Response:', response.data);
        return response.data

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error; 
    }
};