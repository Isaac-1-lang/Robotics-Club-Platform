import apiClient from './main';

export interface EventData {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  date: string;
  location: string;
  status: 'upcoming' | 'past';
}

export const getEvents = async (): Promise<EventData[]> => {
  const response = await apiClient.get<EventData[]>('/events');
  return response.data;
}
