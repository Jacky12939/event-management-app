import {
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";

import { Link }
from "react-router-dom";
import type { EventType } from "../Event/types/event";


interface Props {
  event: EventType;
}

export default function EventCard({
  event,
}: Props) {

  return (

    <div className="
      bg-white
      dark:bg-slate-900
      rounded-3xl
      overflow-hidden
      shadow-md
      hover:shadow-2xl
      transition
      duration-300
    ">

      {/* IMAGE */}

      <div className="
        h-56
        overflow-hidden
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

      {/* CONTENT */}

      <div className="p-5">

        <div className="
          inline-block
          bg-violet-100
          text-violet-700
          px-3
          py-1
          rounded-full
          text-sm
          mb-4
        ">
          {event.category}
        </div>

        <h2 className="
          text-2xl
          font-bold
          mb-4
        ">
          {event.title}
        </h2>

        <div className="
          space-y-3
          text-slate-600
          dark:text-slate-300
        ">

          <div className="
            flex
            items-center
            gap-2
          ">
            <FiCalendar />
            <span>{event.date}</span>
          </div>

          <div className="
            flex
            items-center
            gap-2
          ">
            <FiMapPin />
            <span>{event.location}</span>
          </div>

        </div>

        <Link
          to={`/events/${event.id}`}
          className="
            mt-6
            block
            text-center
            bg-violet-600
            hover:bg-violet-700
            text-white
            py-3
            rounded-2xl
          "
        >
          Voir détails
        </Link>

      </div>
    </div>
  );
}