import {
  getUser,
  completeTaskAction,
  triggerHabitAction,
  failHabitAction,
  buyRewardAction,
  createHabitAction,
  createTaskAction,
  createRewardAction
} from './actions';
import { SectionHeader } from '../components/SectionHeader';
import { CharacterHeader } from '../components/CharacterHeader';

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) {
    return <div className="p-8 text-center text-slate-400">Loading user data...</div>;
  }

  return (
    <main className="mx-w-4xl mx-auto p-6">
      <CharacterHeader user={user} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
          <SectionHeader
            title="Habits"
            badge="Daily"
            type="habit"
            action={createHabitAction}
          />
          <div className="space-y-2 text-sm text-slate-400">
            {user.habits.map((habit) => (
              <div key={habit.id} className="p-3 bg-slate-800/80 rounded flex justify-between items-center">
               <div className="flex justify-between items-center">
                <span className="font-medium text-slate-200">{habit.title}</span>
                <span className="text-xs font-semibold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                  Streak : {habit.streak}
                </span>
              </div>
              <div className="flex gap-2 pt-1">
                <form action={triggerHabitAction.bind(null, habit.id, habit.difficulty)} className="flex-1">
                    <button type="submit" className="w-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 rounded transition">
                      + Done
                    </button>
                </form>
                <form action={failHabitAction.bind(null, habit.id, habit.difficulty)} className="flex-1">
                    <button type="submit" className="w-full text-xs font-semibold bg-rose-600/80 hover:bg-rose-500 text-white py-1.5 rounded transition">
                      - Missed
                    </button>
                </form>
              </div>
            </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 p-4 rounded-lg">
          <SectionHeader
            title="To-Dos"
            badge="One-off"
            type="task"
            action={createTaskAction}
          />
          <div className="space-y-3">
            {user.tasks.map((task) => (
              <div key={task.id} className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50 flex justify-between items-center">
                <div>
                  <div className={`font-medium ${task.isCompleted ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.title}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">
                    {task.difficulty}
                  </span>
                </div>
                {!task.isCompleted && (
                  <form action={completeTaskAction.bind(null, task.id, task.difficulty)}>
                    <button type="submit" className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition">
                      Complete
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg">
          <SectionHeader
            title="Shop"
            badge="Rewards"
            type="reward"
            action={createRewardAction}
          />
          <div className="space-y-3">
            {user.rewards.map((reward) => (
              <div key={reward.id} className="p-3 bg-slate-800/80 rounded-lg border border-slate-700/50 flex justify-between items-center">
                <div>
                  <div className="font-medium text-slate-200">{reward.title}</div>
                  <div className="text-xs font-bold text-amber-400">{reward.cost} Gold</div>
                </div>
                <form action={buyRewardAction.bind(null, reward.cost)}>
                  <button
                    type="submit"
                    disabled={user.gold < reward.cost}
                    className="text-xs font-semibold bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-3 py-1.5 rounded transition">
                    Buy
                    </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
