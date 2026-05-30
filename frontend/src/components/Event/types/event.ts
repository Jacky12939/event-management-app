export interface EventType {
  id: string;

  title: string;

  description: string;

  date: string;

  time: string;

  location: string;

  category: string;

  capacity: number;

  image?: string;

  status: string;

  organizerId: string;

  createdAt: string;
}