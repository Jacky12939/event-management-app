import { useState } from "react";
import { patchEvent, updateEvent } from "../../services/event.service";
import type { EventType } from "./types/event";

interface Props {
  event: EventType | null;
  onClose: () => void;
  refresh: () => void;
}

export default function EventModal({ event, onClose, refresh }: Props) {
  const [form, setForm] = useState<EventType | null>(event);
  const [loading, setLoading] = useState(false);

  if (!event || !form) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await updateEvent(event.id, form);
      refresh();
      onClose();
    } catch (error) {
      console.error("Erreur lors du PUT update:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePatch = async () => {
    try {
      setLoading(true);
      // Passe l'objet { title: form.title } (valide si patchEvent prend un objet ou un Partial)
      await patchEvent(event.id, { title: form.title }); 
      refresh();
      onClose();
    } catch (error) {
      console.error("Erreur lors du PATCH:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-[500px] space-y-4 border border-gray-100 dark:border-gray-800 shadow-2xl">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Event</h2>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="input" />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="input" />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button onClick={handleUpdate} disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
            {loading ? "Updating..." : "PUT Update"}
          </button>

          <button onClick={handlePatch} disabled={loading} className="btn-secondary flex-1 disabled:opacity-50">
            {loading ? "Patching..." : "PATCH Title"}
          </button>
        </div>

        <button onClick={onClose} disabled={loading} className="w-full text-center text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 font-medium pt-1 transition">
          Close
        </button>
      </div>
    </div>
  );
}