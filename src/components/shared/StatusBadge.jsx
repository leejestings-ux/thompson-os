const STATE_STYLES = {
  'Invited':            'bg-blue-50 text-blue-700',
  'Intake Incomplete':  'bg-amber-50 text-amber-700',
  'Intake Complete':    'bg-emerald-50 text-emerald-700',
  'Meeting Scheduled':  'bg-violet-50 text-violet-700',
  'Meeting Held':       'bg-indigo-50 text-indigo-700',
  'Drafting':           'bg-yellow-50 text-yellow-700',
  'Delivered':          'bg-teal-50 text-teal-700',
  'Follow-Up':          'bg-orange-50 text-orange-700',
  'Closed':             'bg-slate-100 text-slate-500',
};

export default function StatusBadge({ state }) {
  const style = STATE_STYLES[state] || 'bg-slate-100 text-slate-600';

  return (
    <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${style}`}>
      {state}
    </span>
  );
}
