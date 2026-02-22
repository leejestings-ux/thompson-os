import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, FileCheck, Check } from 'lucide-react';
import { getSvoDraft } from '../../../lib/mockData';
import Button from '../../shared/Button';

const STATUS_STYLES = {
  draft: 'bg-amber-50 text-amber-700 border border-amber-200',
  in_review: 'bg-blue-50 text-blue-700 border border-blue-200',
  final: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  delivered: 'bg-slate-100 text-slate-600 border border-slate-200',
};

const STATUS_LABELS = {
  draft: 'Draft',
  in_review: 'In Review',
  final: 'Final',
  delivered: 'Delivered',
};

export default function DraftsTab({ donor }) {
  const navigate = useNavigate();
  const svoDraft = getSvoDraft(donor.id);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const drafts = [];

  if (svoDraft) {
    drafts.push({
      id: svoDraft.id,
      type: 'Statement of Values & Objectives',
      icon: FileText,
      status: svoDraft.status,
      lastEdited: svoDraft.updatedAt,
      version: 2,
      hasEditor: true,
    });
  }

  // Mock recommendations draft for donors in Drafting+ states
  const advancedStates = ['Drafting', 'Delivered', 'Follow-Up', 'Closed'];
  if (advancedStates.includes(donor.workflowState) && svoDraft) {
    drafts.push({
      id: 'rec-1',
      type: 'Recommendations Letter',
      icon: FileCheck,
      status: 'draft',
      lastEdited: svoDraft.updatedAt,
      version: 1,
      hasEditor: false,
    });
  }

  if (drafts.length === 0) {
    return (
      <div className="text-center py-12 animate-fadeIn">
        <p className="text-muted text-sm font-serif italic mb-4">No drafts yet.</p>
        <Button onClick={() => setToast('Draft generated')}>
          Generate Draft
        </Button>
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-charcoal text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg animate-[fadeIn_0.2s_ease-out]">
            <Check size={16} className="text-emerald-400" />
            {toast}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      {drafts.map((draft) => {
        const Icon = draft.icon;
        return (
          <div
            key={draft.id}
            className="bg-white rounded-xl border border-border p-5 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md hover:scale-[1.01] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center">
                <Icon size={20} className="text-navy" />
              </div>
              <div>
                <p className="text-sm font-semibold text-charcoal">
                  {draft.type}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      STATUS_STYLES[draft.status]
                    }`}
                  >
                    {STATUS_LABELS[draft.status]}
                  </span>
                  <span className="text-xs text-muted">
                    v{draft.version} &middot; Last edited{' '}
                    {new Date(draft.lastEdited).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div>
              {draft.hasEditor ? (
                <Button
                  onClick={() =>
                    navigate(`/associate/donor/${donor.id}/svo`)
                  }
                >
                  Open Editor
                </Button>
              ) : (
                <Button variant="secondary">View</Button>
              )}
            </div>
          </div>
        );
      })}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-charcoal text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg animate-[fadeIn_0.2s_ease-out]">
          <Check size={16} className="text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}
