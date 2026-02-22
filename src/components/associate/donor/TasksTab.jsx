import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { getDonorTasks } from '../../../lib/donorMockData';
import DataTable from '../../shared/DataTable';
import Button from '../../shared/Button';

const TASK_CATEGORIES = ['Planning', 'Legal', 'Administrative', 'Follow-up'];
const STATUS_OPTIONS = ['pending', 'complete'];

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  complete: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

const EMPTY_FORM = {
  title: '',
  category: 'Planning',
  owner: '',
  dueDate: '',
};

export default function TasksTab({ donor }) {
  const [tasks, setTasks] = useState(() => getDonorTasks(donor.id));
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddTask, setShowAddTask] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  function handleStatusChange(taskId, newStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  function handleSaveTask() {
    if (!form.title.trim()) return;
    const newTask = {
      id: `t-${Date.now()}`,
      title: form.title.trim(),
      category: form.category,
      owner: form.owner.trim(),
      dueDate: form.dueDate,
      status: 'pending',
    };
    setTasks((prev) => [...prev, newTask]);
    setShowAddTask(false);
    setForm(EMPTY_FORM);
  }

  const filtered =
    filterStatus === 'all'
      ? tasks
      : tasks.filter((t) => t.status === filterStatus);

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    complete: tasks.filter((t) => t.status === 'complete').length,
  };

  const columns = [
    { key: 'title', label: 'Title', render: (row) => <span className="font-medium">{row.title}</span> },
    {
      key: 'category',
      label: 'Category',
      render: (row) => (
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-navy/5 text-navy border border-navy/10">
          {row.category}
        </span>
      ),
    },
    { key: 'owner', label: 'Owner' },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (row) =>
        row.dueDate
          ? new Date(row.dueDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          : '\u2014',
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border appearance-none cursor-pointer focus:outline-none transition-colors duration-150 ${STATUS_STYLES[row.status]}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Filter tabs + add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {['all', 'pending', 'complete'].map((key) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                filterStatus === key
                  ? 'bg-navy text-white'
                  : 'text-muted hover:text-charcoal hover:bg-slate-50'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)} ({counts[key]})
            </button>
          ))}
        </div>
        <Button
          onClick={() => setShowAddTask(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Task
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No tasks"
      />

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowAddTask(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-lg font-semibold text-navy">Add Task</h2>
              <button
                onClick={() => setShowAddTask(false)}
                className="text-muted hover:text-charcoal transition-colors duration-150"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wide mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="Task description"
                  className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal uppercase tracking-wide mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, category: e.target.value }))
                    }
                    className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200"
                  >
                    {TASK_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal uppercase tracking-wide mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, dueDate: e.target.value }))
                    }
                    className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wide mb-1">
                  Owner
                </label>
                <input
                  type="text"
                  value={form.owner}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, owner: e.target.value }))
                  }
                  placeholder="Assigned to"
                  className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
              <Button
                variant="secondary"
                onClick={() => setShowAddTask(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTask}
                disabled={!form.title.trim()}
              >
                Add Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
