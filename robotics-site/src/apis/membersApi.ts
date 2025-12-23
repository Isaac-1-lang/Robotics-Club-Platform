import apiClient from './main';

export interface MemberData {
  _id: string;
  username: string;
  role: string;
  createdAt: string;
}

export interface MembersResponse {
  users: MemberData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const getMembers = async (): Promise<MemberData[]> => {
  const response = await apiClient.get<MembersResponse>('admin/users');
  return response.data.users; // <-- return the users array
}
