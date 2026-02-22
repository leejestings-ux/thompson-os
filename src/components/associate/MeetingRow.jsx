import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { getDonor, getOrganization } from '../../lib/mockData';

const TYPE_STYLES = {
  Initial: 'bg-blue-50 text-blue-700 border border-blue-200',
  'Follow-up': 'bg-violet-50 text-violet-700 border border-violet-200',
  Delivery: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

export default function MeetingRow({ meeting }) {
  const navigate = useNavigate();
  const donor = getDonor(meeting.donorId);
  const org = getOrganization(donor?.npoId);
  const isReady = donor?.intakeCompletion === 100;

  if (!donor) return null;

  return (
    <div
      className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#EEF2F7] transition-all duration-150 cursor-pointer group"
      onClick={() => navigate(`/associate/donor/${donor.id}`)}
    >
      {/* Time */}
      <div className="w-28 shrink-0">
        <p className="text-sm font-semibold text-charcoal">{meeting.time}</p>
        <p className="text-[11px] text-muted">{meeting.endTime}</p>
      </div>

      {/* Donor name */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/associate/donor/${donor.id}`); }}
        className="text-sm font-serif font-semibold text-navy hover:text-teal transition-colors duration-200 text-left min-w-0 shrink-0"
      >
        {donor.name}
      </button>

      {/* NPO */}
      <p className="text-xs text-muted truncate flex-1 min-w-0">
        {org?.name}
      </p>

      {/* Meeting type badge */}
      <span
        className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap uppercase tracking-wide ${
          TYPE_STYLES[meeting.type] || 'bg-slate-50 text-slate-600 border border-slate-200'
        }`}
      >
        {meeting.type}
      </span>

      {/* Prep status */}
      {isReady ? (
        <span className="flex items-center gap-1 text-emerald-600">
          <CheckCircle2 size={15} />
          <span className="text-[11px] font-medium">Ready</span>
        </span>
      ) : (
        <span className="flex items-center gap-1 text-amber-600">
          <AlertTriangle size={15} />
          <span className="text-[11px] font-medium">Incomplete</span>
        </span>
      )}
    </div>
  );
}
