'use client';

interface Purchase {
  id: string;
  title: string;
  cost: number;
  isRedeemed: boolean;
  createdAt: Date;
}

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: Purchase[];
  toggleRedeemedAction: (id: string, isRedeemed: boolean) => Promise<void>;
}

export function InventoryModal({ isOpen, onClose, purchases, toggleRedeemedAction, }: InventoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            Inventory & History
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 dark:hover:text-shadow-amber-200 text-sm font-bold"
          >
            ✕
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
          {purchases.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">
              No rewards purchased yet. Spend some gold in the shop!
            </p>
          ) : (
            purchases.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border flex items-center justify-between transition ${item.isRedeemed
                    ? 'bg-slate-100 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-60'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <form action={toggleRedeemedAction.bind(null, item.id, item.isRedeemed)}>
                    <input
                      type="checkbox"
                      checked={item.isRedeemed}
                      onChange={(e) => e.target.form?.requestSubmit()}
                      className="w-4 h-4 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-amber-500 focus:ring-amber-500 cursor-pointer accent-amber-500"
                    />
                  </form>

                  <div>
                    <div
                      className={`font-medium text-sm ${item.isRedeemed
                        ? 'linethrough text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200'
                        }`}
                    >
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString()} at{' '}
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>

                <span className="tet-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                  {item.cost}g
                </span>
              </div>
            ))
          )}
          </div>

        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-cs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
