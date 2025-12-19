import apiClient from './main';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const login = async (data: LoginData) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
}

export const register = async (data: RegisterData) => {
  // Remove confirmPassword before sending to the server
  const { confirmPassword, ...registrationData } = data;
  const response = await apiClient.post('/auth/register', registrationData);
  return response.data;
}