import { useNavigate } from 'react-router-dom';
import { getOrganization } from '../../lib/mockData';
import { WORKFLOW_STATES } from '../../lib/constants';

const FLAG_COLORS = {
  'Unresponsive':      'bg-red-400',
  'Complex Family':    'bg-purple-400',
  'High Value Estate': 'bg-amber-400',
  'Time Sensitive':    'bg-orange-400',
  'Capacity Concern':  'bg-sky-400',
};

function getNextAction(donor) {
  switch (donor.workflowState) {
    case WORKFLOW_STATES.INVITED:
      return 'Awaiting intake response';
    case WORKFLOW_STATES.INTAKE_INCOMPLETE:
      return `Follow up on intake (${donor.intakeCompletion}%)`;
    case WORKFLOW_STATES.INTAKE_COMPLETE:
      return 'Schedule meeting';
    case WORKFLOW_STATES.MEETING_SCHEDULED:
      return `Meeting ${donor.meetingDate || 'TBD'}`;
    case WORKFLOW_STATES.MEETING_HELD:
      return 'Begin SVO draft';
    case WORKFLOW_STATES.DRAFTING:
      return 'Complete SVO';
    case WORKFLOW_STATES.DELIVERED:
      return 'Await donor feedback';
    case WORKFLOW_STATES.FOLLOW_UP:
      return 'Schedule follow-up';
    case WORKFLOW_STATES.CLOSED:
      return 'Complete';
    default:
      return '';
  }
}

function daysInState(invitedAt) {
  const now = new Date();
  const invited = new Date(invitedAt);
  return Math.max(0, Math.floor((now - invited) / (1000 * 60 * 60 * 24)));
}

export default function DonorCard({ donor }) {
  const navigate = useNavigate();
  const org = getOrganization(donor.npoId);
  const days = daysInState(donor.invitedAt);
  const nextAction = getNextAction(donor);
  const showIntake = donor.intakeCompletion > 0 && donor.intakeCompletion < 100;

  return (
    <button
      onClick={() => navigate(`/associate/donor/${donor.id}`)}
      className="w-full text-left bg-white rounded-lg border border-border p-3.5
                 shadow-[0_1px_2px_rgba(0,0,0,0.04)]
                 hover:shadow-md hover:border-navy/20 hover:scale-[1.01]
                 transition-all duration-200 cursor-pointer group"
    >
      {/* Name & NPO */}
      <p className="text-sm font-serif font-semibold text-charcoal group-hover:text-navy transition-colors duration-200 leading-tight">
        {donor.name}
      </p>
      <p className="text-xs text-muted mt-0.5 truncate">
        {org?.name}
      </p>

      {/* Intake progress bar */}
      {showIntake && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted font-medium uppercase tracking-wider">Intake</span>
            <span className="text-[10px] text-charcoal font-semibold">{donor.intakeCompletion}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal rounded-full transition-all duration-500"
              style={{ width: `${donor.intakeCompletion}%` }}
            />
          </div>
        </div>
      )}

      {/* Meta row: days + concern flags */}
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[11px] text-muted">
          {days}d in pipeline
        </span>
        {donor.concernFlags.length > 0 && (
          <div className="flex items-center gap-1">
            {donor.concernFlags.map((flag) => (
              <span
                key={flag}
                title={flag}
                className={`w-2 h-2 rounded-full ${FLAG_COLORS[flag] || 'bg-slate-300'} transition-transform duration-200 hover:scale-150`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Next action */}
      <div className="mt-2 pt-2 border-t border-border/60">
        <p className="text-[11px] text-navy/70 font-medium leading-tight">
          {nextAction}
        </p>
      </div>
    </button>
  );
}
