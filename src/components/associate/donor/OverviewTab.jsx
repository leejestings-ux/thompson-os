import { getOrganization, getAssociate } from '../../../lib/mockData';
import { getWorkflowHistory } from '../../../lib/donorMockData';

const FLAG_DESCRIPTIONS = {
  'Unresponsive': 'Donor has not responded to recent communications within expected timeframe.',
  'Complex Family': 'Family dynamics require additional sensitivity and careful planning.',
  'High Value Estate': 'Estate value exceeds $3M, requiring specialized planning instruments.',
  'Time Sensitive': 'External deadlines or health concerns require expedited processing.',
  'Capacity Concern': 'Questions about donor decision-making capacity may require additional documentation.',
};

const FLAG_SEVERITY = {
  'Unresponsive': 'Medium',
  'Complex Family': 'High',
  'High Value Estate': 'Low',
  'Time Sensitive': 'High',
  'Capacity Concern': 'High',
};

const SEVERITY_STYLES = {
  Low: 'bg-blue-50 text-blue-700 border border-blue-200',
  Medium: 'bg-amber-50 text-amber-700 border border-amber-200',
  High: 'bg-red-50 text-red-700 border border-red-200',
};

export default function OverviewTab({ donor }) {
  const org = getOrganization(donor.npoId);
  const assoc = getAssociate(donor.associateId);
  const history = getWorkflowHistory(donor);

  const infoRows = [
    ['Full Name', donor.name],
    ['Email', donor.email],
    ['Phone', donor.phone],
    ['Organization', org?.name],
    ['Assigned Associate', assoc?.name],
    ['Invited', new Date(donor.invitedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })],
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donor Info Card */}
        <div className="bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md hover:scale-[1.01] transition-all duration-200">
          <h3 className="font-serif text-sm font-semibold text-navy uppercase tracking-wider mb-1">
            Donor Information
          </h3>
          <div className="w-10 h-0.5 bg-teal rounded mb-4" />
          <dl className="space-y-3">
            {infoRows.map(([label, value]) => (
              <div key={label} className="flex justify-between items-baseline gap-4">
                <dt className="text-xs text-muted font-medium shrink-0">{label}</dt>
                <dd className="text-sm text-charcoal text-right">{value || '\u2014'}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Workflow Timeline */}
        <div className="bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md hover:scale-[1.01] transition-all duration-200">
          <h3 className="font-serif text-sm font-semibold text-navy uppercase tracking-wider mb-1">
            Workflow Timeline
          </h3>
          <div className="w-10 h-0.5 bg-teal rounded mb-4" />
          <div>
            {history.map((entry, i) => (
              <div key={entry.state} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-3 h-3 rounded-full mt-0.5 transition-all duration-200 ${
                      entry.isCurrent
                        ? 'bg-navy ring-4 ring-navy/20'
                        : 'bg-muted/40'
                    }`}
                  />
                  {i < history.length - 1 && (
                    <div className="w-px h-8 bg-border" />
                  )}
                </div>
                <div className={`pb-3 ${entry.isCurrent ? '' : 'opacity-60'}`}>
                  <p
                    className={`text-sm font-medium ${
                      entry.isCurrent ? 'text-navy' : 'text-charcoal'
                    }`}
                  >
                    {entry.state}
                  </p>
                  <p className="text-xs text-muted">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Concern Flags */}
      {donor.concernFlags.length > 0 && (
        <div className="bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
          <h3 className="font-serif text-sm font-semibold text-navy uppercase tracking-wider mb-1">
            Concern Flags
          </h3>
          <div className="w-10 h-0.5 bg-teal rounded mb-4" />
          <div className="space-y-3">
            {donor.concernFlags.map((flag) => (
              <div
                key={flag}
                className="flex items-start gap-3 p-3 rounded-lg bg-warm-white hover:bg-[#EEF2F7] transition-colors duration-150"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-charcoal">{flag}</p>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        SEVERITY_STYLES[FLAG_SEVERITY[flag]]
                      }`}
                    >
                      {FLAG_SEVERITY[flag]}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {FLAG_DESCRIPTIONS[flag]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
