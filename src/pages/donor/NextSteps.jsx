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
  Intake: 'bg-blue-50 text-blue-700 border border-blue-200',
  Documents: 'bg-violet-50 text-violet-700 border border-violet-200',
  Planning: 'bg-amber-50 text-amber-700 border border-amber-200',
  Meeting: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Review: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  Legal: 'bg-slate-50 text-slate-600 border border-slate-200',
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
        <h1 className="text-[22px] font-serif text-navy tracking-tight">
          Your Action Items
        </h1>
        <p className="text-base text-muted mt-1">
          Track your progress through the estate planning process.
        </p>
      </div>

      {/* Progress summary */}
      <div className="bg-white rounded-xl border border-border p-5 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-2">
          <p className="text-base font-medium text-charcoal">
            {completedCount} of {totalCount} items complete
          </p>
          <p className="text-base font-serif font-semibold text-navy">
            {Math.round((completedCount / totalCount) * 100)}%
          </p>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-xl border border-border p-5 flex items-start gap-4 transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] ${
              task.done ? 'opacity-50' : 'hover:shadow-md'
            }`}
          >
            <button
              onClick={() => toggleTask(task.id)}
              className="shrink-0 mt-0.5 transition-transform duration-200 hover:scale-110"
            >
              {task.done ? (
                <CheckCircle2 size={24} className="text-emerald-500" />
              ) : (
                <Circle size={24} className="text-muted/40 hover:text-teal transition-colors duration-200" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p
                className={`text-base font-medium ${
                  task.done
                    ? 'line-through text-muted'
                    : 'text-charcoal'
                }`}
              >
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${
                    CATEGORY_COLORS[task.category] || 'bg-slate-50 text-slate-500 border border-slate-200'
                  }`}
                >
                  {task.category}
                </span>
                <span className="text-sm text-muted">
                  {task.owner === 'you' ? 'Your task' : 'Your associate will handle'}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted shrink-0 mt-0.5">
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
