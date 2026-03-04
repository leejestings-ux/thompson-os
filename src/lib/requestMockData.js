// ─── Internal Request Queue Mock Data ────────────────────────────────────────

export const REQUEST_TYPES = [
  'Preliminary Recommendations',
  'SVO Request (Restatement)',
  'SVO Request (AI Narrative)',
  'Final Recommendations / Narrative',
  'Document Generation',
  'Asset Summary Review',
  'Compliance Review',
  'Other',
];

export const REQUEST_STATUSES = ['Open', 'In Progress', 'Drafted', 'Fulfilled', 'Closed'];

export const planningAttorneys = [
  { id: 'pa-1', name: 'Jason Meredith', title: 'Planning Attorney' },
  { id: 'pa-2', name: 'Bill Gustoff', title: 'Planning Attorney' },
];

export const supportStaff = [
  { id: 'ss-1', name: 'Sara', title: 'Support Staff' },
  { id: 'ss-2', name: 'Bethany Rozell', title: 'Support Staff' },
];

export const requests = [
  {
    id: 'req-1',
    donorName: 'Dennis & Patricia Adams',
    requestingAssociate: 'Darren Penny',
    type: 'Preliminary Recommendations',
    priority: 'Normal',
    dueDate: '2025-03-15',
    status: 'Open',
    assignedTo: 'pa-1',
    associateComments: 'Current is 0% to charity, desired is 10% to charity using IRD. Please prepare preliminary recommendations with charitable remainder trust options.',
    planningComments: '',
    createdAt: '2025-03-01T09:00:00Z',
    timeline: [
      { status: 'Open', at: '2025-03-01T09:00:00Z', by: 'Darren Penny' },
    ],
  },
  {
    id: 'req-2',
    donorName: 'Brandon & Emilee Terrell',
    requestingAssociate: 'Brian Cohoon',
    type: 'SVO Request (Restatement)',
    priority: 'Rush',
    dueDate: '2025-03-08',
    status: 'Drafted',
    assignedTo: 'pa-1',
    associateComments: 'Meeting held Feb 28. Both spouses aligned on goals. Need restatement ASAP for follow-up meeting next week.',
    planningComments: 'Jason — draft restatement complete, saved to shared drive. Ready for associate review. — Sara',
    createdAt: '2025-03-01T14:30:00Z',
    timeline: [
      { status: 'Open', at: '2025-03-01T14:30:00Z', by: 'Brian Cohoon' },
      { status: 'In Progress', at: '2025-03-02T08:15:00Z', by: 'Jason Meredith' },
      { status: 'Drafted', at: '2025-03-04T11:00:00Z', by: 'Sara' },
    ],
  },
  {
    id: 'req-3',
    donorName: 'Robert & Margaret Chen',
    requestingAssociate: 'Jane Smith',
    type: 'Final Recommendations / Narrative',
    priority: 'Normal',
    dueDate: '2025-03-20',
    status: 'Open',
    assignedTo: 'pa-1',
    associateComments: 'Complex family situation — grandson with special needs. Spouses have diverging priorities on distribution. Please include supplemental needs trust language and CRT illustration options.',
    planningComments: '',
    createdAt: '2025-03-03T10:00:00Z',
    timeline: [
      { status: 'Open', at: '2025-03-03T10:00:00Z', by: 'Jane Smith' },
    ],
  },
  {
    id: 'req-4',
    donorName: 'Michael & Susan Rivera',
    requestingAssociate: 'Beth Wingard',
    type: 'Document Generation',
    priority: 'Normal',
    dueDate: '2025-03-12',
    status: 'Fulfilled',
    assignedTo: 'pa-2',
    associateComments: 'Final documents approved. Please generate execution-ready set including will, trust, POA, and healthcare directive.',
    planningComments: 'Bill — documents generated and uploaded to donor file. All four documents ready for signing ceremony. — Bethany Rozell',
    createdAt: '2025-02-25T11:00:00Z',
    timeline: [
      { status: 'Open', at: '2025-02-25T11:00:00Z', by: 'Beth Wingard' },
      { status: 'In Progress', at: '2025-02-26T09:00:00Z', by: 'Bill Gustoff' },
      { status: 'Drafted', at: '2025-03-01T16:00:00Z', by: 'Bethany Rozell' },
      { status: 'Fulfilled', at: '2025-03-03T10:30:00Z', by: 'Bill Gustoff' },
    ],
  },
  {
    id: 'req-5',
    donorName: 'James & Carol Patterson',
    requestingAssociate: 'Kevin Pischke',
    type: 'Preliminary Recommendations',
    priority: 'Rush',
    dueDate: '2025-03-06',
    status: 'In Progress',
    assignedTo: 'pa-1',
    associateComments: 'Donor meeting scheduled for March 7. Need preliminary recs before meeting. Estate ~$2.1M, primarily retirement accounts and real estate. Goal: maximize charitable impact while maintaining income for surviving spouse.',
    planningComments: 'Working on this now. Will have ready by EOD March 5. — Jason',
    createdAt: '2025-03-03T08:00:00Z',
    timeline: [
      { status: 'Open', at: '2025-03-03T08:00:00Z', by: 'Kevin Pischke' },
      { status: 'In Progress', at: '2025-03-03T14:00:00Z', by: 'Jason Meredith' },
    ],
  },
  {
    id: 'req-6',
    donorName: 'William & Nancy Thompson',
    requestingAssociate: 'Jennifer Stolo',
    type: 'Asset Summary Review',
    priority: 'Normal',
    dueDate: '2025-03-18',
    status: 'Open',
    assignedTo: 'pa-2',
    associateComments: 'Donor completed asset wizard. Please review for completeness and flag any items needing clarification before meeting.',
    planningComments: '',
    createdAt: '2025-03-04T09:00:00Z',
    timeline: [
      { status: 'Open', at: '2025-03-04T09:00:00Z', by: 'Jennifer Stolo' },
    ],
  },
  {
    id: 'req-7',
    donorName: 'David & Linda Morrison',
    requestingAssociate: 'Russ Smith',
    type: 'SVO Request (AI Narrative)',
    priority: 'Normal',
    dueDate: '2025-03-22',
    status: 'Open',
    assignedTo: 'pa-2',
    associateComments: 'Meeting held March 1. Straightforward estate — no business interests, both spouses aligned. Please generate AI narrative draft for my review.',
    planningComments: '',
    createdAt: '2025-03-04T11:00:00Z',
    timeline: [
      { status: 'Open', at: '2025-03-04T11:00:00Z', by: 'Russ Smith' },
    ],
  },
  {
    id: 'req-8',
    donorName: 'Thomas & Barbara Wilson',
    requestingAssociate: 'Dan Espensen',
    type: 'Compliance Review',
    priority: 'Normal',
    dueDate: '2025-03-25',
    status: 'Fulfilled',
    assignedTo: 'pa-2',
    associateComments: 'Final narrative complete. Please review for compliance before delivery to donor.',
    planningComments: 'Reviewed and approved. No compliance issues found. Clear to deliver. — Bill',
    createdAt: '2025-02-28T15:00:00Z',
    timeline: [
      { status: 'Open', at: '2025-02-28T15:00:00Z', by: 'Dan Espensen' },
      { status: 'In Progress', at: '2025-03-01T09:00:00Z', by: 'Bill Gustoff' },
      { status: 'Fulfilled', at: '2025-03-03T14:00:00Z', by: 'Bill Gustoff' },
    ],
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export const getRequestsByAssignee = (assigneeId) =>
  requests.filter((r) => r.assignedTo === assigneeId);

export const getRequestsByAssociate = (name) =>
  requests.filter((r) => r.requestingAssociate === name);

export const getRequestsByStatus = (status) =>
  requests.filter((r) => r.status === status);

export const getRushRequests = () =>
  requests.filter((r) => r.priority === 'Rush');

export const getAttorneyName = (id) => {
  const pa = planningAttorneys.find((p) => p.id === id);
  return pa ? pa.name : 'Unassigned';
};
