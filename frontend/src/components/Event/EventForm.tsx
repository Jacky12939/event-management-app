import { useState } from 'react';
import api from '../../services/api';

interface Props {
  onSuccess?: () => void;
}

export default function EventForm({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    capacity: 0,
    image: '',
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

      const isoDate = formData.date && formData.time
        ? new Date(`${formData.date}T${formData.time}:00`).toISOString()
        : formData.date
          ? new Date(formData.date).toISOString()
          : '';

      await api.post('/events', {
        title: formData.title,
        description: formData.description,
        date: isoDate,
        time: formData.time,
        location: formData.location,
        category: formData.category,
        capacity: formData.capacity,
        image: formData.image || undefined,
      });

      setSuccess(true);
      setFormData({
        title: '', description: '', date: '', time: '',
        location: '', category: '', capacity: 0, image: '',
      });

      if (onSuccess) onSuccess();
    } catch (err: any) {
      const message = err?.response?.data?.message || "Erreur lors de la création de l'événement";
      setError(Array.isArray(message) ? message.join(', ') : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl space-y-6 border dark:border-gray-800">
      <h2 className="text-2xl font-bold text-indigo-600">
        Créer un événement
      </h2>

  
      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-xl border border-red-100 dark:border-red-900/50">
          {error}
        </div>
      )}

      
      {success && (
        <div className="p-4 text-sm text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-400 rounded-xl border border-green-100 dark:border-green-900/50">
          Événement créé avec succès !
        </div>
      )}

      
      <div className="grid md:grid-cols-2 gap-4">
        <input name="title" value={formData.title} placeholder="Titre" onChange={handleChange} className="input" />
        <input name="location" value={formData.location} placeholder="Lieu" onChange={handleChange} className="input" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} className="input" />
        <input type="time" name="time" value={formData.time} onChange={handleChange} className="input" />
        <input name="category" value={formData.category} placeholder="Catégorie" onChange={handleChange} className="input" />
        <input type="number" name="capacity" value={formData.capacity || ''} placeholder="Capacité" onChange={handleChange} className="input" />
      </div>

      <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange} className="input h-28" />
      <input name="image" value={formData.image} placeholder="Image URL" onChange={handleChange} className="input" />

      <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? "Création..." : "Créer l'événement"}
      </button>
    </form>
  );
}