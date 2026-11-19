'use client';

import { UserStats } from '@/lib/game-engine';

interface Props {
  user: UserStats;
}

export function CharacterHeader({ user }: Props) {
  const hpPercent = Math.min(100, Math.max(0, (user.hp / user.maxHp) * 100));
  const xpPercent = Math.min(100, Math.max(0, (user.currentXp / user.maxXp) * 100));

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border border-slate-800 mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Adventurer</h1>
          <span className="text-sm font-semibold bg-indigo-600 px-3 py-1 rounded-full text-indigo-100">
            Level {user.Level}
          </span>
        </div>
        <div className="text-amber-400 font-bold text-lg flex items-center gap-1">
          <span>{user.gold} Gold</span>
        </div>
      </div>

      <div className="space-y-3">
              <div>
              <div className="flex justify-between text-xs mb-1 font-semibold text-rose-300">
                <span>HP</span>
                <span>{user.hp} / {user.maxHp}</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full transition-all duration-300"
                  style={{ width: `${hpPercent}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1 font-semibold text-emerald-300">
                <span>XP</span>
                <span>{user.currentXp} / {user.maxXp}</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
    </div>
  );
}
