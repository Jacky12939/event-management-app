

import {
  FaArrowRight,
  FaCalendarAlt,
  FaUsers,

}
from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Hero(){
  return(

    <section className=" landingHero min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-black dark:via-slate-950 dark:to-black px-[8%] pt-36 pb-24 flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden" id="hero">

      <div className="max-w-[620px]">

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-white mb-8">

          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>

          Nouvelle version disponible

        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-white">

          Gérez vos

          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">

            {" "}événements{" "}

          </span>

          facilement

        </h1>

        <p className="text-slate-300 text-lg mt-8 leading-8">

          Créez, publiez et gérez vos événements avec une plateforme moderne intégrant inscription en ligne, QR-code sécurisé et statistiques en temps réel.

        </p>

        <div className="flex flex-col sm:flex-row gap-5 mt-10">

         <Link
            to="/login"
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-3 hover:scale-105 transition-all"
          >

            Créer un événement

            <FaArrowRight/>

          </Link>

          <button 
          onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
            className="border border-white/20 px-8 py-4 rounded-xl text-white hover:bg-white/10 transition-all">
           

              Découvrir comment ça fonctionne

          </button>

        </div>

        

        </div>


      <div className="relative w-full max-w-[550px]">

        <div className="bg-white/5 dark:bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-[30px] p-8 shadow-2xl">

          <div className="flex gap-2 mb-8">

            <div className="w-3 h-3 rounded-full bg-red-400"></div>

            <div className="w-3 h-3 rounded-full bg-blue-400"></div>

            <div className="w-3 h-3 rounded-full bg-green-400"></div>

          </div>

          <div className="space-y-5">

            <div className="bg-white/5 rounded-2xl p-5 flex items-center gap-4 border-1 border-slate-600">

              <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center text-white">

                <FaCalendarAlt/>

              </div>

              <div>

                <h3 className="text-white font-semibold">

                  Tech Conference

                </h3>

                <p className="text-slate-400 text-sm">

                  120 participants

                </p>

              </div>

            </div>

            <div className="bg-white/5 rounded-2xl p-5 flex items-center gap-4 border-1 border-slate-600">

              <div className="w-14 h-14 rounded-xl bg-cyan-500 flex items-center justify-center text-white">

                <FaUsers/>

              </div>

              <div>

                <h3 className="text-white font-semibold">

                  Participants

                </h3>

                <p className="text-slate-400 text-sm">

                  +45 nouveaux aujourd'hui

                </p>

              </div>

            </div>

            <div className=" flex items-center gap-10">

                <div className="border-1 border-slate-600 p-5 rounded-2xl bg-white/5 ">
                    <h2 className="text-green-300 text-3xl font-bold">
                      500+
                    </h2>
                    <p className="text-slate-400">
                      Événements
                    </p>
                  </div>
                  <div className="border-1 border-slate-600 p-5 rounded-2xl bg-white/5">
                    <h2 className="text-green-300  text-3xl font-bold">
                      10K+
                    </h2>
                    <p className="text-slate-400">
                      Participants
                    </p>
                  </div>

                  <div className="border-1 border-slate-600 p-5 rounded-2xl bg-white/5">
                    <h2 className="text-green-300 text-3xl font-bold">
                      98%
                    </h2>
                    <p className="text-slate-400">
                      Satisfaction
                    </p>


              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}