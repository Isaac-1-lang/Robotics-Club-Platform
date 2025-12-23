import apiClient from './main';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  bio?: string;
}

export const login = async (data: LoginData) => {
  const response = await apiClient.post('/auth/login', data);
  return response.data;
}

export const register = async (data: RegisterData) => {
  const response = await apiClient.post('/auth/register', data);
  console.log(response.data)
  return response.data;
}

export interface ProfileData {
  username?: string;
  email?: string;
  bio?: string;
  avatar?: File;
}

export interface PasswordData {
  currentPassword?: string;
  newPassword?: string;
}

export const updateProfile = async (data: ProfileData) => {
  const response = await apiClient.patch('/auth/profile', data);
  return response.data;
}

export const changePassword = async (data: PasswordData) => {
  const response = await apiClient.post('/auth/change-password', data);
  return response.data;
}