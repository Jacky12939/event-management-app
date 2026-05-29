import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import EventList from './EventList';
import type { EventType } from './types/event';

export default function MyEvents() {
  const { user } = useAuth();
  const [events, setEvents]   = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchMyEvents = async () => {
    if (!user?.id) {
      setError("Impossible d'identifier l'utilisateur connecté.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/events/organizer/${user.id}`);
      setEvents(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erreur lors du chargement des événements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      fetchMyEvents();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Chargement de vos événements...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Mes événements
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {events.length} événement{events.length !== 1 ? 's' : ''} créé{events.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <EventList events={events} />
    </div>
  );
}