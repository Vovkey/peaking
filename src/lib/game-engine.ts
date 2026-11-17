export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface UserStats {
  level: number;
  currentXp: number;
  maxXp: number;
  hp: number;
  maxHp: number;
  gold: number;
}

export interface RewardResult {
  updatedStats: UserStats;
  xpGained: number;
  goldGained: number;
  leveledUp: boolean;
}

const REWARDS: Record<Difficulty, { xp: number; gold: number; hpPenalty: number }> = {
  EASY: { xp: 10, gold: 5, hpPenalty: 5 },
  MEDIUM: { xp: 20, gold: 10, hpPenalty: 10 },
  HARD: { xp: 40, gold: 20, hpPenalty: 20 },
};

export function calculateMaxXp(level: number): number {
  return 100 + (level - 1) * 10;
}

export function completeAction(user: UserStats, difficulty: Difficulty): RewardResult {
  const { xp, gold } = REWARDS[difficulty];
  let currentXp = user.currentXp + xp;
  let level = user.level;
  let maxXp = user.maxXp;
  let leveledUp = false;

  while (currentXp >= maxXp) {
    currentXp -= maxXp;
    level += 1;
    maxXp = calculateMaxXp(level);
    leveledUp = true;
  }

  return {
    updatedStats: {
      ...user,
      level,
      currentXp,
      maxXp,
      gold: user.gold + gold,
      hp: leveledUp ? user.maxHp : user.hp,
    },
    xpGained: xp,
    goldGained: gold,
    leveledUp,
  };
}

export function failHabit(user: UserStats, difficulty: Difficulty): UserStats {
  const penalty = REWARDS[difficulty].hpPenalty;
  const newHp = Math.max(0, user.hp - penalty);

  return {
    ...user,
    hp: newHp,
  };
}

export function purchaseReward(user: UserStats, rewardCost: number): UserStats {
  if (user.gold < rewardCost) {
    throw new Error('Insufficient gold');
  }

  return {
    ...user,
    gold: user.gold - rewardCost,
  };
}
