import { WORKFLOW_STATES, CONCERN_FLAGS } from './constants';

// ─── NPO Organizations ──────────────────────────────────────────────────────

export const organizations = [
  {
    id: 'npo-1',
    name: 'Grace Community Foundation',
    contactName: 'Margaret Ellis',
    contactEmail: 'mellis@gracecf.org',
    donorCount: 4,
    city: 'Nashville',
    state: 'TN',
  },
  {
    id: 'npo-2',
    name: 'Heartland Children\'s Hospital',
    contactName: 'Robert Tanner',
    contactEmail: 'rtanner@heartlandch.org',
    donorCount: 4,
    city: 'Louisville',
    state: 'KY',
  },
  {
    id: 'npo-3',
    name: 'Appalachian Heritage Trust',
    contactName: 'Susan Blackwell',
    contactEmail: 'sblackwell@apptrust.org',
    donorCount: 3,
    city: 'Asheville',
    state: 'NC',
  },
  {
    id: 'npo-4',
    name: 'Midwest Seminary Endowment',
    contactName: 'Dr. James Whitfield',
    contactEmail: 'jwhitfield@mwseminary.edu',
    donorCount: 3,
    city: 'Indianapolis',
    state: 'IN',
  },
];

// ─── Associates ──────────────────────────────────────────────────────────────

export const associates = [
  {
    id: 'assoc-1',
    name: 'Catherine Mercer',
    email: 'cmercer@thompsonassoc.com',
    title: 'Senior Planning Consultant',
    activeDonors: 5,
  },
  {
    id: 'assoc-2',
    name: 'David Harrington',
    email: 'dharrington@thompsonassoc.com',
    title: 'Planning Consultant',
    activeDonors: 5,
  },
  {
    id: 'assoc-3',
    name: 'Rebecca Townsend',
    email: 'rtownsend@thompsonassoc.com',
    title: 'Junior Planning Consultant',
    activeDonors: 4,
  },
];

// ─── Donors ──────────────────────────────────────────────────────────────────

export const donors = [
  // Invited
  {
    id: 'donor-1',
    name: 'Harold & Edith Whitmore',
    email: 'ewhitmore@gmail.com',
    npoId: 'npo-1',
    associateId: 'assoc-1',
    workflowState: WORKFLOW_STATES.INVITED,
    intakeCompletion: 0,
    meetingDate: null,
    concernFlags: [],
    phone: '(615) 555-0142',
    invitedAt: '2025-01-28',
  },
  // Intake Incomplete
  {
    id: 'donor-2',
    name: 'Virginia Caldwell',
    email: 'vcaldwell@aol.com',
    npoId: 'npo-2',
    associateId: 'assoc-2',
    workflowState: WORKFLOW_STATES.INTAKE_INCOMPLETE,
    intakeCompletion: 35,
    meetingDate: null,
    concernFlags: [CONCERN_FLAGS.UNRESPONSIVE],
    phone: '(502) 555-0198',
    invitedAt: '2025-01-15',
  },
  {
    id: 'donor-3',
    name: 'Charles & Martha Pennington',
    email: 'cpennington@comcast.net',
    npoId: 'npo-3',
    associateId: 'assoc-1',
    workflowState: WORKFLOW_STATES.INTAKE_INCOMPLETE,
    intakeCompletion: 70,
    meetingDate: null,
    concernFlags: [],
    phone: '(828) 555-0167',
    invitedAt: '2025-01-10',
  },
  // Intake Complete
  {
    id: 'donor-4',
    name: 'Robert & Jean Sullivan',
    email: 'rsullivan@outlook.com',
    npoId: 'npo-1',
    associateId: 'assoc-3',
    workflowState: WORKFLOW_STATES.INTAKE_COMPLETE,
    intakeCompletion: 100,
    meetingDate: null,
    concernFlags: [CONCERN_FLAGS.HIGH_VALUE],
    phone: '(615) 555-0231',
    invitedAt: '2025-01-05',
  },
  {
    id: 'donor-5',
    name: 'Dorothy Maynard',
    email: 'dmaynard@yahoo.com',
    npoId: 'npo-4',
    associateId: 'assoc-2',
    workflowState: WORKFLOW_STATES.INTAKE_COMPLETE,
    intakeCompletion: 100,
    meetingDate: null,
    concernFlags: [CONCERN_FLAGS.CAPACITY_CONCERN],
    phone: '(317) 555-0104',
    invitedAt: '2025-01-02',
  },
  // Meeting Scheduled
  {
    id: 'donor-6',
    name: 'William & Patricia Thornton',
    email: 'wthornton@gmail.com',
    npoId: 'npo-2',
    associateId: 'assoc-1',
    workflowState: WORKFLOW_STATES.MEETING_SCHEDULED,
    intakeCompletion: 100,
    meetingDate: '2025-02-14',
    concernFlags: [],
    phone: '(502) 555-0277',
    invitedAt: '2024-12-20',
  },
  // Meeting Held
  {
    id: 'donor-7',
    name: 'James & Eleanor Prescott',
    email: 'jprescott@bellsouth.net',
    npoId: 'npo-3',
    associateId: 'assoc-3',
    workflowState: WORKFLOW_STATES.MEETING_HELD,
    intakeCompletion: 100,
    meetingDate: '2025-02-03',
    concernFlags: [CONCERN_FLAGS.COMPLEX_FAMILY],
    phone: '(828) 555-0319',
    invitedAt: '2024-12-15',
  },
  {
    id: 'donor-8',
    name: 'Frances Beaumont',
    email: 'fbeaumont@hotmail.com',
    npoId: 'npo-1',
    associateId: 'assoc-2',
    workflowState: WORKFLOW_STATES.MEETING_HELD,
    intakeCompletion: 100,
    meetingDate: '2025-01-29',
    concernFlags: [],
    phone: '(615) 555-0388',
    invitedAt: '2024-12-10',
  },
  // Drafting
  {
    id: 'donor-9',
    name: 'Richard & Anne Holloway',
    email: 'rholloway@gmail.com',
    npoId: 'npo-4',
    associateId: 'assoc-1',
    workflowState: WORKFLOW_STATES.DRAFTING,
    intakeCompletion: 100,
    meetingDate: '2025-01-20',
    concernFlags: [CONCERN_FLAGS.HIGH_VALUE, CONCERN_FLAGS.COMPLEX_FAMILY],
    phone: '(317) 555-0455',
    invitedAt: '2024-11-28',
  },
  {
    id: 'donor-10',
    name: 'Margaret Ashford',
    email: 'mashford@comcast.net',
    npoId: 'npo-2',
    associateId: 'assoc-3',
    workflowState: WORKFLOW_STATES.DRAFTING,
    intakeCompletion: 100,
    meetingDate: '2025-01-22',
    concernFlags: [],
    phone: '(502) 555-0412',
    invitedAt: '2024-12-01',
  },
  // Delivered
  {
    id: 'donor-11',
    name: 'Thomas & Betty Crawford',
    email: 'tcrawford@yahoo.com',
    npoId: 'npo-3',
    associateId: 'assoc-2',
    workflowState: WORKFLOW_STATES.DELIVERED,
    intakeCompletion: 100,
    meetingDate: '2025-01-10',
    concernFlags: [],
    phone: '(828) 555-0543',
    invitedAt: '2024-11-15',
  },
  // Follow-Up
  {
    id: 'donor-12',
    name: 'Gerald & Louise Patterson',
    email: 'gpatterson@aol.com',
    npoId: 'npo-4',
    associateId: 'assoc-1',
    workflowState: WORKFLOW_STATES.FOLLOW_UP,
    intakeCompletion: 100,
    meetingDate: '2024-12-18',
    concernFlags: [CONCERN_FLAGS.TIME_SENSITIVE],
    phone: '(317) 555-0621',
    invitedAt: '2024-10-30',
  },
  {
    id: 'donor-13',
    name: 'Evelyn Rutherford',
    email: 'erutherford@gmail.com',
    npoId: 'npo-1',
    associateId: 'assoc-3',
    workflowState: WORKFLOW_STATES.FOLLOW_UP,
    intakeCompletion: 100,
    meetingDate: '2024-12-05',
    concernFlags: [CONCERN_FLAGS.UNRESPONSIVE],
    phone: '(615) 555-0709',
    invitedAt: '2024-10-15',
  },
  // Closed
  {
    id: 'donor-14',
    name: 'Walter & Helen Stanton',
    email: 'wstanton@bellsouth.net',
    npoId: 'npo-2',
    associateId: 'assoc-2',
    workflowState: WORKFLOW_STATES.CLOSED,
    intakeCompletion: 100,
    meetingDate: '2024-11-15',
    concernFlags: [],
    phone: '(502) 555-0834',
    invitedAt: '2024-09-20',
  },
];

// ─── Meeting Notes ───────────────────────────────────────────────────────────

export const meetingNotes = [
  {
    id: 'note-1',
    donorId: 'donor-7',
    associateId: 'assoc-3',
    date: '2025-02-03',
    duration: 75,
    location: 'Donor residence — Asheville, NC',
    summary: 'Met with James and Eleanor at their home. Both were engaged and had clearly reviewed the intake materials. James expressed strong desire to support Appalachian Heritage Trust\'s land conservation program. Eleanor raised concerns about providing for their three adult children, one of whom has special needs (daughter Sarah, age 42, with Down syndrome). Discussed supplemental needs trust options and how a charitable remainder trust could provide income stream while preserving the gift intent. Eleanor asked for time to speak with their attorney before proceeding.',
    actionItems: [
      'Draft supplemental needs trust language for Sarah',
      'Prepare CRT illustration with 5% payout rate',
      'Follow up with Eleanor re: attorney conversation — target Feb 17',
    ],
    emotionalState: 'engaged',
  },
  {
    id: 'note-2',
    donorId: 'donor-8',
    associateId: 'assoc-2',
    date: '2025-01-29',
    duration: 45,
    location: 'Thompson & Associates — Conference Room B',
    summary: 'Frances came in alone for her personal meeting. She is recently widowed (husband passed September 2024) and is motivated to "get her affairs in order." She has a clear vision: leave her home to her granddaughter, provide a scholarship fund through Grace Community Foundation, and ensure her cat Mabel is cared for. Estate is straightforward — home valued at ~$380K, investment accounts ~$520K, no debt. She was emotional but decisive. Ready to proceed to SVO drafting immediately.',
    actionItems: [
      'Begin SVO draft — prioritize scholarship fund language',
      'Research pet trust provisions for Tennessee',
      'Send Frances a summary letter of our conversation',
    ],
    emotionalState: 'confident',
  },
  {
    id: 'note-3',
    donorId: 'donor-9',
    associateId: 'assoc-1',
    date: '2025-01-20',
    duration: 90,
    location: 'Donor residence — Indianapolis, IN',
    summary: 'Richard and Anne have a complex estate: primary residence, vacation property in Michigan, family business (Holloway Manufacturing, ~$4.2M valuation), various investment accounts, and a significant art collection. They want to create a legacy gift to Midwest Seminary but need to balance obligations to their two sons who are involved in the business. Discussed succession planning alongside charitable intent. Recommended a phased approach: business succession first, then charitable remainder trust for non-business assets. Richard was receptive; Anne wanted more details on tax implications.',
    actionItems: [
      'Prepare business succession timeline alongside estate plan',
      'Model CRT scenarios with different payout rates (4%, 5%, 6%)',
      'Coordinate with their CPA (Mark Reynolds, Reynolds & Associates)',
      'Schedule follow-up call to review tax projections — Feb 5',
    ],
    emotionalState: 'engaged',
  },
];

// ─── Sample SVO Draft ────────────────────────────────────────────────────────

export const svoDrafts = [
  {
    id: 'svo-1',
    donorId: 'donor-9',
    associateId: 'assoc-1',
    createdAt: '2025-01-25',
    updatedAt: '2025-02-01',
    status: 'draft',
    title: 'Statement of Values & Objectives — Richard & Anne Holloway',
    content: `Dear Richard and Anne,

Thank you for sharing your time, your story, and your vision with us during our meeting on January 20th. It was a privilege to sit with you in your home and hear about the values that have guided your family for over forty years.

FAMILY & FAITH

You spoke movingly about the role that faith has played in your lives — from the small church in Terre Haute where you met as teenagers, to the seminary education that shaped Richard's early career before he founded Holloway Manufacturing. Anne, you described your family's guiding principle beautifully: "We were given much, and we believe we are called to give back." That conviction is the foundation of everything we will build together.

Your desire to provide for your sons, Michael and David, while also honoring your commitment to Midwest Seminary reflects a thoughtful balance between family responsibility and charitable purpose. We heard clearly that you want Michael and David to continue leading the business, with a transition plan that respects their contributions and ensures stability for your 47 employees.

CHARITABLE VISION

Your connection to Midwest Seminary spans three decades. The scholarship program you envision — supporting first-generation seminary students from rural communities — is deeply personal and profoundly needed. As you noted, "Every young pastor in a small town deserves the same chance Richard had." We will ensure this vision is preserved with specificity and care in your estate documents.

RECOMMENDED APPROACH

Based on our conversation, we recommend a phased approach:

Phase 1: Business Succession — Establish a structured buy-sell agreement allowing Michael and David to acquire ownership over a 10-year period, funded through company earnings and life insurance.

Phase 2: Charitable Remainder Trust — Fund a CRT with non-business investment assets (~$1.8M), providing you with a 5% annual income stream during your lifetimes while ultimately benefiting the seminary endowment.

Phase 3: Directed Scholarship Fund — Create a named fund within the seminary's endowment with specific criteria for recipient selection, renewable annually.

We will prepare detailed illustrations for each phase and schedule a follow-up meeting to review them together.

With respect and gratitude,
Catherine Mercer
Senior Planning Consultant
Thompson & Associates`,
  },
];

// ─── Helper Functions ────────────────────────────────────────────────────────

export const getDonorsByState = (state) => donors.filter(d => d.workflowState === state);
export const getDonorsByAssociate = (associateId) => donors.filter(d => d.associateId === associateId);
export const getDonorsByNpo = (npoId) => donors.filter(d => d.npoId === npoId);
export const getOrganization = (npoId) => organizations.find(o => o.id === npoId);
export const getAssociate = (associateId) => associates.find(a => a.id === associateId);
export const getDonor = (donorId) => donors.find(d => d.id === donorId);
export const getMeetingNotes = (donorId) => meetingNotes.filter(n => n.donorId === donorId);
export const getSvoDraft = (donorId) => svoDrafts.find(s => s.donorId === donorId);
