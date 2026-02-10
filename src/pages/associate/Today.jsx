import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ClipboardList, PenLine, AlertCircle, Calendar } from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import StatCard from '../../components/shared/StatCard';
import MeetingRow from '../../components/associate/MeetingRow';
import Button from '../../components/shared/Button';
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

export default function TodayView() {
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

    // 1. Intake Incomplete > 7 days
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
          });
        }
      });

    // 2. Meeting Held but no draft started > 3 days
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
            });
          }
        }
      });

    // 3. Drafts in review > 5 days
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
            });
          }
        }
      });

    // 4. Overdue follow-up tasks (grouped by donor)
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

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-10">
          {/* ─── Section 1: Greeting + Stats ─── */}
          <div>
            <h1 className="text-2xl font-semibold text-navy tracking-tight">
              Good morning, {CURRENT_ASSOCIATE.firstName}
            </h1>
            <p className="text-sm text-muted mt-1">{dateDisplay}</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <StatCard
                label="Active Donors"
                value={activeDonors}
                icon={Users}
                accent="bg-blue-50 text-blue-600"
              />
              <StatCard
                label="Intake Pending"
                value={intakePending}
                icon={ClipboardList}
                accent="bg-amber-50 text-amber-600"
              />
              <StatCard
                label="Drafts in Progress"
                value={draftsInProgress}
                icon={PenLine}
                accent="bg-violet-50 text-violet-600"
              />
              <StatCard
                label="Follow-Ups Due"
                value={overdueTasks.length}
                icon={AlertCircle}
                accent="bg-red-50 text-red-600"
              />
            </div>
          </div>

          {/* ─── Section 2: Today's Schedule ─── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-navy" />
              <h2 className="text-lg font-semibold text-navy tracking-tight">
                Today&rsquo;s Schedule
              </h2>
            </div>

            {schedule.length > 0 ? (
              <div className="bg-white rounded-xl border border-border divide-y divide-border/50">
                {schedule.map((mtg) => (
                  <MeetingRow key={mtg.id} meeting={mtg} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-border p-10 text-center">
                <Calendar
                  size={32}
                  className="text-muted/40 mx-auto mb-3"
                />
                <p className="text-muted text-sm">
                  No meetings scheduled for today
                </p>
              </div>
            )}
          </div>

          {/* ─── Section 3: Needs Attention ─── */}
          {attentionItems.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={18} className="text-amber-600" />
                <h2 className="text-lg font-semibold text-navy tracking-tight">
                  Needs Attention
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  {attentionItems.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {attentionItems.map((item) => {
                  const org = getOrganization(item.npoId);
                  return (
                    <div
                      key={`${item.donorId}-${item.issue}`}
                      className="bg-white rounded-xl border border-border p-4 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-charcoal truncate">
                          {item.donorName}
                        </p>
                        <p className="text-xs text-muted mt-0.5 truncate">
                          {org?.name}
                        </p>
                        <p className="text-xs text-amber-600 font-medium mt-1.5">
                          {item.issue}
                        </p>
                      </div>
                      <Button
                        variant="secondary"
                        className="shrink-0"
                        onClick={() =>
                          navigate(`/associate/donor/${item.donorId}`)
                        }
                      >
                        View Donor
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
