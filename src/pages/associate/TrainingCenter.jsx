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
  FileText,
  Upload,
  Trash2,
  File,
  Star,
  Download,
  Share2,
  Plus,
  Pencil,
  CircleDot,
  ToggleLeft,
  MessageSquare,
  Send,
} from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import StatCard from '../../components/shared/StatCard';
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
  { title: 'Values Discovery Certified', earnedDate: 'Jan 15, 2025', completionDate: 'January 15, 2025', badge: '🎖️' },
  { title: 'Foundation Track Complete', earnedDate: 'Jan 28, 2025', completionDate: 'January 28, 2025', badge: '⭐' },
];

const ASSOCIATE_PROGRESS = [
  { id: 1, name: 'Catherine Mercer', role: 'Senior Associate', modulesComplete: 6, totalModules: 6, certified: true, lastActive: 'Today' },
  { id: 2, name: 'David Harrington', role: 'Associate', modulesComplete: 4, totalModules: 6, certified: false, lastActive: 'Yesterday' },
  { id: 3, name: 'Rebecca Townsend', role: 'Associate', modulesComplete: 3, totalModules: 6, certified: false, lastActive: '2 days ago' },
  { id: 4, name: 'James Whitaker', role: 'Junior Associate', modulesComplete: 1, totalModules: 6, certified: false, lastActive: 'Today' },
];

const REPORT_ASSOCIATES = [
  { id: 1, name: 'Catherine Mercer', modulesComplete: 6, modulesRemaining: 0, lastActivity: 'Today', status: 'certified', pct: 100 },
  { id: 2, name: 'David Harrington', modulesComplete: 4, modulesRemaining: 2, lastActivity: 'Yesterday', status: 'in-progress', pct: 67 },
  { id: 3, name: 'Rebecca Townsend', modulesComplete: 3, modulesRemaining: 3, lastActivity: '2 days ago', status: 'in-progress', pct: 50 },
  { id: 4, name: 'James Whitaker', modulesComplete: 1, modulesRemaining: 5, lastActivity: 'Today', status: 'in-progress', pct: 17 },
  { id: 5, name: 'Sarah Mitchell', modulesComplete: 5, modulesRemaining: 1, lastActivity: '3 days ago', status: 'in-progress', pct: 83 },
  { id: 6, name: 'Andrew Collins', modulesComplete: 0, modulesRemaining: 6, lastActivity: 'Never', status: 'not-started', pct: 0 },
];

const RECENT_UPLOADS = [
  { name: 'SVO_Writing_Guide_v3.pdf', size: '2.4 MB', date: 'Feb 8, 2025' },
  { name: 'Values_Interview_Recording.mp4', size: '148 MB', date: 'Feb 5, 2025' },
  { name: 'Estate_Planning_Basics.pptx', size: '8.1 MB', date: 'Feb 1, 2025' },
];

const QUESTIONS = [
  { id: 1, text: 'A donor mentions their adult child has struggled with addiction. How should this affect the SVO language around inheritance distribution?', type: 'scenario', module: 'Module 3: SVO Drafting' },
  { id: 2, text: 'What is the primary purpose of a Statement of Values and Objectives?', type: 'multiple-choice', module: 'Module 1: Introduction' },
  { id: 3, text: "A donor's VBQ responses should be used verbatim in the final SVO document.", type: 'true-false', module: 'Module 3: SVO Drafting' },
  { id: 4, text: "During a donor meeting, the spouse disagrees with the primary donor's charitable giving intentions. What is the appropriate next step?", type: 'scenario', module: 'Module 2: Values Interview' },
  { id: 5, text: 'Which of the following is NOT typically included in a Thompson & Associates SVO?', type: 'multiple-choice', module: 'Module 1: Introduction' },
  { id: 6, text: 'SVOs are legally binding documents.', type: 'true-false', module: 'Module 4: Instruments' },
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

const REPORT_STATUS_CONFIG = {
  certified: { label: 'Certified', color: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  'in-progress': { label: 'In Progress', color: 'bg-teal-50 text-teal-700 border border-teal-200' },
  'not-started': { label: 'Not Started', color: 'bg-amber-50 text-amber-700 border border-amber-200' },
};

const QUESTION_TYPE_CONFIG = {
  scenario: { label: 'Scenario', color: 'bg-amber-50 text-amber-700 border border-amber-200' },
  'multiple-choice': { label: 'Multiple Choice', color: 'bg-blue-50 text-blue-700 border border-blue-200' },
  'true-false': { label: 'True/False', color: 'bg-violet-50 text-violet-700 border border-violet-200' },
};

export default function TrainingCenter() {
  const [activeTab, setActiveTab] = useState('my-training');
  const [uploadHover, setUploadHover] = useState(false);
  const [questionFilter, setQuestionFilter] = useState('all');

  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons, 0);
  const completedLessons = MODULES.reduce((sum, m) => sum + m.completedLessons, 0);
  const overallPercent = Math.round((completedLessons / totalLessons) * 100);

  const filteredQuestions = questionFilter === 'all'
    ? QUESTIONS
    : QUESTIONS.filter((q) => q.type === questionFilter);

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
              { key: 'reports', label: 'Reports', icon: BarChart3 },
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

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* MY TRAINING TAB                                                    */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'my-training' && (
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

              {/* ── Enhanced Certifications ── */}
              {CERTIFICATIONS.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-3">Your Certifications</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {CERTIFICATIONS.map((cert, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl border border-border border-l-4 border-l-navy p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-[10px] text-muted uppercase tracking-widest font-semibold mb-1">Thompson &amp; Associates</p>
                            <p className="text-lg font-serif font-bold text-navy tracking-tight">{cert.title}</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                            <Star size={20} className="text-amber-500 fill-amber-400" />
                          </div>
                        </div>
                        <div className="border-t border-border/60 pt-3 mb-4">
                          <p className="text-sm text-charcoal">Catherine Mercer</p>
                          <p className="text-xs text-muted mt-0.5">Completed {cert.completionDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button className="text-xs flex items-center gap-1.5">
                            <Download size={13} /> Download Certificate
                          </Button>
                          <Button variant="secondary" className="text-xs flex items-center gap-1.5">
                            <Share2 size={13} /> Share
                          </Button>
                        </div>
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
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* MANAGE TRAINING TAB                                                */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'manage' && (
            <>
              {/* Summary Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] text-center flex flex-col items-center">
                  <p className="text-2xl font-serif font-bold text-navy">4</p>
                  <p className="text-xs text-muted font-medium">Associates Enrolled</p>
                </div>
                <div className="bg-white rounded-xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] text-center flex flex-col items-center">
                  <p className="text-2xl font-serif font-bold text-navy">1</p>
                  <p className="text-xs text-muted font-medium">Fully Certified</p>
                </div>
                <div className="bg-white rounded-xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] text-center flex flex-col items-center">
                  <p className="text-2xl font-serif font-bold text-emerald">58%</p>
                  <p className="text-xs text-muted font-medium">Avg. Completion</p>
                </div>
                <div className="bg-white rounded-xl border border-border p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] text-center flex flex-col items-center">
                  <p className="text-2xl font-serif font-bold text-navy">6</p>
                  <p className="text-xs text-muted font-medium">Active Modules</p>
                </div>
              </div>

              {/* ── Content Upload Zone ── */}
              <div className="mb-6">
                <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-3">Add Training Content</h2>
                <div
                  onDragOver={(e) => { e.preventDefault(); setUploadHover(true); }}
                  onDragLeave={() => setUploadHover(false)}
                  onDrop={(e) => { e.preventDefault(); setUploadHover(false); }}
                  className={`rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
                    uploadHover
                      ? 'border-teal bg-teal/5'
                      : 'border-border bg-white hover:border-navy/30'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <Upload size={22} className={`transition-colors duration-200 ${uploadHover ? 'text-teal' : 'text-muted'}`} />
                  </div>
                  <p className="text-sm font-serif font-medium text-navy mb-1">Drag &amp; drop course materials here</p>
                  <p className="text-xs text-muted mb-3">PDF, MP4, DOCX, PPTX, SCORM</p>
                  <Button variant="secondary" className="text-xs">Browse Files</Button>
                </div>

                {/* Recent Uploads */}
                <div className="mt-3 space-y-2">
                  {RECENT_UPLOADS.map((file, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-lg border border-border px-4 py-2.5 hover:bg-warm-white transition-colors duration-150">
                      <File size={16} className="text-navy/40 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-charcoal truncate">{file.name}</p>
                        <p className="text-[10px] text-muted">{file.size} &middot; {file.date}</p>
                      </div>
                      <button className="text-muted hover:text-red-500 transition-colors duration-200 shrink-0">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Question Bank ── */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider">Question Bank</h2>
                  <Button variant="teal" className="text-xs flex items-center gap-1.5">
                    <Plus size={13} /> Add Question
                  </Button>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 mb-4">
                  {[
                    { key: 'all', label: 'All' },
                    { key: 'multiple-choice', label: 'Multiple Choice' },
                    { key: 'true-false', label: 'True/False' },
                    { key: 'scenario', label: 'Scenario-Based' },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setQuestionFilter(key)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                        questionFilter === key
                          ? 'bg-navy text-white'
                          : 'bg-white text-muted border border-border hover:border-navy/30 hover:text-charcoal'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Question Cards */}
                <div className="space-y-2.5">
                  {filteredQuestions.map((q) => {
                    const typeCfg = QUESTION_TYPE_CONFIG[q.type];
                    return (
                      <div
                        key={q.id}
                        className="bg-white rounded-xl border border-border px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-charcoal leading-relaxed line-clamp-2">{q.text}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${typeCfg.color}`}>
                                {typeCfg.label}
                              </span>
                              <span className="text-[10px] text-muted">{q.module}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-navy hover:bg-navy/5 transition-all duration-200">
                              <Pencil size={13} />
                            </button>
                            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:bg-red-50 transition-all duration-200">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* REPORTS TAB                                                        */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'reports' && (
            <>
              {/* Report Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-serif font-semibold text-navy">Certification Report &mdash; Q1 2026</h2>
                </div>
                <Button variant="teal" className="text-xs flex items-center gap-1.5">
                  <FileText size={13} /> Export PDF
                </Button>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard label="Total Associates" value={6} icon={Users} accent="bg-blue-50 text-blue-600" animated />
                <StatCard label="Fully Certified" value={2} icon={Award} accent="bg-emerald-50 text-emerald-600" animated />
                <StatCard label="In Progress" value={3} icon={Play} accent="bg-teal-50 text-teal-600" animated />
                <StatCard label="Not Started" value={1} icon={Clock} accent="bg-amber-50 text-amber-600" animated />
              </div>

              {/* Report Table */}
              <div className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EEF2F7]">
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Associate Name</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Modules Complete</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Remaining</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Last Activity</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">% Complete</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {REPORT_ASSOCIATES.map((a, i) => {
                      const statusCfg = REPORT_STATUS_CONFIG[a.status];
                      return (
                        <tr key={a.id} className={`border-b border-border/50 last:border-0 transition-colors duration-150 hover:bg-[#EEF2F7] ${i % 2 === 1 ? 'bg-warm-white' : ''}`}>
                          <td className="px-4 py-3.5 font-serif font-medium text-charcoal">{a.name}</td>
                          <td className="px-4 py-3.5 text-charcoal font-semibold">{a.modulesComplete}</td>
                          <td className="px-4 py-3.5 text-charcoal">{a.modulesRemaining}</td>
                          <td className="px-4 py-3.5 text-xs text-muted">{a.lastActivity}</td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wide ${statusCfg.color}`}>
                              {statusCfg.label}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                                <div
                                  className={`h-full rounded-full ${a.pct === 100 ? 'bg-emerald' : 'bg-teal'}`}
                                  style={{ width: `${a.pct}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold text-charcoal">{a.pct}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            {a.status !== 'certified' && (
                              <button className="flex items-center gap-1 text-xs font-semibold text-teal hover:text-teal-dark transition-colors duration-200">
                                <Send size={12} /> Remind
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-muted">Last updated: Today at 8:00 AM</p>
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
