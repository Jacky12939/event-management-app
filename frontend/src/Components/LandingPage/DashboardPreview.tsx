// Components/LandingPage/DashboardPreview.tsx

import {
  FaCalendarAlt,
  FaUsers,
  FaChartLine,
  FaTicketAlt
}
from "react-icons/fa";

export default function DashboardPreview(){

  return(

    <section id="dashboard" className="py-20 px-[8%] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 dark:from-black dark:to-slate-950">

      <div className="text-center mb-12">

        <h2 className="text-3xl font-extrabold text-white">

          Votre tableau de bord

        </h2>

        <p className="text-slate-400 mt-4 max-w-[500px] mx-auto">

          Gérez vos événements depuis une interface moderne.

        </p>

      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[25px] p-5">

        <div className="flex gap-2 mb-5">

          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>

          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>

          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-6">

          <div className="bg-white/5 rounded-2xl p-4">

            <h3 className="text-white font-semibold mb-6">

              Dashboard

            </h3>

            <div className="space-y-3">

              <div className="bg-indigo-500 rounded-lg py-2 px-3 text-sm text-white">

                Vue générale

              </div>

              <div className="bg-white/5 rounded-lg py-2 px-3 text-sm text-slate-300">

                Événements

              </div>

              <div className="bg-white/5 rounded-lg py-2 px-3 text-sm text-slate-300">

                Participants

              </div>

              <div className="bg-white/5 rounded-lg py-2 px-3 text-sm text-slate-300">

                Statistiques

              </div>

            </div>

          </div>

          <div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="bg-white/5 rounded-xl p-4">

                <FaCalendarAlt className="text-cyan-400 text-xl"/>

                <h2 className="text-2xl text-white font-bold mt-3">

                  12

                </h2>

                <p className="text-xs text-slate-400">

                  Événements

                </p>

              </div>

              <div className="bg-white/5 rounded-xl p-4">

                <FaUsers className="text-indigo-400 text-xl"/>

                <h2 className="text-2xl text-white font-bold mt-3">

                  486

                </h2>

                <p className="text-xs text-slate-400">

                  Participants

                </p>

              </div>

              <div className="bg-white/5 rounded-xl p-4">

                <FaTicketAlt className="text-purple-400 text-xl"/>

                <h2 className="text-2xl text-white font-bold mt-3">

                  762

                </h2>

                <p className="text-xs text-slate-400">

                  Billets

                </p>

              </div>

              <div className="bg-white/5 rounded-xl p-4">

                <FaChartLine className="text-green-400 text-xl"/>

                <h2 className="text-2xl text-white font-bold mt-3">

                  94%

                </h2>

                <p className="text-xs text-slate-400">

                  Participation

                </p>

              </div>

            </div>

            <div className="bg-white/5 rounded-2xl p-5 mt-6">

              <h3 className="text-white font-semibold mb-6">

                Activité

              </h3>

              <div className="flex items-end gap-3 h-[140px]">

                <div className="bg-gradient-to-t from-indigo-600 to-cyan-200 w-50 rounded-t-lg h-[45%]"></div>

                <div className="bg-gradient-to-t from-indigo-600 to-cyan-200 w-50 rounded-t-lg h-[70%]"></div>

                <div className="bg-gradient-to-t from-indigo-600 to-cyan-200 w-50 rounded-t-lg h-[55%]"></div>

                <div className="bg-gradient-to-t from-indigo-600 to-cyan-200 w-50 rounded-t-lg h-[90%]"></div>

                <div className="bg-gradient-to-t from-indigo-600 to-cyan-200 w-50 rounded-t-lg h-[60%]"></div>

                <div className="bg-gradient-to-t from-indigo-600 to-cyan-200 w-50 rounded-t-lg h-[100%]"></div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )

}