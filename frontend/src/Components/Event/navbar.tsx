import { Link } from "react-router-dom";
import { FaPlusCircle, FaListUl, FaCalendarAlt } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-xl font-bold text-indigo-600 dark:text-white">
        Event Manager
      </h1>

      <div className="flex gap-6 text-sm font-medium">
        <Link to="/create" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          <FaPlusCircle size={16} /> Create
        </Link>

        <Link to="/events" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          <FaListUl size={16} /> Event List
        </Link>

        <Link to="/my-events" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          <FaCalendarAlt size={16} /> My Events
        </Link>
      </div>
    </nav>
  );
}