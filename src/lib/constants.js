// ─── Thompson OS Design System ───────────────────────────────────────────────

export const COLORS = {
  warmWhite: '#FAFAF8',
  navy: '#1B3A5C',
  charcoal: '#333333',
  mutedRed: '#C0392B',
  tableStripe: '#F0F4F8',
  border: '#E2E8F0',
  muted: '#94A3B8',
  cardBg: '#FFFFFF',
};

export const WORKFLOW_STATES = {
  INVITED: 'Invited',
  INTAKE_INCOMPLETE: 'Intake Incomplete',
  INTAKE_COMPLETE: 'Intake Complete',
  MEETING_SCHEDULED: 'Meeting Scheduled',
  MEETING_HELD: 'Meeting Held',
  DRAFTING: 'Drafting',
  DELIVERED: 'Delivered',
  FOLLOW_UP: 'Follow-Up',
  CLOSED: 'Closed',
};

export const WORKFLOW_ORDER = [
  WORKFLOW_STATES.INVITED,
  WORKFLOW_STATES.INTAKE_INCOMPLETE,
  WORKFLOW_STATES.INTAKE_COMPLETE,
  WORKFLOW_STATES.MEETING_SCHEDULED,
  WORKFLOW_STATES.MEETING_HELD,
  WORKFLOW_STATES.DRAFTING,
  WORKFLOW_STATES.DELIVERED,
  WORKFLOW_STATES.FOLLOW_UP,
  WORKFLOW_STATES.CLOSED,
];

export const CONCERN_FLAGS = {
  UNRESPONSIVE: 'Unresponsive',
  COMPLEX_FAMILY: 'Complex Family',
  HIGH_VALUE: 'High Value Estate',
  TIME_SENSITIVE: 'Time Sensitive',
  CAPACITY_CONCERN: 'Capacity Concern',
};
