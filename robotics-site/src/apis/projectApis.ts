import apiClient from './main';

export interface ProjectData {
  id: string;
  title: string;
  content: string;
  author: { id: string; username: string };
  mainTag: string;
  tags: string[];
  imageUrl: string;
  category?: 'AI' | 'Hardware' | 'IoT' | 'Software';
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Get all projects
export const getProjects = async (): Promise<ProjectData[]> => {
  const response = await apiClient.get<ProjectData[]>('/projects');
  return response.data;
}

// Get single project by ID
export const getProjectById = async (id: string): Promise<ProjectData> => {
  const response = await apiClient.get<ProjectData>(`/projects/${id}`);
  return response.data;
}

// Create new project
export const createProject = async (projectData: Omit<ProjectData, 'id'>): Promise<ProjectData> => {
  const response = await apiClient.post<ProjectData>('/projects', projectData);
  return response.data;
}

// Update project
export const updateProject = async (id: string, projectData: Partial<ProjectData>): Promise<ProjectData> => {
  const response = await apiClient.put<ProjectData>(`/projects/${id}`, projectData);
  return response.data;
}

// Delete project
export const deleteProject = async (id: string): Promise<void> => {
  await apiClient.delete(`/projects/${id}`);
}