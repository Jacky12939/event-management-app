

import {
  FaCalendarAlt,
  FaClipboardList,
  FaQrcode,
  FaChartLine,
  FaSearch,
  FaShieldAlt
}
from "react-icons/fa";

const features=[

  {
    icon:<FaCalendarAlt/>,
    title:"Création d'événements",
    description:"Créez et personnalisez vos événements avec le titre, la date, le lieu et la capacité.",
    color:"bg-indigo-100 dark:bg-indigo-950",
    iconColor:"text-indigo-600"
  },

  {
    icon:<FaClipboardList/>,
    title:"Inscriptions automatiques",
    description:"Les participants s'inscrivent rapidement avec gestion dynamique des places.",
    color:"bg-cyan-100 dark:bg-cyan-950",
    iconColor:"text-cyan-600"
  },

  {
    icon:<FaQrcode/>,
    title:"QR-Code sécurisé",
    description:"Chaque billet possède un QR-code unique pour un contrôle rapide.",
    color:"bg-yellow-100 dark:bg-yellow-950",
    iconColor:"text-yellow-600",
    badge:"MVP"
  },

  {
    icon:<FaChartLine/>,
    title:"Tableau de bord",
    description:"Consultez les statistiques et suivez l'évolution des inscriptions.",
    color:"bg-purple-100 dark:bg-purple-950",
    iconColor:"text-purple-600"
  },

  {
    icon:<FaSearch/>,
    title:"Recherche intelligente",
    description:"Recherchez facilement les événements par nom, date ou lieu.",
    color:"bg-green-100 dark:bg-green-950",
    iconColor:"text-green-600"
  },

  {
    icon:<FaShieldAlt/>,
    title:"Sécurité avancée",
    description:"Authentification JWT, bcrypt et protection renforcée intégrées.",
    color:"bg-red-100 dark:bg-red-950",
    iconColor:"text-red-600"
  }

];

export default function Features(){

  return(

    <section id="features" className="py-24 px-[8%] bg-white dark:bg-slate-950 transition-all">

      <div className="text-center max-w-[700px] mx-auto">

        <h2 className="text-4xl font-extrabold dark:text-white">

          Tout ce dont vous avez besoin

        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-5 leading-7">

          Une suite complète d'outils pour gérer vos événements, automatiser les inscriptions et suivre vos statistiques.

        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">

        {

          features.map((feature,index)=>(

            <div
              key={index}
              className="relative p-8 rounded-[30px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:-translate-y-3 hover:shadow-2xl transition-all"
            >

              {

                feature.badge && (

                  <div className="absolute top-6 right-6 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-bold">

                    {feature.badge}

                  </div>

                )

              }

              <div className={`w-16 h-16 rounded-2xl ${feature.color} ${feature.iconColor} flex items-center justify-center text-2xl`}>

                {feature.icon}

              </div>

              <h3 className="text-xl font-bold mt-8 dark:text-white">

                {feature.title}

              </h3>

              <p className="text-slate-500 dark:text-slate-400 mt-4 leading-7">

                {feature.description}

              </p>

            </div>

          ))

        }

      </div>

    </section>

  )

}