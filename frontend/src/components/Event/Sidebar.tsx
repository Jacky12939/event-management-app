import { Link } from "react-router-dom";
import { FaThLarge, FaCalendarAlt, FaUser } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 shadow-md p-4">
      <h2 className="text-xl font-bold text-indigo-600 mb-8">
        Admin Panel
      </h2>

      <nav className="space-y-4">
        <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 font-medium transition">
          <FaThLarge size={18} /> Dashboard
        </Link>

        <Link to="/events" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 font-medium transition">
          <FaCalendarAlt size={18} /> Events
        </Link>

        <Link to="/my-events" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 font-medium transition">
          <FaUser size={18} /> My Events
        </Link>
      </nav>
    </aside>
  );
}