import apiClient from './main';


export interface PendingUser {
  _id: string;
  username: string;
  email: string;
  membershipRequestedAt: string;
  bio?: string; // If we want to show notes, we might need to update backend to return bio for pending users too.
  // Checking backend controller: getPendingUsers selects "username email membershipRequestedAt".
  // It does NOT select bio. I should update backend if I want to show notes.
}

export interface DashboardStats {
  users: {
    total: number;
    pending: number;
    members: number;
    admins: number;
  };
  posts: {
    total: number;
  };
  projects: {
    total: number;
  };
  tags: {
    total: number;
    system: number;
    user: number;
  };
}
export interface MemberData {
  _id: string;
  username: string;
  email: string;
  membershipRequestedAt: string;
  bio?: string;
}
export const getPendingUsers = async () => {
  const response = await apiClient.get<PendingUser[]>('/admin/users/pending');
  return response.data;
}
export const approveUser = async (userId: string) => {
  const response = await apiClient.patch(`/admin/users/${userId}/approve`);
  return response.data;
}

export const rejectUser = async (userId: string) => {
  const response = await apiClient.patch(`/admin/users/${userId}/reject`);
  return response.data;
}

export const getDashboardStats = async () => {
  const response = await apiClient.get<DashboardStats>('/admin/dashboard');
  return response.data;
}
