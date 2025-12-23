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

export const getPosts = async () => {
  const response = await apiClient.get<{ posts: PostData[] }>('/posts');
  return response.data.posts;
}

export const createPost = async (postData: FormData) => {
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