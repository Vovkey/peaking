'use server';

import { prisma } from '../lib/prisma';
import { completeAction, failHabit, purchaseReward, Difficulty } from '../lib/game-engine';
import { revalidatePath } from 'next/cache';


export async function getUser() {
  const user = await prisma.user.findFirst({
    include: {
      habits: true,
      tasks: true,
      rewards: true,
      purchases: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  return user;
}

export async function completeTaskAction(taskId: string, difficulty: Difficulty) {
  const user = await getUser();
  if (!user) return;

  const { updatedStats }  = completeAction(user, difficulty);
  const { habits, tasks, rewards, ...userData } = updatedStats as any;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        level: userData.level,
        currentXp: userData.currentXp,
        maxXp: userData.maxXp,
        hp: userData.hp,
        maxHp: userData.maxHp,
        gold: userData.gold,
      },
    }),
    prisma.task.update({
      where: { id: taskId },
      data: { isCompleted: true },
    }),
  ]);

  revalidatePath('/');
}

export async function triggerHabitAction(habitId: string, difficulty: Difficulty) {
  const user = await getUser();
  if (!user) return;

  const { updatedStats } = completeAction(user, difficulty);
  const { habits, tasks, rewards, ...userData } = updatedStats as any;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        level: userData.level,
        currentXp: userData.currentXp,
        maxXp: userData.maxXp,
        hp: userData.hp,
        maxHp: userData.maxHp,
        gold: userData.gold
      },
    }),
    prisma.habit.update({
      where: { id: habitId },
      data: { streak: { increment: 1 } },
    }),
  ]);

  revalidatePath('/');
}

export async function failHabitAction(habitId: string, difficulty: Difficulty) {
  const user = await getUser();
  if (!user) return;

  const userData = failHabit(user, difficulty)

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        level: userData.level,
        currentXp: userData.currentXp,
        maxXp: userData.maxXp,
        hp: userData.hp,
        maxHp: userData.maxHp,
        gold: userData.gold,
      },
    }),
    prisma.habit.update({
      where: { id: habitId },
      data: { streak: 0},
    }),
  ]);

  revalidatePath('/');
}

export async function buyRewardAction(rewardTitle: string, rewardCost: number) {
  const user = await getUser();
  if (!user || user.gold < rewardCost) return;

  const userData = purchaseReward(user, rewardCost);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        gold: userData.gold,
      },
    }),
    prisma.purchase.create({
      data: {
        userId: user.id,
        title: rewardTitle,
        cost: rewardCost,
      },
    }),
  ]);

  revalidatePath('/');
}

export async function createHabitAction(formData: FormData) {
  const user = await prisma.user.findFirst();
  if (!user) return;

  const title = formData.get('title') as string;
  const difficulty = (formData.get('difficulty') as Difficulty) || 'EASY';

  await prisma.habit.create({
    data: {
      userId: user.id,
      title,
      difficulty,
      streak: 0,
    },
  });

  revalidatePath('/');
}


export async function createTaskAction(formData: FormData) {
  const user = await prisma.user.findFirst();
  if (!user) return;

  const title = formData.get('title') as string;
  const difficulty = (formData.get('difficulty') as Difficulty) || 'EASY';

  await prisma.task.create({
    data: {
      userId: user.id,
      title,
      difficulty,
      isCompleted: false,
    },
  });

  revalidatePath('/');
}

export async function createRewardAction(formData: FormData) {
  const user = await prisma.user.findFirst();
  if (!user) return;

  const title = formData.get('title') as string;
  const cost = parseInt(formData.get('cost') as string, 10) || 10;

  await prisma.reward.create({
    data: {
      userId: user.id,
      title,
      cost,
    },
  });

  revalidatePath('/');
}

function extractUserScalarData(user: any) {
  const { habits, tasks, rewards, ...scalarData } = user;
  return scalarData;
}

export async function togglePurchaseRedeemedAction(purchaseId: string, currentStatus: boolean) {
  const user = await getUser();
  if (!user) return;

  await prisma.purchase.update({
    where: {
      id: purchaseId,
      userId: user.id
    },
    data: {
      isRedeemed: !currentStatus,
    },
  });

  revalidatePath('/');
}
