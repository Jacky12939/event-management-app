import { Injectable } from "@nestjs/common";

// Structure d'un événement selon ton backlog
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  capacity: number;
  image?: string;
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED";
  organizerId: string;
  createdAt: Date;
}

@Injectable()
export class EventsService {
  // Notre fausse base de données locale
  private events: Event[] = [];

  async createEvent(data: Array<any> | any) {
    const newEvent: Event = {
      id: Math.random().toString(36).substring(2, 9), // Génère un faux ID unique
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      time: data.time,
      capacity: Number(data.capacity),
      image: data.image || null,
      status: "DRAFT", // Statut par défaut
      organizerId: data.organizerId || "fake-id-organisateur",
      createdAt: new Date(),
    };

    this.events.push(newEvent);
    return newEvent;
  }

  async getAllEvents() {
    return this.events;
  }
}
