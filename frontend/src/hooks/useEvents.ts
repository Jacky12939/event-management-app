import { useEffect, useState }
from "react";

import { getEvents }
from "../services/event.service";

import type { EventType }
from "../Components/Event/types/event";

export default function useEvents() {

  const [events, setEvents] =
    useState<EventType[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const response =
          await getEvents();

        console.log(response);

        setEvents(
          Array.isArray(response.data)
            ? response.data
            : []
        );

      } catch (error) {

        console.log(error);

        setError(
          "Erreur lors du chargement"
        );

      } finally {

        setLoading(false);
      }
    };

    fetchEvents();

  }, []);

  return {
    events,
    loading,
    error,
  };
}