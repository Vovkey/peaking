import { completeAction, failHabit, purchaseReward } from "../src/lib/game-engine";

const initialUser = {
  level: 1,
  currentXp: 90,
  maxXp: 100,
  hp: 85,
  maxHp: 100,
  gold: 45,
};

console.log('--- Task & levelup ---');
const result1 = completeAction(initialUser, 'HARD');
console.log('XP +', result1.xpGained, '| Gold +', result1.goldGained);
console.log('levelup?', result1.leveledUp);
console.log('new stats', result1.updatedStats);

console.log('\n --- HP loss ---');
const failResult = failHabit(result1.updatedStats, 'MEDIUM');
console.log('stats after fail:', failResult);

console.log('\n --- Purchase ---');
const shopResuult = purchaseReward(failResult, 30);
console.log('stats after Purchase 30g', shopResuult)
