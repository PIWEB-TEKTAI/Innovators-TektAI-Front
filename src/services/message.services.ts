import axios from "axios";
const url = "http://localhost:3000/message";



export const sendMessage = async (idUser1: any , idUser2:any , message:any) => {
    try {
        const response = await axios.post(`${url}/send/${idUser1}/${idUser2}` , {text:message});
        console.log('message sending Response:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};


export const sendMessageTeam = async (idUser1: any , idTeam:any , message:any) => {
    try {
        const response = await axios.post(`${url}/send/team/${idUser1}/${idTeam}` , {text:message});
        console.log('message sending Response:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};

