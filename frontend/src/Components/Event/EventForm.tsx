import { useState } from 'react';

import api from '../../services/api';

interface Props {
  onSuccess?: () => void;
}

export default function EventForm({
  onSuccess,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      capacity: 0,
      image: '',
    });

  // ============================================
  // HANDLE CHANGE
  // ============================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === 'capacity'
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        '/events',
        formData,
      );

      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: '',
        capacity: 0,
        image: '',
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        dark:bg-gray-900
        p-6
        rounded-2xl
        shadow-lg
        space-y-5
      "
    >
      {/* TITLE */}

      <div>
        <label
          className="
          block
          mb-2
          text-sm
          font-medium
          text-gray-700
          dark:text-gray-300
        "
        >
          Titre
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="
            w-full
            p-3
            rounded-xl
            border
            dark:bg-gray-800
            dark:border-gray-700
            dark:text-white
          "
        />
      </div>

      {/* DESCRIPTION */}

      <div>
        <label
          className="
          block
          mb-2
          text-sm
          font-medium
          text-gray-700
          dark:text-gray-300
        "
        >
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          className="
            w-full
            p-3
            rounded-xl
            border
            dark:bg-gray-800
            dark:border-gray-700
            dark:text-white
          "
        />
      </div>

      {/* GRID */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-4
      "
      >
        {/* DATE */}

        <div>
          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            text-gray-700
            dark:text-gray-300
          "
          >
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-white
            "
          />
        </div>

        {/* TIME */}

        <div>
          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            text-gray-700
            dark:text-gray-300
          "
          >
            Heure
          </label>

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-white
            "
          />
        </div>

        {/* LOCATION */}

        <div>
          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            text-gray-700
            dark:text-gray-300
          "
          >
            Lieu
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-white
            "
          />
        </div>

        {/* CATEGORY */}

        <div>
          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            text-gray-700
            dark:text-gray-300
          "
          >
            Catégorie
          </label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-white
            "
          />
        </div>

        {/* CAPACITY */}

        <div>
          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            text-gray-700
            dark:text-gray-300
          "
          >
            Capacité
          </label>

          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-white
            "
          />
        </div>

        {/* IMAGE */}

        <div>
          <label
            className="
            block
            mb-2
            text-sm
            font-medium
            text-gray-700
            dark:text-gray-300
          "
          >
            Image URL
          </label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-xl
              border
              dark:bg-gray-800
              dark:border-gray-700
              dark:text-white
            "
          />
        </div>
      </div>

      {/* BUTTON */}

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          py-3
          rounded-xl
          transition
          font-semibold
        "
      >
        {loading
          ? 'Création...'
          : 'Créer événement'}
      </button>
    </form>
  );
}