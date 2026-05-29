import { useState } from 'react';
import api from '../../services/api';

interface Props {
  onSuccess?: () => void;
}

export default function EventForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title:       '',
    description: '',
    date:        '',
    time:        '',
    location:    '',
    category:    '',
    capacity:    0,
    image:       '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: (name === 'capacity' || name === 'price') ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setLoading(true);

      //  Conversion date HTML + time → DateTime ISO complet requis par Prisma
      const isoDate = formData.date && formData.time
        ? new Date(`${formData.date}T${formData.time}:00`).toISOString()
        : formData.date
          ? new Date(formData.date).toISOString()
          : '';

      //  organizerId retiré du body — le backend l'extrait du JWT automatiquement
      await api.post('/events', {
        title:       formData.title,
        description: formData.description,
        date:        isoDate,
        time:        formData.time,
        location:    formData.location,
        category:    formData.category,
        capacity:    formData.capacity,
        image:       formData.image || undefined,
      });

      setSuccess(true);
      setFormData({
        title: '', description: '', date: '', time: '',
        location: '', category: '', capacity: 0, image: '',
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Erreur lors de la création de l'événement";
      setError(Array.isArray(message) ? message.join(', ') : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Créer un événement
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
          Événement créé avec succès !
        </div>
      )}

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Titre *</label>
        <input
          type="text" name="title" value={formData.title}
          onChange={handleChange} required
          className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
        <textarea
          name="description" value={formData.description}
          onChange={handleChange} rows={4} required
          className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Date *</label>
          <input
            type="date" name="date" value={formData.date}
            onChange={handleChange} required
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Heure *</label>
          <input
            type="time" name="time" value={formData.time}
            onChange={handleChange} required
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Lieu *</label>
          <input
            type="text" name="location" value={formData.location}
            onChange={handleChange} required
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie *</label>
          <input
            type="text" name="category" value={formData.category}
            onChange={handleChange} required placeholder="Concert, Conférence, Sport..."
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Capacité *</label>
          <input
            type="number" name="capacity" value={formData.capacity} min={1}
            onChange={handleChange} required
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Image URL (optionnel)</label>
          <input
            type="text" name="image" value={formData.image}
            onChange={handleChange} placeholder="https://..."
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl transition font-semibold"
      >
        {loading ? 'Création en cours...' : "Créer l'événement"}
      </button>
    </form>
  );
}