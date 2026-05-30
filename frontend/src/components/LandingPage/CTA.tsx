

import {FaPlay}from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CTA(){

  return(

    <section id="cta" className="py-20 px-[8%] bg-white dark:bg-slate-950 transition-all">

      <div className="relative max-w-[900px] mx-auto overflow-hidden rounded-[35px] bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-12 text-center">

        <div className="absolute -top-24 -right-24 w-[250px] h-[250px] rounded-full bg-cyan-400/20 blur-3xl"></div>

        <div className="absolute -bottom-24 -left-24 w-[250px] h-[250px] rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div className="relative z-10">

          <span className="bg-white/10 text-cyan-300 px-4 py-2 rounded-full text-sm">

             Commencez aujourd'hui

          </span>

          <h2 className="text-4xl font-extrabold text-white mt-6">

            Digitalisez vos événements dès maintenant

          </h2>

          <p className="text-slate-300 mt-5 max-w-[550px] mx-auto leading-7">

            Créez vos événements, gérez vos participants et simplifiez chaque étape grâce à une plateforme moderne et intuitive.

          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

            <Link 
            to="/Login" 
            className="flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all">

              Commencer gratuitement!!

            </Link>

            <button className="flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">

              <FaPlay/>

              Voir la démo

            </button>

          </div>

        </div>

      </div>

    </section>

  )

}