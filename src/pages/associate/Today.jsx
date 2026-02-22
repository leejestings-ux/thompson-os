import { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  ClipboardList,
  PenLine,
  AlertCircle,
  Calendar,
  UserPlus,
  CalendarPlus,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import StatCard from '../../components/shared/StatCard';
import MeetingRow from '../../components/associate/MeetingRow';
import Button from '../../components/shared/Button';
import { SkeletonTodayView } from '../../components/ui/SkeletonLoader';
import {
  donors,
  getOrganization,
  getSvoDraft,
} from '../../lib/mockData';
import { WORKFLOW_STATES } from '../../lib/constants';
import { getTodaySchedule, donorTasks } from '../../lib/donorMockData';

// Demo reference date aligned with mock data timeline
const DEMO_TODAY = new Date('2025-02-10');

const CURRENT_ASSOCIATE = { id: 'assoc-1', firstName: 'Catherine' };

function daysBetween(dateStr, ref) {
  return Math.max(0, Math.floor((ref - new Date(dateStr)) / 86400000));
}

// ── Animated Counter ──────────────────────────────────────────────────────────

function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const target = typeof value === 'number' ? value : parseInt(value, 10);
    if (isNaN(target)) { setDisplay(value); return; }

    let start = 0;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    }

    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);

  return <>{display}</>;
}

// ── Quick Action Button ───────────────────────────────────────────────────────

function QuickAction({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2.5 px-4 py-2.5 bg-dark-navy text-white text-sm font-medium rounded-lg
                 hover:bg-teal transition-all duration-200 active:scale-95"
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

// ── Main Content (extracted for skeleton wrapper) ─────────────────────────────

function TodayContent() {
  const navigate = useNavigate();
  const schedule = getTodaySchedule();

  // ─── Stats ──────────────────────────────────────────────────────────────
  const activeDonors = donors.filter(
    (d) => d.workflowState !== WORKFLOW_STATES.CLOSED
  ).length;

  const intakePending = donors.filter(
    (d) =>
      d.workflowState === WORKFLOW_STATES.INVITED ||
      d.workflowState === WORKFLOW_STATES.INTAKE_INCOMPLETE
  ).length;

  const draftsInProgress = donors.filter(
    (d) => d.workflowState === WORKFLOW_STATES.DRAFTING
  ).length;

  const allPendingTasks = Object.values(donorTasks)
    .flat()
    .filter((t) => t.status === 'pending');
  const overdueTasks = allPendingTasks.filter(
    (t) => new Date(t.dueDate) < DEMO_TODAY
  );

  // ─── Needs Attention ────────────────────────────────────────────────────
  const attentionItems = useMemo(() => {
    const items = [];

    donors
      .filter((d) => d.workflowState === WORKFLOW_STATES.INTAKE_INCOMPLETE)
      .forEach((d) => {
        const days = daysBetween(d.invitedAt, DEMO_TODAY);
        if (days > 7) {
          items.push({
            donorId: d.id,
            donorName: d.name,
            npoId: d.npoId,
            issue: `Intake incomplete \u2014 ${days} days`,
            urgency: days,
            type: 'intake',
          });
        }
      });

    donors
      .filter((d) => d.workflowState === WORKFLOW_STATES.MEETING_HELD)
      .forEach((d) => {
        const draft = getSvoDraft(d.id);
        if (!draft && d.meetingDate) {
          const days = daysBetween(d.meetingDate, DEMO_TODAY);
          if (days > 3) {
            items.push({
              donorId: d.id,
              donorName: d.name,
              npoId: d.npoId,
              issue: `Meeting held, no draft started \u2014 ${days} days`,
              urgency: days,
              type: 'draft',
            });
          }
        }
      });

    donors
      .filter((d) => d.workflowState === WORKFLOW_STATES.DRAFTING)
      .forEach((d) => {
        const draft = getSvoDraft(d.id);
        if (draft && draft.status === 'in_review') {
          const days = daysBetween(draft.updatedAt, DEMO_TODAY);
          if (days > 5) {
            items.push({
              donorId: d.id,
              donorName: d.name,
              npoId: d.npoId,
              issue: `Draft in review \u2014 ${days} days`,
              urgency: days,
              type: 'review',
            });
          }
        }
      });

    const tasksByDonor = {};
    for (const [donorId, tasks] of Object.entries(donorTasks)) {
      const overdue = tasks.filter(
        (t) => t.status === 'pending' && new Date(t.dueDate) < DEMO_TODAY
      );
      if (overdue.length > 0) tasksByDonor[donorId] = overdue;
    }

    for (const [donorId, tasks] of Object.entries(tasksByDonor)) {
      const donor = donors.find((d) => d.id === donorId);
      if (!donor) continue;
      const oldestDays = Math.max(
        ...tasks.map((t) => daysBetween(t.dueDate, DEMO_TODAY))
      );
      items.push({
        donorId: donor.id,
        donorName: donor.name,
        npoId: donor.npoId,
        issue: `${tasks.length} overdue task${tasks.length > 1 ? 's' : ''} \u2014 oldest ${oldestDays}d`,
        urgency: oldestDays,
        type: 'task',
      });
    }

    items.sort((a, b) => b.urgency - a.urgency);
    return items;
  }, []);

  // ─── Date Display ───────────────────────────────────────────────────────
  const dateDisplay = DEMO_TODAY.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const borderColors = {
    intake: 'border-l-red-400',
    draft: 'border-l-amber-400',
    review: 'border-l-teal',
    task: 'border-l-red-500',
  };

  const totalAttention = attentionItems.length + schedule.length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 animate-fadeIn">
      {/* ─── Header ─── */}
      <div className="mb-8">
        <h1 className="text-[28px] font-serif text-navy tracking-tight">
          Good morning, {CURRENT_ASSOCIATE.firstName}
        </h1>
        <p className="text-sm text-muted mt-1.5 font-serif">{dateDisplay}</p>
        {totalAttention > 0 && (
          <p className="text-sm text-charcoal/70 mt-1">
            You have <span className="font-semibold text-navy">{totalAttention}</span> items requiring attention.
          </p>
        )}
      </div>

      {/* ─── Stats Row ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Active Donors"
          value={activeDonors}
          icon={Users}
          accent="bg-blue-50 text-blue-600"
          animated
        />
        <StatCard
          label="Intake Pending"
          value={intakePending}
          icon={ClipboardList}
          accent="bg-amber-50 text-amber-600"
          animated
        />
        <StatCard
          label="Drafts in Progress"
          value={draftsInProgress}
          icon={PenLine}
          accent="bg-violet-50 text-violet-600"
          animated
        />
        <StatCard
          label="Follow-Ups Due"
          value={overdueTasks.length}
          icon={AlertCircle}
          accent="bg-red-50 text-red-600"
          animated
        />
      </div>

      {/* ─── Quick Actions Bar ─── */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <QuickAction icon={UserPlus} label="New Donor" onClick={() => navigate('/associate/pipeline')} />
        <QuickAction icon={CalendarPlus} label="Schedule Meeting" onClick={() => {}} />
        <QuickAction icon={FileText} label="Generate SVO" onClick={() => {}} />
      </div>

      {/* ─── Two-Column Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT COLUMN (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Today's Schedule */}
          <div className="animate-fadeInUp animate-delay-1">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={17} className="text-navy" />
              <h2 className="text-lg font-serif text-navy">
                Today&rsquo;s Schedule
              </h2>
            </div>

            {schedule.length > 0 ? (
              <div className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] divide-y divide-border/50 overflow-hidden">
                {schedule.map((mtg) => (
                  <MeetingRow key={mtg.id} meeting={mtg} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-border p-10 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                <Calendar
                  size={32}
                  className="text-muted/30 mx-auto mb-3"
                />
                <p className="text-muted text-sm font-serif italic">
                  No meetings scheduled for today.
                </p>
              </div>
            )}
          </div>

          {/* Needs Attention */}
          {attentionItems.length > 0 && (
            <div className="animate-fadeInUp animate-delay-3">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={17} className="text-amber-600" />
                <h2 className="text-lg font-serif text-navy">
                  Needs Attention
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  {attentionItems.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {attentionItems.map((item) => {
                  const org = getOrganization(item.npoId);
                  return (
                    <div
                      key={`${item.donorId}-${item.issue}`}
                      className={`bg-white rounded-xl border border-border border-l-4 ${borderColors[item.type] || 'border-l-amber-400'} p-4 flex items-center justify-between gap-4
                                  shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]
                                  hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer group`}
                      onClick={() => navigate(`/associate/donor/${item.donorId}`)}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-serif font-semibold text-charcoal truncate group-hover:text-navy transition-colors duration-200">
                          {item.donorName}
                        </p>
                        <p className="text-xs text-muted mt-0.5 truncate">
                          {org?.name}
                        </p>
                        <p className="text-xs text-amber-600 font-medium mt-1.5">
                          {item.issue}
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-muted group-hover:text-navy shrink-0 transition-colors duration-200" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Feed / Timeline */}
          <div className="animate-fadeInUp animate-delay-2 bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-teal" />
              <h3 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider">
                Recent Activity
              </h3>
            </div>
            <div className="space-y-0">
              {[
                { time: '9:15 AM', text: 'Intake received from Virginia Caldwell', dot: 'bg-emerald' },
                { time: '8:42 AM', text: 'Draft v3 saved for Holloway SVO', dot: 'bg-teal' },
                { time: 'Yesterday', text: 'Meeting notes added for Pennington', dot: 'bg-navy' },
                { time: 'Yesterday', text: 'Follow-up task created for Wakefield', dot: 'bg-amber-500' },
                { time: 'Feb 8', text: 'SVO delivered to Eleanor Fairchild', dot: 'bg-emerald' },
              ].map((event, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 py-2.5 ${i > 0 ? 'border-t border-border/40' : ''}`}
                >
                  <div className="flex flex-col items-center pt-1.5">
                    <div className={`w-2 h-2 rounded-full ${event.dot}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-charcoal leading-relaxed">{event.text}</p>
                  </div>
                  <span className="text-[11px] text-muted whitespace-nowrap shrink-0 pt-0.5">{event.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming This Week */}
          <div className="animate-fadeInUp animate-delay-4 bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] p-5">
            <h3 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-4">
              Upcoming This Week
            </h3>
            <div className="space-y-3">
              {[
                { day: 'Tue', text: 'Pennington follow-up meeting', badge: 'Follow-up', badgeClass: 'bg-violet-50 text-violet-700 border border-violet-200' },
                { day: 'Wed', text: 'Caldwell intake review', badge: 'Intake', badgeClass: 'bg-amber-50 text-amber-700 border border-amber-200' },
                { day: 'Thu', text: 'SVO delivery: Eleanor Fairchild', badge: 'Delivery', badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
                { day: 'Fri', text: 'Midwest Seminary monthly retainer', badge: 'Admin', badgeClass: 'bg-slate-50 text-slate-600 border border-slate-200' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-navy w-8 shrink-0">{item.day}</span>
                  <p className="text-xs text-charcoal flex-1 min-w-0 truncate">{item.text}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wide ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Export with Skeleton Loading ──────────────────────────────────────────

export default function TodayView() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      requestAnimationFrame(() => setVisible(true));
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <SkeletonTodayView />
        ) : (
          <div className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <TodayContent />
          </div>
        )}
      </div>
    </AppShell>
  );
}
