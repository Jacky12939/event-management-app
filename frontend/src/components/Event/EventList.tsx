import EventCard from './EventCard';
import type { EventType } from './types/event';

interface EventListProps {
  events: EventType[];
  onEdit: (event: EventType) => void;
  onDelete: (id: string | number) => void;
}

export default function EventList({ events, onEdit, onDelete }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-10 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
        <p className="text-gray-600 dark:text-gray-300 font-medium">Aucun événement trouvé.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}