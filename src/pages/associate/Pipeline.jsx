import { useState, useMemo, useEffect } from 'react';
import { Plus, Search, X, Check } from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import PageHeader from '../../components/shared/PageHeader';
import PipelineColumn from '../../components/associate/PipelineColumn';
import { WORKFLOW_ORDER, WORKFLOW_STATES } from '../../lib/constants';
import {
  donors as initialDonors,
  organizations,
  associates,
  getOrganization,
  getAssociate,
} from '../../lib/mockData';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  npoId: '',
  associateId: '',
};

export default function PipelineBoard() {
  const [allDonors, setAllDonors] = useState(initialDonors);
  const [filterNpo, setFilterNpo] = useState('');
  const [filterAssociate, setFilterAssociate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewDonor, setShowNewDonor] = useState(false);
  const [newDonorForm, setNewDonorForm] = useState(EMPTY_FORM);
  const [toast, setToast] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Filtered donors
  const filteredDonors = useMemo(() => {
    return allDonors.filter((d) => {
      if (filterNpo && d.npoId !== filterNpo) return false;
      if (filterAssociate && d.associateId !== filterAssociate) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const org = getOrganization(d.npoId);
        if (
          !d.name.toLowerCase().includes(q) &&
          !(org?.name || '').toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [allDonors, filterNpo, filterAssociate, searchQuery]);

  // Group by workflow state
  const columnData = useMemo(() => {
    const map = {};
    WORKFLOW_ORDER.forEach((state) => (map[state] = []));
    filteredDonors.forEach((d) => {
      if (map[d.workflowState]) map[d.workflowState].push(d);
    });
    return map;
  }, [filteredDonors]);

  // Counts
  const totalFiltered = filteredDonors.length;
  const totalAll = allDonors.length;
  const isFiltered = filterNpo || filterAssociate || searchQuery;

  // New donor handlers
  function openNewDonor() {
    setNewDonorForm(EMPTY_FORM);
    setShowNewDonor(true);
  }

  function handleNewDonorChange(field, value) {
    setNewDonorForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleNewDonorSave() {
    if (!newDonorForm.name.trim() || !newDonorForm.npoId || !newDonorForm.associateId) return;

    const newDonor = {
      id: `donor-${Date.now()}`,
      name: newDonorForm.name.trim(),
      email: newDonorForm.email.trim(),
      phone: newDonorForm.phone.trim(),
      npoId: newDonorForm.npoId,
      associateId: newDonorForm.associateId,
      workflowState: WORKFLOW_STATES.INVITED,
      intakeCompletion: 0,
      meetingDate: null,
      concernFlags: [],
      invitedAt: new Date().toISOString().split('T')[0],
    };

    setAllDonors((prev) => [...prev, newDonor]);
    setShowNewDonor(false);
    setToast(`${newDonor.name} added to pipeline`);
  }

  const canSave = newDonorForm.name.trim() && newDonorForm.npoId && newDonorForm.associateId;

  return (
    <AppShell>
      <PageHeader
        title="Pipeline Board"
        subtitle={isFiltered ? `${totalFiltered} of ${totalAll} donors` : `${totalAll} donors`}
      >
        <button
          onClick={openNewDonor}
          className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors"
        >
          <Plus size={16} />
          New Donor
        </button>
      </PageHeader>

      {/* Filter bar */}
      <div className="flex items-center gap-3 px-6 py-3 border-b border-border bg-white flex-shrink-0">
        {/* NPO filter */}
        <select
          value={filterNpo}
          onChange={(e) => setFilterNpo(e.target.value)}
          className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-charcoal focus:outline-none focus:border-navy/40"
        >
          <option value="">All Organizations</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>{org.name}</option>
          ))}
        </select>

        {/* Associate filter */}
        <select
          value={filterAssociate}
          onChange={(e) => setFilterAssociate(e.target.value)}
          className="text-sm border border-border rounded-lg px-3 py-1.5 bg-white text-charcoal focus:outline-none focus:border-navy/40"
        >
          <option value="">All Associates</option>
          {associates.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search donors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm border border-border rounded-lg pl-9 pr-3 py-1.5 bg-white text-charcoal placeholder:text-muted focus:outline-none focus:border-navy/40"
          />
        </div>

        {/* Clear filters */}
        {isFiltered && (
          <button
            onClick={() => { setFilterNpo(''); setFilterAssociate(''); setSearchQuery(''); }}
            className="text-xs text-muted hover:text-charcoal transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-3 p-4 h-full min-w-max">
          {WORKFLOW_ORDER.map((state) => (
            <PipelineColumn key={state} state={state} donors={columnData[state]} />
          ))}
        </div>
      </div>

      {/* ─── New Donor Modal ─── */}
      {showNewDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowNewDonor(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-navy">New Donor</h2>
              <button
                onClick={() => setShowNewDonor(false)}
                className="text-muted hover:text-charcoal transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-charcoal mb-1">Donor Name *</label>
                <input
                  type="text"
                  value={newDonorForm.name}
                  onChange={(e) => handleNewDonorChange('name', e.target.value)}
                  placeholder="e.g. Harold & Edith Whitmore"
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1">Email</label>
                  <input
                    type="email"
                    value={newDonorForm.email}
                    onChange={(e) => handleNewDonorChange('email', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-charcoal mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newDonorForm.phone}
                    onChange={(e) => handleNewDonorChange('phone', e.target.value)}
                    placeholder="(555) 555-0100"
                    className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal mb-1">Organization *</label>
                <select
                  value={newDonorForm.npoId}
                  onChange={(e) => handleNewDonorChange('npoId', e.target.value)}
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40"
                >
                  <option value="">Select organization...</option>
                  {organizations.map((org) => (
                    <option key={org.id} value={org.id}>{org.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal mb-1">Assigned Associate *</label>
                <select
                  value={newDonorForm.associateId}
                  onChange={(e) => handleNewDonorChange('associateId', e.target.value)}
                  className="w-full text-sm border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-navy/40"
                >
                  <option value="">Select associate...</option>
                  {associates.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border">
              <button
                onClick={() => setShowNewDonor(false)}
                className="px-4 py-2 text-sm font-medium text-charcoal hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleNewDonorSave}
                disabled={!canSave}
                className="px-4 py-2 text-sm font-medium bg-navy text-white rounded-lg hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add to Pipeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Success Toast ─── */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-charcoal text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg animate-[fadeIn_0.2s_ease-out]">
          <Check size={16} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </AppShell>
  );
}
