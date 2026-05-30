import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import {
  FaSun, FaMoon, FaUserTie, FaUsers,
  FaQrcode, FaUserCircle, FaSignOutAlt, FaCalendarPlus,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200",
];

export default function OrganizerDashboard() {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout }          = useAuth();
  const navigate                  = useNavigate();
  const [openProfile, setOpenProfile]   = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useState(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0f172a] transition-all">


      <nav className="bg-white dark:bg-slate-900 px-[8%] py-5 shadow-sm flex items-center justify-between relative">
        <div className="flex items-center">

              <div>
                <img
                  src={logo}
                  alt="logo"
                  className="h-12 w-auto object-contain"
                />
              </div>

              <h1 className="font-extrabold text-xl dark:text-white -ml-6">
                EventFlow
              </h1>

            </div>

        <div className="flex items-center gap-5">
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-white hover:scale-110 hover:bg-indigo-500 hover:text-white transition-all duration-300"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          <div className="relative">
            <button onClick={() => setOpenProfile(!openProfile)} className="hover:scale-110 transition-all">
              <FaUserCircle size={48} className="text-indigo-600 dark:text-cyan-400" />
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-4 w-[260px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-5 z-50">
                <div className="flex flex-col items-center border-b border-slate-200 dark:border-slate-700 pb-4">
                  <FaUserCircle size={70} className="text-indigo-600 mb-3" />
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {user ? `${user.prenom} ${user.nom}` : '—'}
                  </h3>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                  <span className="mt-2 px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-600">
                    {user?.role === 'organizer' ? 'Organisateur' : 'Participant'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-all"
                >
                  <FaSignOutAlt />
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <section className="px-[8%] py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Bienvenue!!</h1>
            {user && (
              <p className="text-xl text-indigo-600 font-semibold mb-4">
                {user.prenom} {user.nom}
              </p>
            )}
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-5">
              Tableau de bord EventFlow
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-8 mb-10">
              Choisissez l'action que vous souhaitez effectuer.
            </p>

            <div className="flex flex-col md:flex-row gap-5">
              <Link to="/organisateur" className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl mb-4"><FaUserTie /></div>
                <h3 className="font-bold dark:text-white">Organisateur</h3>
              </Link>

              <Link to="/my-tickets" className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 text-2xl mb-4"><FaUsers /></div>
                <h3 className="font-bold dark:text-white">Participant</h3>
              </Link>

              <Link to="/checker" className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl mb-4"><FaQrcode /></div>
                <h3 className="font-bold dark:text-white">Contrôle</h3>
              </Link>
            </div>

            {user?.role === 'organizer' && (
              <Link
                to="/organisateur"
                className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all font-semibold"
              >
                <FaCalendarPlus />
                Créer un événement
              </Link>
            )}
          </div>

          {/* Carrousel CSS sans react-slick */}
          <div className="overflow-hidden rounded-3xl shadow-2xl relative h-[400px]">
            {CAROUSEL_IMAGES.map((src, i) => (
              <img
                key={i} src={src} alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  i === carouselIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {CAROUSEL_IMAGES.map((_, i) => (
                <button
                  key={i} onClick={() => setCarouselIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === carouselIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}