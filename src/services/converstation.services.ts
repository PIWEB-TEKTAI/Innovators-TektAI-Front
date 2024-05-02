import axios from "axios";
const url = "http://localhost:3000/conv";



export const createConverstation = async (idUser1: any , idUser2:any) => {
    try {
        const response = await axios.post(`${url}/create/${idUser1}/${idUser2}`);
        console.log('Converstation saving Response:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};




