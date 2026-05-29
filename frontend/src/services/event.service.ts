import type { EventType } from "../Components/Event/types/event";
import api from "./api";


export const createEvent = (data: Omit<EventType, "id" | "createdAt" | "organizerId" | "status">) => {
  return api.post("/events", data); 
};


export const getEvents = () => {
  return api.get("/events");
};

export const getEventById = (id: string | number) => {
  return api.get(`/events/${id}`);
};


export const updateEvent = (id: string | number, data: EventType) => {
  return api.put(`/events/${id}`, data); 
};


export const patchEvent = (id: string | number, data: Partial<EventType>) => {
  return api.patch(`/events/${id}`, data); 
};


export const deleteEvent = (id: string | number) => {
  return api.delete(`/events/${id}`);
};