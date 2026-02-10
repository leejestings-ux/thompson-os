import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import StatusBadge from '../../components/shared/StatusBadge';
import NotesTab from '../../components/associate/donor/NotesTab';
import { getDonor, getOrganization } from '../../lib/mockData';

export default function MeetingNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const donor = getDonor(id);
  const org = donor ? getOrganization(donor.npoId) : null;

  if (!donor) {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted text-sm">Donor not found</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-white flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/associate/donor/${id}`)}
            className="text-muted hover:text-charcoal transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-navy tracking-tight">
                Meeting Notes
              </h1>
              <StatusBadge state={donor.workflowState} />
            </div>
            <p className="text-sm text-muted mt-0.5">
              {donor.name} &mdash; {org?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl">
          <NotesTab donor={donor} />
        </div>
      </div>
    </AppShell>
  );
}
