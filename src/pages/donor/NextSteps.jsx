import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import DonorShell from '../../components/donor/DonorShell';

const INITIAL_TASKS = [
  { id: 1, title: 'Complete the Values Questionnaire', category: 'Intake', owner: 'you', dueDate: '2025-02-14', done: true },
  { id: 2, title: 'Review Personal Concerns worksheet', category: 'Intake', owner: 'you', dueDate: '2025-02-16', done: true },
  { id: 3, title: 'Upload financial documents', category: 'Documents', owner: 'you', dueDate: '2025-02-18', done: true },
  { id: 4, title: 'Prepare SVO draft', category: 'Planning', owner: 'associate', dueDate: '2025-02-20', done: false },
  { id: 5, title: 'Schedule planning meeting', category: 'Meeting', owner: 'associate', dueDate: '2025-02-22', done: false },
  { id: 6, title: 'Review SVO document', category: 'Review', owner: 'you', dueDate: '2025-02-28', done: false },
  { id: 7, title: 'Sign estate planning engagement letter', category: 'Legal', owner: 'you', dueDate: '2025-03-05', done: false },
];

const CATEGORY_COLORS = {
  Intake: 'bg-blue-50 text-blue-700',
  Documents: 'bg-violet-50 text-violet-700',
  Planning: 'bg-amber-50 text-amber-700',
  Meeting: 'bg-emerald-50 text-emerald-700',
  Review: 'bg-indigo-50 text-indigo-700',
  Legal: 'bg-slate-100 text-slate-600',
};

export default function NextSteps() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const completedCount = tasks.filter((t) => t.done).length;
  const totalCount = tasks.length;

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <DonorShell>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-navy tracking-tight">
          Your Action Items
        </h1>
        <p className="text-sm text-muted mt-1">
          Track your progress through the estate planning process.
        </p>
      </div>

      {/* Progress summary */}
      <div className="bg-white rounded-xl border border-border p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-charcoal">
            {completedCount} of {totalCount} items complete
          </p>
          <p className="text-sm font-semibold text-navy">
            {Math.round((completedCount / totalCount) * 100)}%
          </p>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-navy rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-xl border border-border p-4 flex items-start gap-4 transition-opacity ${
              task.done ? 'opacity-60' : ''
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="shrink-0 mt-0.5"
            >
              {task.done ? (
                <CheckCircle2 size={22} className="text-emerald-500" />
              ) : (
                <Circle size={22} className="text-muted/40 hover:text-navy transition-colors" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  task.done
                    ? 'line-through text-muted'
                    : 'text-charcoal'
                }`}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    CATEGORY_COLORS[task.category] || 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {task.category}
                </span>
                <span className="text-[11px] text-muted">
                  {task.owner === 'you' ? 'Your task' : 'Your associate will handle'}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted shrink-0 mt-0.5">
              {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>
    </DonorShell>
  );
}
