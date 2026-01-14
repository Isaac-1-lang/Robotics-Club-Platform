import apiClient from './main';

export interface ProjectData {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; username: string };
  mainTag: { _id: string; name: string; type: string };
  tags: { _id: string; name: string; type: string }[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}


export interface ProjectResponse {
  projects:ProjectData[];
  pagination:{
    page:number;
    limit:number;
    total:number;
    totalPages:number;
  };
}

export interface CreateProjectPayload {
  title: string;
  content: string;
  mainTag: string;
  tags: string[];
}

// Get all projects
export const getProjects = async (): Promise<ProjectResponse> => {
  const response = await apiClient.get<ProjectResponse>('/projects');
  return response.data;
}

// Get single project by ID
export const getProjectById = async (id: string): Promise<ProjectData> => {
  const response = await apiClient.get<ProjectData>(`/projects/${id}`);
  return response.data;
}

// Create new project
export const createProject = async (projectData: CreateProjectPayload): Promise<ProjectData> => {
  const response = await apiClient.post<ProjectData>('/projects', projectData);
  return response.data;
}

// Upload project image
export const uploadProjectImage = async (id: string, imageFile: File): Promise<ProjectData> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await apiClient.post<ProjectData>(`/projects/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}

// Update project
export const updateProject = async (id: string, projectData: FormData): Promise<ProjectData> => {
  const response = await apiClient.patch<ProjectData>(`/projects/${id}`, projectData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}

// Delete project
export const deleteProject = async (id: string): Promise<void> => {
  await apiClient.delete(`/projects/${id}`);
}
