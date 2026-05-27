import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import { useTheme } from "../../context/ThemeContext";

import {
  FaSun,
  FaMoon,
  FaUserTie,
  FaUsers,
  FaQrcode,
  FaUserCircle,
  FaSignOutAlt
}
from "react-icons/fa";

export default function OrganizerDashboard(){

  const {darkMode,toggleTheme}=useTheme();

  const [openProfile,setOpenProfile]=
  useState(false);

  const user={

    name:"Jacky",
    email:"jacky@gmail.com",
    role:"Organisateur"

  };

  const settings={

    dots:true,
    infinite:true,
    autoplay:true,
    autoplaySpeed:3000,
    arrows:false,
    pauseOnHover:false,
    slidesToShow:1,
    slidesToScroll:1

  };

  const images=[

    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",

    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",

    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200"

  ];

  return(

    <div className="min-h-screen bg-slate-100 dark:bg-[#0f172a] transition-all">

      {/* NAVBAR */}

      <nav className="bg-white dark:bg-slate-900 px-[8%] py-5 shadow-sm flex items-center justify-between relative">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold">

            E

          </div>

          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">

            EventFlow

          </h1>

        </div>

        <div className="flex items-center gap-5">

          {/* DARK MODE */}

          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-white hover:scale-110 hover:bg-indigo-500 hover:text-white transition-all duration-300"
          >

            {

              darkMode
              ?
              <FaSun size={18}/>
              :
              <FaMoon size={18}/>

            }

          </button>

          {/* PROFILE */}

          <div className="relative">

            <button
              onClick={()=>setOpenProfile(!openProfile)}
              className="hover:scale-110 transition-all"
            >

              <FaUserCircle
                size={48}
                className="text-indigo-600 dark:text-cyan-400"
              />

            </button>

            {

              openProfile && (

                <div className="absolute right-0 mt-4 w-[260px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-5 z-50">

                  <div className="flex flex-col items-center border-b border-slate-200 dark:border-slate-700 pb-4">

                    <FaUserCircle
                      size={70}
                      className="text-indigo-600 mb-3"
                    />

                    <h3 className="font-bold text-slate-900 dark:text-white">

                      {user.name}

                    </h3>

                    <p className="text-sm text-slate-500">

                      {user.email}

                    </p>

                    <span className="mt-2 px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-600">

                      {user.role}

                    </span>

                  </div>

                  <button
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition-all"
                  >

                    <FaSignOutAlt/>

                    Déconnexion

                  </button>

                </div>

              )

            }

          </div>

        </div>

      </nav>

      {/* CONTENT */}

      <section className="px-[8%] py-12">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}

          <div>

            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">

              Bienvenue 👋

            </h1>

            <h2 className="text-2xl font-semibold text-indigo-600 mb-5">

              Tableau de bord EventFlow

            </h2>

            <p className="text-slate-600 dark:text-slate-300 leading-8 mb-10">

              Choisissez l'action que vous souhaitez effectuer.

            </p>

            <div className="flex flex-col md:flex-row gap-5">

              <Link to="/organisateur" className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all">

                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl mb-4">

                  <FaUserTie/>

                </div>

                <h3 className="font-bold dark:text-white">

                  Organisateur

                </h3>

              </Link>

              <Link to="/participant" className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all">

                <div className="w-14 h-14 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600 text-2xl mb-4">

                  <FaUsers/>

                </div>

                <h3 className="font-bold dark:text-white">

                  Participant

                </h3>

              </Link>

              <Link to="/controle" className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-xl transition-all">

                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl mb-4">

                  <FaQrcode/>

                </div>

                <h3 className="font-bold dark:text-white">

                  Contrôle

                </h3>

              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="overflow-hidden rounded-3xl shadow-2xl">

            <Slider {...settings}>

              {

                images.map(

                  (image,index)=>(

                    <img
                      key={index}
                      src={image}
                      alt=""
                      className="w-full h-[500px] object-cover"
                    />

                  )

                )

              }

            </Slider>

          </div>

        </div>

      </section>

    </div>

  );

}