

import {
  FaArrowRight
}
from "react-icons/fa";

const steps=[

  {
    number:"1",
    title:"Créez votre compte",
    description:"Inscrivez-vous en tant qu'organisateur et connectez-vous de manière sécurisée."
  },

  {
    number:"2",
    title:"Créez votre événement",
    description:"Ajoutez le titre, la date, le lieu, l'image et la capacité maximale."
  },

  {
    number:"3",
    title:"Publiez & inscrivez",
    description:"Publiez votre événement et laissez les participants s'inscrire facilement."
  },

  {
    number:"4",
    title:"Contrôlez l'accès",
    description:"Scannez les QR-codes et validez les billets instantanément."
  }

];

export default function HowItWorks(){

  return(

    <section id="how" className="py-24 px-[8%] bg-slate-100 dark:bg-slate-900 transition-all">

      <div className="text-center max-w-[700px] mx-auto">

        <h2 className="text-4xl font-extrabold dark:text-white">

          Comment ça marche ?

        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-5">

          Un processus simple et rapide en 4 étapes pour gérer vos événements.

        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-20">

        {

          steps.map((step,index)=>(

            <div
              key={index}
              className="relative flex flex-col items-center"
            >

              <div className="bg-white dark:bg-slate-950 rounded-[30px] p-8 shadow-lg border border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-all h-full text-center">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-8">

                  {step.number}

                </div>

                <h3 className="text-xl font-bold dark:text-white">

                  {step.title}

                </h3>

                <p className="text-slate-500 dark:text-slate-400 mt-4 leading-7">

                  {step.description}

                </p>

              </div>

              {

                index < steps.length-1 && (

                  <div className="hidden lg:flex absolute -right-8 top-[50%] text-indigo-500 text-2xl">

                    <FaArrowRight/>

                  </div>

                )

              }

            </div>

          ))

        }

      </div>

    </section>

  )

}