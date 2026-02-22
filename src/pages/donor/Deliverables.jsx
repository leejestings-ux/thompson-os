import { useState } from 'react';
import { FileText, Download, CheckCircle2, Clock } from 'lucide-react';
import DonorShell from '../../components/donor/DonorShell';
import Button from '../../components/shared/Button';

const DELIVERABLES = [
  {
    id: 'del-1',
    title: 'Statement of Values & Objectives',
    description:
      'A narrative summary of your values, goals, family considerations, and charitable vision — the foundation of your estate plan.',
    deliveredAt: '2025-02-08',
    type: 'SVO',
    acknowledged: false,
  },
  {
    id: 'del-2',
    title: 'Planning Recommendations',
    description:
      'Detailed recommendations for trust structures, charitable vehicles, and succession strategies tailored to your situation.',
    deliveredAt: null,
    type: 'Recommendations',
    acknowledged: false,
  },
];

export default function Deliverables() {
  const [items, setItems] = useState(DELIVERABLES);

  const acknowledge = (id) => {
    setItems((prev) =>
      prev.map((d) => (d.id === id ? { ...d, acknowledged: true } : d))
    );
  };

  const hasDeliverables = items.some((d) => d.deliveredAt);

  return (
    <DonorShell>
      <div className="mb-6">
        <h1 className="text-[22px] font-serif text-navy tracking-tight">
          Your Estate Planning Documents
        </h1>
        <p className="text-base text-muted mt-1">
          Review and download documents prepared by your planning associate.
        </p>
      </div>

      {!hasDeliverables ? (
        <div className="bg-white rounded-xl border border-border p-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Clock size={24} className="text-muted" />
          </div>
          <h2 className="text-lg font-serif text-navy mb-2">
            Your documents are being prepared
          </h2>
          <p className="text-base text-muted max-w-sm mx-auto leading-relaxed">
            Your associate is working on your estate planning documents. You'll
            receive a notification when they're ready for review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-serif font-semibold text-navy">
                      {doc.title}
                    </h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200 uppercase tracking-wide">
                      {doc.type}
                    </span>
                  </div>
                  <p className="text-base text-charcoal/70 leading-relaxed mb-4">
                    {doc.description}
                  </p>

                  {doc.deliveredAt ? (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted">
                        Delivered{' '}
                        {new Date(doc.deliveredAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="relative group">
                          <Button variant="secondary" disabled className="text-base">
                            <span className="flex items-center gap-1.5">
                              <Download size={14} />
                              Download PDF
                            </span>
                          </Button>
                          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                            <div className="bg-charcoal text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                              PDF generation coming soon
                            </div>
                          </div>
                        </div>
                        {!doc.acknowledged ? (
                          <Button variant="teal" onClick={() => acknowledge(doc.id)} className="text-base">
                            Acknowledge Receipt
                          </Button>
                        ) : (
                          <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                            <CheckCircle2 size={14} />
                            Acknowledged
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <Clock size={14} />
                      In progress — not yet delivered
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DonorShell>
  );
}
