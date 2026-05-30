import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaPencilAlt, 
  FaTrashAlt 
} from 'react-icons/fa';
import type { EventType } from './types/event';

interface Props {
  event: EventType;
  onEdit: (event: EventType) => void;
  onDelete: (id: string | number) => void;
}

export default function EventCard({ event, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-200 dark:border-gray-800 flex flex-col justify-between">
      <div>
      
        <div className="relative">
          <img
            src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'}
            alt={event.title}
            className="h-52 w-full object-cover"
          />
         
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-blue-100/90 text-blue-700 dark:bg-blue-900/90 dark:text-blue-200 backdrop-blur-sm">
            {event.category}
          </span>
        </div>

        <div className="p-5 space-y-4">
        
          <h2 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
            {event.title}
          </h2>

         
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {event.description}
          </p>

          
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FaCalendarAlt className="text-blue-500" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FaMapMarkerAlt className="text-blue-500" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

  
      <div className="px-5 pb-5 pt-2 space-y-3">
     
        <Link
          to={`/events/${event.id}`}
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium transition duration-200"
        >
          Voir détails
        </Link>

        <hr className="border-gray-100 dark:border-gray-800" />

       
        <div className="flex justify-between items-center text-sm font-medium">
          <button
            onClick={() => onEdit(event)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
          >
            <FaPencilAlt size={14} />
            <span>Modifier</span>
          </button>

          <button
            onClick={() => onDelete(event.id)}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition"
          >
            <FaTrashAlt size={14} />
            <span>Supprimer</span>
          </button>
        </div>
      </div>
    </div>
  );
}