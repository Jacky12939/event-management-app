import api from './api';

export const registerToEvent = async (eventId: string) => {
  const response = await api.post(`/registrations/events/${eventId}/register`, {});
  return response.data;
};

export const getMyRegistrations = async () => {
  const response = await api.get('/registrations/my-registrations');
  return response.data;
};

export const verifyTicket = async (ticketCode: string) => {
  const response = await api.get(`/registrations/verify/${ticketCode}`);
  return response.data;
};