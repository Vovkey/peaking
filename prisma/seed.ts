import { PrismaClient, Difficulty, Frequency } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString, connectionTimeoutMillis: 5000});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: 'hero@adventure.com',
      name: 'Adventurer',
      level: 1,
      currentXp: 30,
      maxXp: 100,
      hp: 85,
      maxHp: 100,
      gold: 45,
      habits: {
        create: [
          { title: 'Morning Workout (30m)', difficulty: Difficulty.MEDIUM, frequency: Frequency.DAILY, streak: 4 },
          { title: 'Drink 2L Water', difficulty: Difficulty.EASY, frequency: Frequency.DAILY, streak: 12 },
          { title: 'Read 15 pages', difficulty: Difficulty.EASY, frequency: Frequency.DAILY, streak: 0 },
        ],
      },
      tasks: {
        create: [
          { title: 'Fix API Rate limiting bug', difficulty: Difficulty.HARD, isCompleted: false },
          { title: 'Submit expense report', difficulty: Difficulty.EASY, isCompleted: true },
          { title: 'Prepare presentation slides', difficulty: Difficulty.MEDIUM, isCompleted: false },
        ],
      },
      rewards: {
        create: [
          { title: '1 hr gaming', cost: 50 },
          { title: 'Fancy coffee', cost: 30 },
          { title: 'Cheat meal', cost: 100 },
        ],
      },
    },
  });

  console.log(`Database seeded successfully! Demo user ID: ${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
