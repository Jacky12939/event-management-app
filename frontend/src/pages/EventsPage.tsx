// =============================================================
// frontend/src/pages/EventsPage.tsx
// Liste des événements avec recherche et filtres
// =============================================================

import { useState, useEffect, useMemo } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import EventList from "../components/Event/EventList";
import type { EventType } from "../Components/Event/types/event";

// ------------------------------------------------------------------
// Données mock (à remplacer par l'API quand le backend est prêt)
// ------------------------------------------------------------------
const MOCK_EVENTS: EventType[] = [
  {
    id: "evt-001",
    title: "Workshop React Avancé",
    description: "Apprenez les patterns avancés de React avec TypeScript.",
    date: "2026-06-15T00:00:00Z",
    time: "09:00",
    location: "Yaoundé, Cameroun",
    category: "Tech",
    capacity: 50,
    status: "PUBLISHED",
    organizerId: "org-001",
    createdAt: "2026-05-01T00:00:00Z",
  },
  {
    id: "evt-002",
    title: "Conférence IA & Afrique",
    description:
      "L'intelligence artificielle au service du développement africain.",
    date: "2026-06-20T00:00:00Z",
    time: "14:00",
    location: "Douala, Cameroun",
    category: "Intelligence Artificielle",
    capacity: 200,
    status: "PUBLISHED",
    organizerId: "org-002",
    createdAt: "2026-05-05T00:00:00Z",
  },
  {
    id: "evt-003",
    title: "Hackathon Miabe 2026",
    description: "48h pour innover et créer des solutions pour l'Afrique.",
    date: "2026-07-01T00:00:00Z",
    time: "08:00",
    location: "Yaoundé, Cameroun",
    category: "Hackathon",
    capacity: 100,
    status: "PUBLISHED",
    organizerId: "org-001",
    createdAt: "2026-05-10T00:00:00Z",
  },
  {
    id: "evt-004",
    title: "Atelier Design UI/UX",
    description: "Créez des interfaces modernes et accessibles.",
    date: "2026-06-25T00:00:00Z",
    time: "10:00",
    location: "Bafoussam, Cameroun",
    category: "Design",
    capacity: 30,
    status: "PUBLISHED",
    organizerId: "org-003",
    createdAt: "2026-05-12T00:00:00Z",
  },
  {
    id: "evt-005",
    title: "Meetup Node.js Cameroun",
    description: "Rencontrez la communauté Node.js du Cameroun.",
    date: "2026-06-10T00:00:00Z",
    time: "18:00",
    location: "Douala, Cameroun",
    category: "Tech",
    capacity: 80,
    status: "CANCELLED",
    organizerId: "org-002",
    createdAt: "2026-05-08T00:00:00Z",
  },
];

// ------------------------------------------------------------------
// Catégories et statuts disponibles
// ------------------------------------------------------------------
const CATEGORIES = [
  "Tous",
  "Tech",
  "Intelligence Artificielle",
  "Hackathon",
  "Design",
];
const LOCATIONS = [
  "Tous",
  "Yaoundé, Cameroun",
  "Douala, Cameroun",
  "Bafoussam, Cameroun",
];
const STATUSES = [
  { value: "ALL", label: "Tous les statuts" },
  { value: "PUBLISHED", label: "Publié" },
  { value: "CANCELLED", label: "Annulé" },
  { value: "COMPLETED", label: "Terminé" },
];

// ------------------------------------------------------------------
// Composant principal
// ------------------------------------------------------------------
export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [location, setLocation] = useState("Tous");
  const [status, setStatus] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  // Charger les événements
  useEffect(() => {
    // Appel API réel — décommenter quand le backend est prêt
    // api
    //   .get<{ data: EventType[] }>("/events")
    //   .then((res) => setEvents(res.data.data))
    //   .catch(() => setEvents([]))
    //   .finally(() => setLoading(false));

    // Mock temporaire
    setTimeout(() => {
      setEvents(MOCK_EVENTS);
      setLoading(false);
    }, 500);
  }, []);

  // Filtrage des événements
  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchSearch =
        search === "" ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "Tous" || e.category === category;

      const matchLocation = location === "Tous" || e.location === location;

      const matchStatus = status === "ALL" || e.status === status;

      return matchSearch && matchCategory && matchLocation && matchStatus;
    });
  }, [events, search, category, location, status]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setSearch("");
    setCategory("Tous");
    setLocation("Tous");
    setStatus("ALL");
  };

  const hasActiveFilters =
    search !== "" ||
    category !== "Tous" ||
    location !== "Tous" ||
    status !== "ALL";

  // ------------------------------------------------------------------
  // Rendu
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-all">
      {/* En-tête */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Événements disponibles
          </h1>

          {/* Barre de recherche */}
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un événement..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Bouton filtres */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold transition text-sm ${
                showFilters || hasActiveFilters
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <FaFilter />
              Filtres
              {hasActiveFilters && (
                <span className="bg-white text-blue-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                  !
                </span>
              )}
            </button>

            {/* Réinitialiser */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 font-semibold transition text-sm"
              >
                <FaTimes />
                Réinitialiser
              </button>
            )}
          </div>

          {/* Panneau de filtres */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Catégorie */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Catégorie
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lieu */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Lieu
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {LOCATIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              {/* Statut */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Statut
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {STATUSES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Résultats */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Compteur résultats */}
        {!loading && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {filtered.length} événement(s) trouvé(s)
            {hasActiveFilters && " pour votre recherche"}
          </p>
        )}

        {/* Chargement */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : (
          <EventList events={filtered} />
        )}
      </div>
    </div>
  );
}
