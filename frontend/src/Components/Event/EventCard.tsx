import { Link } from 'react-router-dom';

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

import type { EventType } from './types/event';

interface Props {
  event: EventType;
}

export default function EventCard({
  event,
}: Props) {
  return (
    <div
      className="
      bg-white
      dark:bg-gray-900
      rounded-2xl
      overflow-hidden
      shadow-lg
      hover:shadow-2xl
      transition
      duration-300
      border
      border-gray-200
      dark:border-gray-800
    "
    >
      {/* IMAGE */}

      <img
        src={
          event.image ||
          'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'
        }
        alt={event.title}
        className="
          h-52
          w-full
          object-cover
        "
      />

      {/* CONTENT */}

      <div className="p-5 space-y-4">
        {/* CATEGORY */}

        <span
          className="
          inline-block
          px-3
          py-1
          text-xs
          rounded-full
          bg-blue-100
          text-blue-700
          dark:bg-blue-900
          dark:text-blue-200
        "
        >
          {event.category}
        </span>

        {/* TITLE */}

        <h2
          className="
          text-xl
          font-bold
          text-gray-800
          dark:text-white
        "
        >
          {event.title}
        </h2>

        {/* DESCRIPTION */}

        <p
          className="
          text-gray-600
          dark:text-gray-300
          line-clamp-3
        "
        >
          {event.description}
        </p>

        {/* DATE */}

        <div
          className="
          flex
          items-center
          gap-2
          text-gray-500
          dark:text-gray-400
        "
        >
          <FaCalendarAlt />

          <span>
            {new Date(
              event.date,
            ).toLocaleDateString()}
          </span>
        </div>

        {/* LOCATION */}

        <div
          className="
          flex
          items-center
          gap-2
          text-gray-500
          dark:text-gray-400
        "
        >
          <FaMapMarkerAlt />

          <span>{event.location}</span>
        </div>

        {/* BUTTON */}

        <Link
          to={`/events/${event.id}`}
          className="
            block
            text-center
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            transition
          "
        >
          Voir détails
        </Link>
      </div>
    </div>
  );
}