import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import StatusBadge from '../../components/shared/StatusBadge';
import Tabs from '../../components/shared/Tabs';
import Button from '../../components/shared/Button';
import { getDonor, getOrganization } from '../../lib/mockData';
import { WORKFLOW_ORDER } from '../../lib/constants';
import OverviewTab from '../../components/associate/donor/OverviewTab';
import IntakeTab from '../../components/associate/donor/IntakeTab';
import NotesTab from '../../components/associate/donor/NotesTab';
import DraftsTab from '../../components/associate/donor/DraftsTab';
import TasksTab from '../../components/associate/donor/TasksTab';
import FilesTab from '../../components/associate/donor/FilesTab';
import AuditTab from '../../components/associate/donor/AuditTab';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'intake', label: 'Intake' },
  { key: 'notes', label: 'Notes' },
  { key: 'drafts', label: 'Drafts' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'files', label: 'Files' },
  { key: 'audit', label: 'Audit' },
];

export default function DonorCommandCenter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseDonor = getDonor(id);
  const [donor, setDonor] = useState(baseDonor);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAdvanceMenu, setShowAdvanceMenu] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!donor) {
    return (
      <AppShell>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted text-sm mb-2">Donor not found</p>
            <button
              onClick={() => navigate('/associate/pipeline')}
              className="text-navy text-sm hover:underline"
            >
              Back to Pipeline
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  const org = getOrganization(donor.npoId);
  const currentIdx = WORKFLOW_ORDER.indexOf(donor.workflowState);
  const nextState =
    currentIdx < WORKFLOW_ORDER.length - 1
      ? WORKFLOW_ORDER[currentIdx + 1]
      : null;

  function handleAdvance() {
    if (!nextState) return;
    setDonor((prev) => ({ ...prev, workflowState: nextState }));
    setShowAdvanceMenu(false);
    setToast(`Advanced to ${nextState}`);
  }

  return (
    <AppShell>
      {/* Page Header */}
      <div className="px-6 py-4 border-b border-border bg-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/associate/pipeline')}
              className="text-muted hover:text-charcoal transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-navy tracking-tight">
                  {donor.name}
                </h1>
                <StatusBadge state={donor.workflowState} />
              </div>
              <p className="text-sm text-muted mt-0.5">{org?.name}</p>
            </div>
          </div>

          {nextState && (
            <div className="relative">
              <Button
                onClick={() => setShowAdvanceMenu(!showAdvanceMenu)}
                className="flex items-center gap-2"
              >
                Advance State
                <ChevronDown size={14} />
              </Button>
              {showAdvanceMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowAdvanceMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-lg shadow-lg border border-border p-1 min-w-[200px]">
                    <button
                      onClick={handleAdvance}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-table-stripe rounded-md transition-colors"
                    >
                      Move to{' '}
                      <span className="font-semibold text-navy">
                        {nextState}
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs items={TABS} active={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && <OverviewTab donor={donor} />}
        {activeTab === 'intake' && <IntakeTab donor={donor} />}
        {activeTab === 'notes' && <NotesTab donor={donor} />}
        {activeTab === 'drafts' && <DraftsTab donor={donor} />}
        {activeTab === 'tasks' && <TasksTab donor={donor} />}
        {activeTab === 'files' && <FilesTab donor={donor} />}
        {activeTab === 'audit' && <AuditTab donor={donor} />}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-charcoal text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg animate-[fadeIn_0.2s_ease-out]">
          <Check size={16} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </AppShell>
  );
}
