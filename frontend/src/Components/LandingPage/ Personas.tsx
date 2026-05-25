

const personas=[

  {
    emoji:"👩‍💼",
    name:"Alice",
    role:"Organisatrice",
    description:"Crée et gère tous les événements depuis son tableau de bord.",
    bg:"bg-indigo-100 dark:bg-indigo-950",
    actions:[

      "Créer des événements",
      "Définir une capacité maximale",
      "Suivre les inscriptions",
      "Voir les statistiques"

    ]
  },

  {
    emoji:"👨‍🎓",
    name:"Bob",
    role:"Participant",
    description:"Recherche les événements disponibles et réserve sa place rapidement.",
    bg:"bg-cyan-100 dark:bg-cyan-950",
    actions:[

      "S'inscrire à un événement",
      "Recevoir un billet numérique",
      "Obtenir un QR-code",
      "Accéder rapidement à l'événement"

    ]
  },

  {
    emoji:"👮‍♀️",
    name:"Carla",
    role:"Responsable d'accès",
    description:"Contrôle les entrées et valide les billets des participants.",
    bg:"bg-purple-100 dark:bg-purple-950",
    actions:[

      "Scanner les QR-codes",
      "Vérifier les billets",
      "Contrôler les accès",
      "Réduire les fraudes"

    ]
  }

];

export default function Personas(){

  return(

    <section id="personas" className="py-24 px-[8%] bg-white dark:bg-slate-950 transition-all">

      <div className="text-center max-w-[700px] mx-auto">

        <h2 className="text-4xl font-extrabold dark:text-white">

          Pour chaque profil

        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-5">

          Une solution conçue pour chaque utilisateur afin d'offrir une expérience fluide et adaptée.

        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">

        {

          personas.map((persona,index)=>(

            <div
              key={index}
              className={`${persona.bg} rounded-[30px] p-10 transition-all hover:-translate-y-2`}
            >

              <div className="text-6xl mb-8">

                {persona.emoji}

              </div>

              <h2 className="text-2xl font-extrabold dark:text-white">

                {persona.name}

              </h2>

              <p className="text-indigo-600 font-semibold mt-2">

                {persona.role}

              </p>

              <p className="text-slate-600 dark:text-slate-300 mt-6 leading-7">

                {persona.description}

              </p>

              <div className="mt-8">

                {

                  persona.actions.map((action,index)=>(

                    <div
                      key={index}
                      className="flex items-center gap-3 mb-4"
                    >

                      <div className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 flex items-center justify-center font-bold text-indigo-600">

                        ✓

                      </div>

                      <span className="text-slate-700 dark:text-slate-300">

                        {action}

                      </span>

                    </div>

                  ))

                }

              </div>

            </div>

          ))

        }

      </div>

    </section>

  )

}