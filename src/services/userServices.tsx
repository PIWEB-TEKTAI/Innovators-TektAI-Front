import axios from 'axios';

const url = 'http://localhost:3000/user';


export const register = async (formData: any, captchaToken: any) => {
    try {
        const captchaResponse = await axios.post("http://localhost:3000/verify-captcha" , { token : captchaToken });
        console.log('CAPTCHA Verification Response:', captchaResponse.data);

        if (!captchaResponse.data.success) {
            throw new Error('CAPTCHA verification failedddd');
        }
        const response = await axios.post(`${url}/register`, formData);
        console.log('User Registration Response:', response.data);

        return response.data;
    } catch (error) {
        
        console.error('Error submitting data:', error);
        throw error;
    }
};


export const VerifcationEmail = async (code:any,id:any,captchaToken:any) => {

    try {
        const captchaResponse = await axios.post("http://localhost:3000/verify-captcha" , { token : captchaToken });
        console.log('CAPTCHA Verification Response:', captchaResponse.data);

        if (!captchaResponse.data.success) {
            throw new Error('CAPTCHA verification failedddd');
        }
        const response = await axios.post(`${url}/EmailVerification/${id}` , {token:code});
        console.log('Response:', response.data);
        return response.data

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error; 
    }
};



export const resendVerifcationEmail = async (id:any) => {

    try {
        const response = await axios.post(`${url}/resend/Email/${id}`);
        console.log('Response:', response.data);
        return response.data

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error; 
    }
};


export const resendVerifcationEmailAfterSignIn = async (formData:any) => {

    try {
        const response = await axios.post(`${url}/resendEmail` , formData);
        console.log('Response:', response.data);
        return response.data

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error; 
    }
};