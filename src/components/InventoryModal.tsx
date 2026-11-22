'use client';

interface Purchase {
  id: string;
  title: string;
  cost: number;
  createdAt: Date;
}

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: Purchase[];
}

export function InventoryModal({ isOpen, onClose, purchases }: InventoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Inventory & History
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-sm font-bold"
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
                className="p-3 bg-slate-800/60 rounded-lg border border-slate-700/50 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-slate-200 text-sm">{item.title}</div>
                  <div className="text-[10px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()} at{' '}
                    {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounde border border-amber-400/20">
                  {item.cost} Gold
                </span>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-cs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
