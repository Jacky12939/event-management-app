import EventCard from './EventCard';

import type { EventType } from './types/event';

interface Props {
  events: EventType[];
}

export default function EventList({
  events,
}: Props) {
  if (events.length === 0) {
    return (
      <div
        className="
        bg-white
        dark:bg-gray-900
        rounded-2xl
        p-10
        text-center
      "
      >
        <p
          className="
          text-gray-600
          dark:text-gray-300
        "
        >
          Aucun événement trouvé.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-8
    "
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
        />
      ))}
    </div>
  );
}