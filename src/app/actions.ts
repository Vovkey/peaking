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
    },
  });
  return user;
}

export async function completeTaskAction(taskId: string, difficulty: Difficulty) {
  const user = await getUser();
  if (!user) throw new Error('User not found');

  const { updatedStats } = completeAction(user, difficulty);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: updatedStats,
    }),
    prisma.task.update({
      where: { id: taskId },
      data: { isCompleted: true },
    }),
  ]);

  revalidatePath('/');
  return { success: true };
}

export async function triggerHabitAction(habitId: string, difficulty: Difficulty) {
  const user = await getUser();
  if (!user) throw new Error('User not found');

  const { updatedStats } = completeAction(user, difficulty);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: updatedStats,
    }),
    prisma.habit.update({
      where: { id: habitId },
      data: { streak: { increment: 1 } },
    }),
  ]);

  revalidatePath('/');
  return { sucess: true };
}

export async function failHabitAction(habitId: string, difficulty: Difficulty) {
  const user = await getUser();
  if (!user) throw new Error('User not found');

  const updatedStats = failHabit(user, difficulty);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: updatedStats,
    }),
  ]);

  revalidatePath('/');
  return { success: true };
}

export async function buyRewardAction(rewardCost: number) {
  const user = await getUser();
  if (!user) throw new Error('User not found');

  const updatedStats = purchaseReward(user, rewardCost);

  await prisma.user.update({
    where: { id: user.id },
    data: updatedStats,
  });

  revalidatePath('/');
  return { success: true };
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
