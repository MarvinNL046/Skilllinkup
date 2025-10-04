"use client";

import { useState } from "react";

interface CategoryQuickAddProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (category: { id: number; name: string; slug: string }) => void;
}

export default function CategoryQuickAdd({ isOpen, onClose, onCategoryAdded }: CategoryQuickAddProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#ef2b70");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          color,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Categorie aanmaken mislukt');
      }

      // Reset form
      setName("");
      setDescription("");
      setColor("#ef2b70");

      // Notify parent
      onCategoryAdded(data.category);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-bold text-text-primary">
            Nieuwe Categorie
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="categoryName" className="block text-sm font-heading font-semibold text-text-primary mb-2">
              Naam *
            </label>
            <input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Bijv: Technology"
              className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="categoryDescription" className="block text-sm font-heading font-semibold text-text-primary mb-2">
              Beschrijving
            </label>
            <textarea
              id="categoryDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Optionele beschrijving"
              className="w-full px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>

          {/* Color */}
          <div>
            <label htmlFor="categoryColor" className="block text-sm font-heading font-semibold text-text-primary mb-2">
              Kleur
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="categoryColor"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-12 h-10 rounded border border-background-gray cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#ef2b70"
                className="flex-1 px-4 py-2 rounded-lg border border-background-gray focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-background-gray text-text-secondary hover:bg-background-gray transition-colors font-heading font-semibold"
            >
              Annuleren
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors font-heading font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Opslaan..." : "Toevoegen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
