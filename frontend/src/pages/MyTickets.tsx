// =============================================================
// frontend/src/pages/MyTickets.tsx
// Liste des inscriptions et billets du participant connecté
// =============================================================

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaQrcode,
  FaArrowLeft,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
interface MyRegistration {
  id: string;
  ticketCode: string;
  checkedIn: boolean;
  createdAt: string;
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image?: string;
    status: string;
    category: string;
  };
}

// ------------------------------------------------------------------
// Couleurs statut événement
// ------------------------------------------------------------------
const statusStyle: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-700",
  DRAFT: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-600",
};

const statusLabel: Record<string, string> = {
  PUBLISHED: "Publié",
  DRAFT: "Brouillon",
  CANCELLED: "Annulé",
  COMPLETED: "Terminé",
};

// ------------------------------------------------------------------
// Données mock (à remplacer par l'API quand le backend est prêt)
// ------------------------------------------------------------------
const MOCK_REGISTRATIONS: MyRegistration[] = [
  {
    id: "reg-001",
    ticketCode: "TICKET-001-ABC",
    checkedIn: false,
    createdAt: "2026-05-20T10:00:00Z",
    event: {
      id: "evt-001",
      title: "Workshop React Avancé",
      date: "2026-06-15T00:00:00Z",
      time: "09:00",
      location: "Yaoundé, Cameroun",
      status: "PUBLISHED",
      category: "Tech",
    },
  },
  {
    id: "reg-002",
    ticketCode: "TICKET-002-DEF",
    checkedIn: true,
    createdAt: "2026-05-18T14:00:00Z",
    event: {
      id: "evt-002",
      title: "Conférence IA & Afrique",
      date: "2026-05-25T00:00:00Z",
      time: "14:00",
      location: "Douala, Cameroun",
      status: "COMPLETED",
      category: "Intelligence Artificielle",
    },
  },
];

// ------------------------------------------------------------------
// Composant principal
// ------------------------------------------------------------------
export default function MyTickets() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState<MyRegistration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rediriger si non connecté
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (!user) return;

    // Appel API réel — décommenter quand le backend est prêt
    // api
    //   .get<MyRegistration[]>(`/registrations/my`)
    //   .then((res) => setRegistrations(res.data))
    //   .catch(() => setRegistrations([]))
    //   .finally(() => setLoading(false));

    // Mock temporaire
    setTimeout(() => {
      setRegistrations(MOCK_REGISTRATIONS);
      setLoading(false);
    }, 600);
  }, [user, authLoading]);

  // ------ Chargement ------
  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  // ------ Rendu ------
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-all">
      {/* En-tête */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <FaTicketAlt className="text-blue-600" />
              Mes Billets
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Bonjour {user?.prenom} — {registrations.length} inscription(s)
            </p>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Aucune inscription */}
        {registrations.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <FaTicketAlt className="text-6xl text-gray-300 dark:text-gray-700 mx-auto" />
            <h2 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
              Aucune inscription pour le moment
            </h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Découvrez les événements disponibles et inscrivez-vous !
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition mt-2"
            >
              Voir les événements
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((reg) => (
              <div
                key={reg.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <img
                    src={
                      reg.event.image ||
                      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                    }
                    alt={reg.event.title}
                    className="h-40 sm:h-auto sm:w-36 object-cover"
                  />

                  {/* Infos */}
                  <div className="flex-1 p-5 space-y-3">
                    {/* Titre + statut */}
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                        {reg.event.title}
                      </h2>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle[reg.event.status] || "bg-gray-100 text-gray-600"}`}
                      >
                        {statusLabel[reg.event.status] || reg.event.status}
                      </span>
                    </div>

                    {/* Détails */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-blue-500" />
                        {new Date(reg.event.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-blue-500" />
                        {reg.event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-blue-500" />
                        {reg.event.location}
                      </span>
                    </div>

                    {/* Code billet + check-in */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg">
                          {reg.ticketCode}
                        </span>
                        {reg.checkedIn && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                            ✓ Présence validée
                          </span>
                        )}
                      </div>

                      {/* Bouton voir QR */}
                      <Link
                        to={`/ticket/${reg.ticketCode}`}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                      >
                        <FaQrcode />
                        Voir mon QR code
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
