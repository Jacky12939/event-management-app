import { FaMoon, FaSun } from "react-icons/fa";
import logo from "../../assets/logo.png";
import { useLanding } from "../../hooks/useLanding";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { scrollToSection } = useLanding();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-slate-900 shadow-sm px-[8%] py-5 flex items-center justify-between transition-all">
      
      <div
        onClick={() => scrollToSection("hero")}
        className="flex items-center cursor-pointer group"
      >
        <div className="flex items-center">
          <div>
            <img src={logo} alt="logo" className="h-12 w-auto object-contain" />
          </div>
          <h1 className="font-extrabold text-xl dark:text-white -ml-6 transition-colors group-hover:text-indigo-500">
            EventFlow
          </h1>
        </div>
      </div>

      <ul className="hidden lg:flex gap-8">
        <li>
          <button
            onClick={() => scrollToSection("features")}
            className="text-slate-500 dark:text-slate-300 hover:text-indigo-500"
          >
            Fonctionnalités
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("how")}
            className="text-slate-500 dark:text-slate-300 hover:text-indigo-500"
          >
            Comment ça marche
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("personas")}
            className="text-slate-500 dark:text-slate-300 hover:text-indigo-500"
          >
            Pour qui ?
          </button>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center dark:text-white"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="bg-transparent border-2 border-indigo-500 text-black dark:text-white px-5 py-2 rounded-lg font-medium transition-all hover:bg-indigo-500 hover:text-white"
          >
            Se Connecter
          </Link>

          <Link
            to="/register"
            className="bg-gradient-to-r from-indigo-600 to-cyan-300 text-white px-5 py-2 rounded-lg font-medium transition-all hover:scale-105"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>
  );
}