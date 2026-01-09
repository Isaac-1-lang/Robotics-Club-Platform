import apiClient from './main';

export interface PostData {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  tags: {
    _id: string;
    name: string;
    type: string;
  }[];
  mainTag: {
    _id: string;
    name: string;
    type: string;
  };
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

// Get all posts
export const getPosts = async (): Promise<PostResponse> => {
  const response = await apiClient.get<PostResponse>('/posts');
  return response.data;
}

export const createPost = async (postData: FormData) => {
  // Assuming backend handles FormData with 'image' field
  const response = await apiClient.post('/posts', postData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}

export const updatePost = async (id: string, postData: FormData) => {
  const response = await apiClient.patch(`/posts/${id}`, postData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
}

export const deletePost = async (id: string) => {
  const response = await apiClient.delete(`/posts/${id}`);
  return response.data;
}
