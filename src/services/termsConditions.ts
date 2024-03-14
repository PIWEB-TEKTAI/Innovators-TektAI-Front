import axios from "axios";
const url = "http://localhost:3000/terms";






export const saveTermsConditions = async (formData: any) => {
    try {
        const response = await axios.post(`${url}/save` , formData);
        console.log('Terms saving Response:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};


export const updateTermsConditions = async (formData: any , index:any) => {
    try {
        const response = await axios.put(`${url}/update/${index}`, formData);
        console.log('Terms updated Response:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};


export const deleteTermsConditions = async (index:any) => {
    try {
        const response = await axios.delete(`${url}/delete/${index}`);
        console.log('Terms deleted Response:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};