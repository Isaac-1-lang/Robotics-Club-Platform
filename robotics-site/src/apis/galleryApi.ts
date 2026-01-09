import apiClient from './main';

export interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  image: string; // URL string
}

export const getGallery = async (): Promise<GalleryItem[]> => {
  const response = await apiClient.get<GalleryItem[]>('/gallery');
  return response.data;
}
