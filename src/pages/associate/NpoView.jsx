import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, UserCheck, FileCheck, Clock } from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import StatCard from '../../components/shared/StatCard';
import DataTable from '../../components/shared/DataTable';
import StatusBadge from '../../components/shared/StatusBadge';
import { getOrganization, getDonorsByNpo, getAssociate } from '../../lib/mockData';
import { WORKFLOW_STATES } from '../../lib/constants';

const CONTRACT_DATA = {
  'npo-1': { pattern: 'Monthly retainer — 2nd Tuesday', contact: 'Margaret Ellis', notes: 'Active since 2019. Primary focus on high-net-worth family foundations and scholarship funds.' },
  'npo-2': { pattern: 'Quarterly engagement — 1st week of quarter', contact: 'Robert Tanner', notes: 'Hospital endowment focus. Prefer evening meetings for donor access.' },
  'npo-3': { pattern: 'Bi-monthly — flexible schedule', contact: 'Susan Blackwell', notes: 'Land conservation trust. Many donors in rural areas — expect travel time.' },
  'npo-4': { pattern: 'Monthly retainer — last Friday', contact: 'Dr. James Whitfield', notes: 'Seminary endowment. Donors are often alumni with strong faith motivation.' },
};

function daysSince(dateStr) {
  if (!dateStr) return '—';
  const days = Math.floor((new Date('2025-02-10') - new Date(dateStr)) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  return `${days}d ago`;
}

export default function NpoView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const npo = getOrganization(id);
  const donors = npo ? getDonorsByNpo(npo.id) : [];

  if (!npo) {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted text-sm">Organization not found</p>
        </div>
      </AppShell>
    );
  }

  const activeDonors = donors.filter(
    (d) => d.workflowState !== WORKFLOW_STATES.CLOSED
  );
  const completedDonors = donors.filter(
    (d) =>
      d.workflowState === WORKFLOW_STATES.DELIVERED ||
      d.workflowState === WORKFLOW_STATES.FOLLOW_UP ||
      d.workflowState === WORKFLOW_STATES.CLOSED
  );
  const avgCompletion = donors.length
    ? Math.round(donors.reduce((s, d) => s + d.intakeCompletion, 0) / donors.length)
    : 0;

  const contract = CONTRACT_DATA[npo.id] || {};

  const columns = [
    {
      key: 'name',
      label: 'Donor',
      render: (row) => (
        <button
          onClick={() => navigate(`/associate/donor/${row.id}`)}
          className="text-navy font-medium hover:underline"
        >
          {row.name}
        </button>
      ),
    },
    {
      key: 'associate',
      label: 'Associate',
      render: (row) => {
        const assoc = getAssociate(row.associateId);
        return <span className="text-charcoal">{assoc?.name || '—'}</span>;
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge state={row.workflowState} />,
    },
    {
      key: 'intake',
      label: 'Intake',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-navy rounded-full"
              style={{ width: `${row.intakeCompletion}%` }}
            />
          </div>
          <span className="text-xs text-muted">{row.intakeCompletion}%</span>
        </div>
      ),
    },
    {
      key: 'lastActivity',
      label: 'Last Activity',
      render: (row) => (
        <span className="text-xs text-muted">
          {daysSince(row.meetingDate || row.invitedAt)}
        </span>
      ),
    },
  ];

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/associate/today')}
              className="text-muted hover:text-charcoal transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-navy tracking-tight">
                  {npo.name}
                </h1>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Active
                </span>
              </div>
              <p className="text-sm text-muted mt-0.5">
                {npo.city}, {npo.state}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Donors"
              value={donors.length}
              icon={Users}
              accent="bg-blue-50 text-blue-600"
            />
            <StatCard
              label="Active Donors"
              value={activeDonors.length}
              icon={UserCheck}
              accent="bg-emerald-50 text-emerald-600"
            />
            <StatCard
              label="Plans Completed"
              value={completedDonors.length}
              icon={FileCheck}
              accent="bg-violet-50 text-violet-600"
            />
            <StatCard
              label="Avg Completion"
              value={`${avgCompletion}%`}
              icon={Clock}
              accent="bg-amber-50 text-amber-600"
            />
          </div>

          {/* Donors table */}
          <div>
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wider mb-3">
              Donors
            </h2>
            <DataTable columns={columns} data={donors} emptyMessage="No donors for this organization" />
          </div>

          {/* Contract details */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-sm font-semibold text-navy uppercase tracking-wider mb-4">
              Contract Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted font-medium mb-1">
                  Engagement Pattern
                </p>
                <p className="text-sm text-charcoal">
                  {contract.pattern || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium mb-1">
                  Primary Contact
                </p>
                <p className="text-sm text-charcoal">
                  {contract.contact || npo.contactName}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted font-medium mb-1">Notes</p>
                <p className="text-sm text-charcoal leading-relaxed">
                  {contract.notes || 'No additional notes.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
