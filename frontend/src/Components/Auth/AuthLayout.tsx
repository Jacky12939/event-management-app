import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import img1 from "../../assets/img1.jpg";
import logo from "../../assets/logo.png";


interface Props {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: Props) {

  const {
    darkMode,
    toggleTheme
  } = useTheme();

  return (

    <div className="relative min-h-screen overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${img1})`,
        }}
      />

      {/* Overlay transparent */}
      <div className="absolute inset-0 bg-black/45 dark:bg-black/60" />

      {/* Contenu */}
      <div className="relative z-10">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-[8%] py-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

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

          </Link>

          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white flex items-center justify-center"
          >

            {
              darkMode
                ? <FaSun />
                : <FaMoon />
            }

          </button>

        </nav>

        {/* Form */}
        <div className="flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-md bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md dark:text-white rounded-2xl shadow-lg p-8 transition-all">

            {children}

          </div>

        </div>

      </div>

    </div>

  );

}