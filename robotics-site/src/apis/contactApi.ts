import apiClient from "./main";


export interface ContactData {
    name:string,
    email:string,
    subject:string,
    message:string
}

export const sendContactMessage = async (data:ContactData) => {
    const response = await apiClient.post('/contact',data);
    return response.data;
}