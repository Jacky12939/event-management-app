import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../assets/logo.png";

interface Props{
  children:ReactNode;
}

export default function AuthLayout({
  children
}:Props){

  const {
    darkMode,
    toggleTheme
  }=useTheme();

  return(

    <div className="min-h-screen bg-slate-100 dark:bg-[#0f172a] transition-all">

      {/* Navbar */}

      <nav className="flex items-center justify-between px-[8%] py-5 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800">

        <Link
          to="/"
          className="flex items-center gap-3"
        >

          <div className="flex items-center">
            <div>
              <img src={logo} alt="logo" className="h-12 w-auto object-contain" />
            </div>
          
            <h1 className="font-extrabold text-xl dark:text-white -ml-6">
              EventFlow
            </h1>
          </div>

        </Link>

        <div className="flex items-center gap-4">

         

          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white flex items-center justify-center"
          >

            {

              darkMode
              ?
              <FaSun/>
              :
              <FaMoon/>

            }

          </button>

        </div>

      </nav>

      {/* Form */}

      <div className="flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md bg-white dark:bg-[#1e293b] dark:text-white rounded-2xl shadow-lg p-8 transition-all">

          {children}

        </div>

      </div>

    </div>

  )

}