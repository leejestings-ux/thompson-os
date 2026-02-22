import { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Lock,
  Play,
  Award,
  Users,
  ChevronRight,
  BarChart3,
  Filter,
} from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import Button from '../../components/shared/Button';

// ── Mock Data ────────────────────────────────────────────────────────────────

const MODULES = [
  {
    id: 1,
    title: 'Introduction to Values-Based Planning',
    description: 'Core philosophy, donor psychology, and the Thompson methodology for values-first estate planning.',
    duration: '2.5 hrs',
    lessons: 8,
    completedLessons: 8,
    status: 'completed',
    category: 'Foundation',
  },
  {
    id: 2,
    title: 'Conducting the Values Discovery Interview',
    description: 'Techniques for deep-listening, open-ended questioning, and building trust during intake conversations.',
    duration: '3 hrs',
    lessons: 10,
    completedLessons: 10,
    status: 'completed',
    category: 'Foundation',
  },
  {
    id: 3,
    title: 'Drafting the Statement of Values & Objectives',
    description: 'Step-by-step process for translating interview notes into a compelling, personalized SVO document.',
    duration: '4 hrs',
    lessons: 12,
    completedLessons: 9,
    status: 'in-progress',
    category: 'Core Skills',
  },
  {
    id: 4,
    title: 'Estate Planning Instruments & Structures',
    description: 'Trusts, charitable vehicles, succession plans, and how to align legal structures with donor values.',
    duration: '5 hrs',
    lessons: 15,
    completedLessons: 3,
    status: 'in-progress',
    category: 'Core Skills',
  },
  {
    id: 5,
    title: 'NPO Relationship Management',
    description: 'Building and maintaining relationships with nonprofit organization partners and their gift officers.',
    duration: '2 hrs',
    lessons: 6,
    completedLessons: 0,
    status: 'locked',
    category: 'Advanced',
  },
  {
    id: 6,
    title: 'Thompson OS Platform Training',
    description: 'Complete guide to using the Thompson OS platform — pipeline, SVO editor, donor portal, and reporting.',
    duration: '1.5 hrs',
    lessons: 5,
    completedLessons: 0,
    status: 'locked',
    category: 'Platform',
  },
];

const CERTIFICATIONS = [
  { title: 'Values Discovery Certified', earnedDate: 'Jan 15, 2025', badge: '🎖️' },
  { title: 'Foundation Track Complete', earnedDate: 'Jan 28, 2025', badge: '⭐' },
];

const ASSOCIATE_PROGRESS = [
  { id: 1, name: 'Catherine Mercer', role: 'Senior Associate', modulesComplete: 6, totalModules: 6, certified: true, lastActive: 'Today' },
  { id: 2, name: 'David Harrington', role: 'Associate', modulesComplete: 4, totalModules: 6, certified: false, lastActive: 'Yesterday' },
  { id: 3, name: 'Rebecca Townsend', role: 'Associate', modulesComplete: 3, totalModules: 6, certified: false, lastActive: '2 days ago' },
  { id: 4, name: 'James Whitaker', role: 'Junior Associate', modulesComplete: 1, totalModules: 6, certified: false, lastActive: 'Today' },
];

const STATUS_CONFIG = {
  completed: { label: 'Completed', color: 'bg-emerald-50 text-emerald-700 border border-emerald-200', icon: CheckCircle2 },
  'in-progress': { label: 'In Progress', color: 'bg-blue-50 text-blue-700 border border-blue-200', icon: Play },
  locked: { label: 'Locked', color: 'bg-slate-50 text-slate-500 border border-slate-200', icon: Lock },
};

const CATEGORY_COLORS = {
  Foundation: 'bg-navy/8 text-navy',
  'Core Skills': 'bg-teal/10 text-teal-dark',
  Advanced: 'bg-violet-50 text-violet-700',
  Platform: 'bg-amber-50 text-amber-700',
};

export default function TrainingCenter() {
  const [activeTab, setActiveTab] = useState('my-training');

  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons, 0);
  const completedLessons = MODULES.reduce((sum, m) => sum + m.completedLessons, 0);
  const overallPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 animate-fadeIn">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[28px] font-serif text-navy tracking-tight">
              Training &amp; Certification
            </h1>
            <p className="text-sm text-muted mt-1">
              Complete your training modules to earn certification and advance your practice.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mb-6 border-b border-border">
            {[
              { key: 'my-training', label: 'My Training', icon: BookOpen },
              { key: 'manage', label: 'Manage Training', icon: Users },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 -mb-px ${
                  activeTab === key
                    ? 'border-teal text-teal'
                    : 'border-transparent text-muted hover:text-charcoal hover:border-border'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'my-training' ? (
            <>
              {/* Overall Progress */}
              <div className="bg-white rounded-xl border border-border p-6 mb-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-base font-serif font-semibold text-navy">Your Progress</h2>
                    <p className="text-sm text-muted mt-0.5">{completedLessons} of {totalLessons} lessons complete</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-serif font-bold text-navy">{overallPercent}%</p>
                    <p className="text-xs text-muted">overall</p>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal to-emerald rounded-full transition-all duration-700"
                    style={{ width: `${overallPercent}%` }}
                  />
                </div>
              </div>

              {/* Certifications */}
              {CERTIFICATIONS.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-3">Earned Certifications</h2>
                  <div className="flex gap-3 flex-wrap">
                    {CERTIFICATIONS.map((cert, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white rounded-xl border border-emerald-200 px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]"
                      >
                        <span className="text-xl">{cert.badge}</span>
                        <div>
                          <p className="text-sm font-serif font-semibold text-navy">{cert.title}</p>
                          <p className="text-[11px] text-muted">Earned {cert.earnedDate}</p>
                        </div>
                        <Award size={16} className="text-emerald-500 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module Cards */}
              <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-3">Training Modules</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {MODULES.map((mod) => {
                  const statusCfg = STATUS_CONFIG[mod.status];
                  const StatusIcon = statusCfg.icon;
                  const progress = mod.lessons > 0 ? Math.round((mod.completedLessons / mod.lessons) * 100) : 0;

                  return (
                    <div
                      key={mod.id}
                      className={`bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 ${
                        mod.status === 'locked' ? 'opacity-60' : 'hover:shadow-md hover:scale-[1.005]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${CATEGORY_COLORS[mod.category] || 'bg-slate-50 text-slate-500'}`}>
                            {mod.category}
                          </span>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${statusCfg.color}`}>
                            <span className="inline-flex items-center gap-1">
                              <StatusIcon size={10} />
                              {statusCfg.label}
                            </span>
                          </span>
                        </div>
                      </div>
                      <h3 className="text-base font-serif font-semibold text-navy mb-1.5">{mod.title}</h3>
                      <p className="text-sm text-charcoal/70 leading-relaxed mb-4">{mod.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted mb-3">
                        <span className="flex items-center gap-1"><Clock size={12} /> {mod.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen size={12} /> {mod.lessons} lessons</span>
                      </div>
                      {mod.status !== 'locked' && (
                        <>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                mod.status === 'completed' ? 'bg-emerald' : 'bg-teal'
                              }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-muted">{mod.completedLessons}/{mod.lessons} lessons</span>
                            {mod.status === 'in-progress' && (
                              <button className="flex items-center gap-1 text-xs font-semibold text-teal hover:text-teal-dark transition-colors duration-200">
                                Continue <ChevronRight size={14} />
                              </button>
                            )}
                          </div>
                        </>
                      )}
                      {mod.status === 'locked' && (
                        <p className="text-xs text-muted flex items-center gap-1">
                          <Lock size={12} /> Complete prerequisite modules to unlock
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Manage Training Tab */
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                  <p className="text-2xl font-serif font-bold text-navy">4</p>
                  <p className="text-xs text-muted font-medium">Associates Enrolled</p>
                </div>
                <div className="bg-white rounded-xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                  <p className="text-2xl font-serif font-bold text-navy">1</p>
                  <p className="text-xs text-muted font-medium">Fully Certified</p>
                </div>
                <div className="bg-white rounded-xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                  <p className="text-2xl font-serif font-bold text-emerald">58%</p>
                  <p className="text-xs text-muted font-medium">Avg. Completion</p>
                </div>
                <div className="bg-white rounded-xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                  <p className="text-2xl font-serif font-bold text-navy">6</p>
                  <p className="text-xs text-muted font-medium">Active Modules</p>
                </div>
              </div>

              {/* Actions Bar */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider">Associate Progress</h2>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" className="text-xs flex items-center gap-1.5">
                    <Filter size={13} /> Filter
                  </Button>
                  <Button variant="secondary" className="text-xs flex items-center gap-1.5">
                    <BarChart3 size={13} /> Export Report
                  </Button>
                </div>
              </div>

              {/* Associate Table */}
              <div className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EEF2F7]">
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Associate</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Progress</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Certified</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Last Active</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ASSOCIATE_PROGRESS.map((a, i) => {
                      const pct = Math.round((a.modulesComplete / a.totalModules) * 100);
                      return (
                        <tr key={a.id} className={`border-b border-border/50 last:border-0 transition-colors duration-150 hover:bg-[#EEF2F7] ${i % 2 === 1 ? 'bg-warm-white' : ''}`}>
                          <td className="px-4 py-3.5">
                            <p className="font-serif font-medium text-charcoal">{a.name}</p>
                            <p className="text-[11px] text-muted">{a.role}</p>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[120px]">
                                <div
                                  className={`h-full rounded-full ${pct === 100 ? 'bg-emerald' : 'bg-teal'}`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-charcoal">{a.modulesComplete}/{a.totalModules}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            {a.certified ? (
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                <CheckCircle2 size={14} /> Certified
                              </span>
                            ) : (
                              <span className="text-xs text-muted">In progress</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-xs text-muted">{a.lastActive}</td>
                          <td className="px-4 py-3.5">
                            <button className="text-xs font-semibold text-teal hover:text-teal-dark transition-colors duration-200 flex items-center gap-1">
                              View Details <ChevronRight size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
