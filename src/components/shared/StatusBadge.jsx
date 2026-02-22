const STATE_STYLES = {
  'Invited':            'bg-blue-50 text-blue-700 border border-blue-200',
  'Intake Incomplete':  'bg-amber-50 text-amber-700 border border-amber-200',
  'Intake Complete':    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Meeting Scheduled':  'bg-violet-50 text-violet-700 border border-violet-200',
  'Meeting Held':       'bg-indigo-50 text-indigo-700 border border-indigo-200',
  'Drafting':           'bg-yellow-50 text-yellow-700 border border-yellow-200',
  'Delivered':          'bg-teal-50 text-teal-700 border border-teal-200',
  'Follow-Up':          'bg-orange-50 text-orange-700 border border-orange-200',
  'Closed':             'bg-slate-50 text-slate-600 border border-slate-200',
  'Active':             'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Pending':            'bg-amber-50 text-amber-700 border border-amber-200',
  'In Progress':        'bg-teal-50 text-teal-700 border border-teal-200',
  'Alert':              'bg-red-50 text-red-700 border border-red-200',
  'Urgent':             'bg-red-50 text-red-700 border border-red-200',
  'Completed':          'bg-slate-50 text-slate-600 border border-slate-200',
};

export default function StatusBadge({ state }) {
  const style = STATE_STYLES[state] || 'bg-slate-50 text-slate-600 border border-slate-200';

  return (
    <span className={`inline-block text-[10px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wide transition-all duration-150 hover:shadow-sm ${style}`}>
      {state}
    </span>
  );
}
