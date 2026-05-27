import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin
}
from "react-icons/fa";

export default function Footer(){

  return(

    <footer className="bg-slate-950 px-[8%] py-16">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div>

          <h2 className="text-white text-2xl font-extrabold">

            EventFlow

          </h2>

          <p className="text-slate-400 mt-5 leading-7">

            Une plateforme moderne de gestion des événements.

          </p>

        </div>

        <div>

          <h3 className="text-white font-bold mb-5">

            Produit

          </h3>

          <ul className="space-y-4 text-slate-400">

            <li>

              Fonctionnalités

            </li>

            <li>

              Dashboard

            </li>

            <li>

              QR Code

            </li>

          </ul>

        </div>

        <div>

          <h3 className="text-white font-bold mb-5">

            Ressources

          </h3>

          <ul className="space-y-4 text-slate-400">

            <li>

              Documentation

            </li>

            <li>

              Guides

            </li>

            <li>

              Support

            </li>

          </ul>

        </div>


      </div>

      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">

        © 2026 EventFlow — Tous droits réservés

      </div>

    </footer>

  )

}