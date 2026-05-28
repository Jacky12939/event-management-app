import { useEffect, useState } from 'react';

import api from '../../services/api';

import EventList from './EventList';
import type { EventType } from './types/event';


export default function MyEvents() {
  const [events, setEvents] =
    useState<EventType[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ========================================
  // FETCH EVENTS
  // ========================================

  const fetchMyEvents =
    async () => {
      try {
        const user =
          JSON.parse(
            localStorage.getItem(
              'user',
            ) || '{}',
          );

        const response =
          await api.get(
            `/events/organizer/${user.id}`,
          );

        setEvents(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div
        className="
        flex
        items-center
        justify-center
        py-20
      "
      >
        <p
          className="
          text-gray-700
          dark:text-gray-300
        "
        >
          Chargement...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* TITLE */}

      <div>
        <h2
          className="
          text-3xl
          font-bold
          text-gray-900
          dark:text-white
        "
        >
          Mes événements
        </h2>

        <p
          className="
          text-gray-600
          dark:text-gray-400
          mt-2
        "
        >
          Gérez vos événements créés.
        </p>
      </div>

      {/* LIST */}

      <EventList events={events} />
    </div>
  );
}