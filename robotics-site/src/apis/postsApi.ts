import apiClient from './main';

export interface PostData {
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

export interface PostResponse {
  posts: PostData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
export interface CreatePostPayload {
  title: string;
  content: string;
  mainTag: string;
  tags: string[];
}

// Get all posts
export const getPosts = async (): Promise<PostResponse> => {
  const response = await apiClient.get<PostResponse>('/posts');
  return response.data;
}

export const createPost = async (postData: CreatePostPayload): Promise<PostData> => {
  const response = await apiClient.post<PostData>('/posts',postData);
  return response.data;
}

export const updatePost = async (id: string, postData: FormData): Promise<PostData> => {
  const response = await apiClient.patch(`/posts/${id}`, postData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}

export const deletePost = async (id: string): Promise<void> => {
  const response = await apiClient.delete(`/posts/${id}`);
  return response.data;
}


// Upload project image
export const uploadPostImage = async (id: string, imageFile: File): Promise<PostData> => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const response = await apiClient.post<PostData>(`/posts/${id}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}
