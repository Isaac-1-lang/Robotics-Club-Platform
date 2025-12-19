import apiClient from './main';


export interface ProjectData {
  id: string;
  title: string;
  content: string;
  author: { id:string,username:string };
  mainTag: string;
  tags:string[];
  imageUrl:string,
}
export const getProjects = async () => {
  const response = await apiClient.get<ProjectData[]>('/projects');
  return response.data;
}

export const createProjects = async () => {
  const response = await apiClient.post<ProjectData[]>('/projects');
  return response;
}


export const updateProjects = async () => {
  const response = await apiClient.put<ProjectData[]>('/projects');
  return response.data;
}

export const deleteProjects = async () => {
  const response = await apiClient.delete<ProjectData[]>('/projects');
  return response;
}

