import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";


import {
  getEventById,
} from "../../services/event.service";
import type { EventType } from "../../Components/Event/types/event";
import ParticipantLayout from "../../Components/Participant/ParticipantLayout";



export default function EventDetailsPage() {

  const { id } = useParams();

  const [event, setEvent] =
    useState<EventType | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchEvent = async () => {

      if (!id) return;

      try {

        const data =
          await getEventById(id);

        setEvent(data.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchEvent();

  }, [id]);

  if (loading) {
    return <h1>Chargement...</h1>;
  }

  if (!event) {
    return <h1>Événement introuvable</h1>;
  }

  return (

    <ParticipantLayout>

      <div className="
        rounded-3xl
        overflow-hidden
        h-[400px]
        mb-10
      ">

        <img
          src={event.image}
          alt={event.title}
          className="
            w-full
            h-full
            object-cover
          "
        />

      </div>

      <div className="
        grid
        md:grid-cols-3
        gap-10
      ">

        <div className="md:col-span-2">

          <h1 className="
            text-5xl
            font-bold
            mb-5
          ">
            {event.title}
          </h1>

          <p className="
            text-slate-600
            dark:text-slate-300
            leading-8
          ">
            {event.description}
          </p>

        </div>

        <div className="
          bg-white
          dark:bg-slate-900
          p-6
          rounded-3xl
          shadow-lg
        ">

          <div className="space-y-4">

            <p>
              <strong>Date :</strong>
              {" "}
              {event.date}
            </p>

            <p>
              <strong>Heure :</strong>
              {" "}
              {event.time}
            </p>

            <p>
              <strong>Lieu :</strong>
              {" "}
              {event.location}
            </p>

            <p>
              <strong>Places :</strong>
              {" "}
              {event.capacity}
            </p>

            <p>
              <strong>Statut :</strong>
              {" "}
              {event.status}
            </p>

          </div>

          <button className="
            mt-6
            w-full
            bg-violet-600
            hover:bg-violet-700
            text-white
            py-4
            rounded-2xl
          ">
            Réserver maintenant
          </button>

        </div>

      </div>

    </ParticipantLayout>
  );
}