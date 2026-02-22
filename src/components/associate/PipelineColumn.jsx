import DonorCard from './DonorCard';

const COLUMN_HEADER_COLORS = {
  'Invited':            'bg-blue-500',
  'Intake Incomplete':  'bg-amber-500',
  'Intake Complete':    'bg-emerald-500',
  'Meeting Scheduled':  'bg-violet-500',
  'Meeting Held':       'bg-indigo-500',
  'Drafting':           'bg-yellow-500',
  'Delivered':          'bg-teal',
  'Follow-Up':          'bg-orange-500',
  'Closed':             'bg-slate-400',
};

export default function PipelineColumn({ state, donors }) {
  const dotColor = COLUMN_HEADER_COLORS[state] || 'bg-slate-400';

  return (
    <div className="flex-shrink-0 w-72 flex flex-col bg-warm-white rounded-xl border border-border/50 h-full">
      {/* Column header */}
      <div className="px-3.5 py-3 border-b border-border/50 flex items-center gap-2.5 flex-shrink-0">
        <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
        <h3 className="text-[11px] font-semibold text-charcoal uppercase tracking-wider flex-1">
          {state}
        </h3>
        <span className="text-[11px] font-semibold text-muted bg-white px-2 py-0.5 rounded-full border border-border/60">
          {donors.length}
        </span>
      </div>

      {/* Scrollable card list */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
        {donors.length === 0 ? (
          <p className="text-xs text-muted text-center py-8 font-serif italic">No donors</p>
        ) : (
          donors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))
        )}
      </div>
    </div>
  );
}
