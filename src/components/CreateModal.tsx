'use client';

import { useState } from 'react';

interface CreateModalProps {
  type: 'habit' | 'task' | 'reward';
  isOpen: boolean;
  onClose: () => void;
  action: (formdata: FormData) => Promise<void>;
}

export function CreateModal({ type, isOpen, onClose, action }: CreateModalProps) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const titleText = type === 'habit' ? 'New Habit' : type === 'task' ? 'New Task' : 'New Reward';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
        <h3 className="text-xl font-bold text-slate-100 mb-4 capitalize">{titleText}</h3>

        <form
          action={async (formData) => {
            setLoading(true);
            await action(formData);
            setLoading(false);
            onClose();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder={type === 'reward' ? 'e.g. Watch a movie' : 'e.g. Read 20 pages'}
              className="w-fulll bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {type !== 'reward' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Difficulty</label>
              <select
                name="difficulty"
                defaultValue="EASY"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slatte-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="EASY">Easy (+10 XP, +5 Gold)</option>
                <option value="MEDIUM">Medium (+20 XP, +10 Gold)</option>
                <option value="HARD">Hard (+40 XP, +20 Gold)</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block text-xs fonr-semibold text-slate-400 mb-1">Cost (Gold)</label>
              <input
                type="number"
                name="cost"
                defaultValue={30}
                min={1}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:online-none focus:border-indigo-500"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
