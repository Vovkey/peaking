'use client';

import { useState } from 'react';

interface ResetCharacterModalProps {
  resetAction: () => Promise<void>;
}

export function ResetCharacterModal({ resetAction }: ResetCharacterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleReset = async () => {
    setIsPending(true);
    await resetAction();
    setIsPending(false)
    setIsOpen(false);
  };

  return (
    <>
      <button
              onClick={() => setIsOpen(true)}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-2.5 py-1 rounded-lg transition"
            >
              Reset Hero
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 w-full max-w-sm shadow-2xl space-y-4">
             <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              Reset Character?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
                          This will reset your Level to 1, Gold to 0, XP to 0, and clear all habit streaks. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition"
            >
             Cancel
            </button>
            <button
              onClick={handleReset}
              disabled={isPending}
              className="px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition disabled:opacity-50"
            >
            {isPending ? 'Resetting...' : 'Yes, Reset'}
            </button>
           </div>
          </div>
        </div>
      )}
    </>
  )

}
