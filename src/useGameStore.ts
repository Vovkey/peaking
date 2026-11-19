import { create } from 'zustand';
import { UserStats } from '@/lib/game-engine';

interface GameState {
  user: UserStats | null;
  setUser: (user: UserStats) => void;
  updatedUserStats: (stats: UserStats) => void;
}

export const useGameStore = create<GameState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updatedUserStats: (stats) => set({ user: stats }),
}));
