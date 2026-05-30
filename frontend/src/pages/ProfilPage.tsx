// =============================================================
// frontend/src/pages/ProfilePage.tsx
// Profil utilisateur + bouton "Devenir organisateur"
// =============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaCalendarAlt,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [becoming, setBecoming] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // ------------------------------------------------------------------
  // Devenir organisateur
  // ------------------------------------------------------------------
  const handleBecomeOrganizer = async () => {
    setBecoming(true);
    setError("");
    try {
      await api.patch("/auth/become-organizer");
      setSuccess(true);
      setShowConfirm(false);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message || "Une erreur est survenue.",
        );
      } else {
        setError("Impossible de traiter la demande. Vérifiez votre réseau.");
      }
    } finally {
      setBecoming(false);
    }
  };

  // ------ Chargement ------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // ------ Non connecté ------
  if (!user) {
    navigate("/login");
    return null;
  }

  // ------------------------------------------------------------------
  // Rendu
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-all">
      {/* En-tête */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Mon Profil
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Avatar + nom */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-indigo-600 dark:text-indigo-400 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {user.prenom} {user.nom}
          </h2>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
              user.role === "organizer"
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            {user.role === "organizer" ? "Organisateur" : "Participant"}
          </span>
        </div>

        {/* Informations */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            Informations personnelles
          </h3>

          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <FaUser className="text-indigo-500 text-lg" />
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Nom complet
              </p>
              <p className="font-semibold">
                {user.prenom} {user.nom}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <FaEnvelope className="text-indigo-500 text-lg" />
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
            <FaUserTag className="text-indigo-500 text-lg" />
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500">Rôle</p>
              <p className="font-semibold capitalize">
                {user.role === "organizer" ? "Organisateur" : "Participant"}
              </p>
            </div>
          </div>
        </div>

        {/* Bouton devenir organisateur */}
        {user.role === "attendee" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
                <FaCalendarAlt className="text-indigo-600 dark:text-indigo-400 text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Devenir organisateur
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Créez et gérez vos propres événements. Accédez au tableau de
                  bord organisateur avec les statistiques d'inscriptions.
                </p>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm mt-3">
                    {error}
                  </div>
                )}

                {!showConfirm ? (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition text-sm"
                  >
                    Devenir organisateur
                  </button>
                ) : (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Confirmez-vous vouloir devenir organisateur ?
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleBecomeOrganizer}
                        disabled={becoming}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-5 py-2.5 rounded-xl font-semibold transition text-sm"
                      >
                        {becoming ? (
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        ) : (
                          "Confirmer"
                        )}
                      </button>
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold transition text-sm"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Déjà organisateur */}
        {(user.role === "organizer" || success) && (
          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 p-6 flex items-center gap-4">
            <FaCheckCircle className="text-indigo-600 text-3xl flex-shrink-0" />
            <div>
              <h3 className="font-bold text-indigo-700 dark:text-indigo-300">
                Vous êtes organisateur !
              </h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                Vous pouvez créer et gérer des événements depuis votre tableau
                de bord.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-semibold transition text-sm"
              >
                Aller au tableau de bord
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
