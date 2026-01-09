import apiClient from './main';

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image: string; // URL string
}

export const getTeam = async (): Promise<TeamMember[]> => {
  const response = await apiClient.get<TeamMember[]>('/team');
  return response.data;
}
