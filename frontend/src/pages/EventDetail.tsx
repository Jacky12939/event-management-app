// =============================================================
// frontend/src/pages/EventDetail.tsx
// =============================================================

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaTag,
  FaArrowLeft,
  FaTicketAlt,
} from "react-icons/fa";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import type { EventType } from "../Components/Event/types/event";

// ------------------------------------------------------------------
// Couleurs des statuts
// ------------------------------------------------------------------
const statusStyle: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-700",
  DRAFT: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-700",
};

const statusLabel: Record<string, string> = {
  PUBLISHED: "Publié",
  DRAFT: "Brouillon",
  CANCELLED: "Annulé",
  COMPLETED: "Terminé",
};

// ------------------------------------------------------------------
// Composant principal
// ------------------------------------------------------------------
export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const [regError, setRegError] = useState<string | null>(null);

  // Charger l'événement
  useEffect(() => {
    if (!id) return;
    api
      .get<EventType>(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setError("Événement introuvable."))
      .finally(() => setLoading(false));
  }, [id]);

  // S'inscrire à l'événement
  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setRegistering(true);
    setRegError(null);
    try {
      const res = await api.post(`/events/${id}/register`);
      setTicketCode(res.data.ticketCode);
      setRegistered(true);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Erreur lors de l'inscription.";
      setRegError(msg);
    } finally {
      setRegistering(false);
    }
  };

  // ------ États de chargement ------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 gap-4">
        <p className="text-red-500 text-lg">
          {error || "Événement introuvable."}
        </p>
        <Link to="/" className="text-blue-600 hover:underline">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  // ------ Rendu principal ------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Image de couverture */}
      <div className="relative h-72 md:h-96 w-full">
        <img
          src={
            event.image ||
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
          }
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Bouton retour */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full backdrop-blur-sm transition"
        >
          <FaArrowLeft />
          Retour
        </button>

        {/* Statut */}
        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${statusStyle[event.status] || "bg-gray-100 text-gray-700"}`}
        >
          {statusLabel[event.status] || event.status}
        </span>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Titre + catégorie */}
        <div>
          <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 mb-3">
            <FaTag className="inline mr-1" />
            {event.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            {event.title}
          </h1>
        </div>

        {/* Infos clés */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <FaCalendarAlt className="text-blue-600 text-xl" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {new Date(event.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <FaClock className="text-blue-600 text-xl" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Heure</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {event.time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <FaMapMarkerAlt className="text-blue-600 text-xl" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Lieu</p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {event.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <FaUsers className="text-blue-600 text-xl" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Capacité
              </p>
              <p className="font-semibold text-gray-800 dark:text-white">
                {event.capacity} places
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
            Description
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Zone inscription */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Déjà inscrit — affiche le code billet */}
          {registered && ticketCode ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <FaTicketAlt className="text-2xl" />
                <h3 className="text-xl font-bold">Inscription réussie !</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Votre billet a été généré. Voici votre code :
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 px-6 py-4 rounded-xl font-mono text-lg font-bold text-blue-600 dark:text-blue-400 break-all">
                {ticketCode}
              </div>
              <Link
                to={`/ticket/${ticketCode}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-semibold"
              >
                Voir mon billet avec QR code
              </Link>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                S'inscrire à cet événement
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
                {event.status === "PUBLISHED"
                  ? "Cet événement est ouvert aux inscriptions."
                  : "Cet événement n'accepte pas d'inscriptions pour le moment."}
              </p>

              {regError && (
                <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg mb-4 text-sm">
                  {regError}
                </div>
              )}

              {!user && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Connectez-vous
                  </Link>{" "}
                  pour vous inscrire.
                </p>
              )}

              <button
                onClick={handleRegister}
                disabled={registering || event.status !== "PUBLISHED"}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition"
              >
                {registering ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <FaTicketAlt />
                    S'inscrire maintenant
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
