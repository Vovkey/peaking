'use client';

import { useState } from 'react';
import { CreateModal } from './CreateModal';
import { InventoryModal } from './InventoryModal';

interface ShopSectionProps {
  user: any;
  createRewardAction: (formData: FormData) => Promise<void>;
  buyRewardAction: (title: string, cost: number) => Promise<void>;
}

export function ShopSection({ user, createRewardAction, buyRewardAction }: ShopSectionProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  return (
    <section className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-100">Shop</h2>
            <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">Rewards</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInventoryOpen(true)}
              className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-400 px-2.5 py-1 rounded-lg border border-slate-700 transition flex items-center gap-1"
            >
              History ({user.purchases?.length || 0})
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-indigo-400 px-2.5 py-1 rounded-lg border border-slate-700 transition"
            >
              + Add
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {user.rewards.map((reward: any) => (
            <div
              key={reward.id}
              className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50 flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-slate-200">{reward.title}</div>
                <div className="text-xs font-bold text-amber-400">{reward.cost} Gold</div>
              </div>
              <form action={buyRewardAction.bind(null, reward.title, reward.cost)}>
                <button
                  type="submit"
                  disabled={user.gold < reward.cost}
                  className="text-xs font-font-semibold bg-amber-600 hover:bg-amber-500 disabed:bg-slate-700 disabled:text-slate-500 text-white px-3 py-1.5 rounded transition"
                >
                  Buy
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>

      <CreateModal
        type="reward"
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        action={createRewardAction}
      />

      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        purchases={user.purchases || []}
      />
    </section>
  );
}
