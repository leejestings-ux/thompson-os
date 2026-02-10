import { WORKFLOW_ORDER } from './constants';

// ─── Values-Based Questionnaire (VBQ) ──────────────────────────────────────

export const vbqQuestions = [
  { id: 1, text: 'What are the three most important values you want your legacy to reflect?' },
  { id: 2, text: 'How would you describe your relationship with charitable giving?' },
  { id: 3, text: 'What role has faith played in shaping your financial decisions?' },
  { id: 4, text: 'If you could change one thing about how wealth is passed between generations, what would it be?' },
  { id: 5, text: 'Describe a moment when giving to others brought you the most fulfillment.' },
  { id: 6, text: 'How do you want your family to remember your financial stewardship?' },
  { id: 7, text: 'What concerns do you have about leaving wealth to your children or grandchildren?' },
  { id: 8, text: 'How important is it that your charitable gifts have a local vs. national impact?' },
  { id: 9, text: 'Do you believe wealth carries a responsibility to give back? In what way?' },
  { id: 10, text: 'What life experiences most shaped your views on money and generosity?' },
  { id: 11, text: 'How do you feel about publicly recognized giving vs. anonymous gifts?' },
  { id: 12, text: 'What role should your spouse play in estate planning decisions?' },
  { id: 13, text: 'How would you prioritize: family security, charitable impact, or tax efficiency?' },
  { id: 14, text: 'What would you want to happen to your business after your lifetime?' },
  { id: 15, text: 'Describe your ideal relationship between your family and your chosen charity.' },
  { id: 16, text: 'How do you feel about creating permanent endowments vs. time-limited gifts?' },
  { id: 17, text: 'What causes or organizations would you never want your estate to support?' },
  { id: 18, text: 'How do you want your estate plan to handle potential family disagreements?' },
  { id: 19, text: 'What non-financial assets (stories, values, traditions) do you want to pass on?' },
  { id: 20, text: 'How important is it that your charitable gift is used for a specific purpose?' },
  { id: 21, text: 'Would you prefer to see the impact of your giving during your lifetime?' },
  { id: 22, text: 'How do you feel about involving your children in philanthropic decisions?' },
  { id: 23, text: 'What is your greatest fear about estate planning?' },
  { id: 24, text: 'How has your vision for your legacy changed over the past decade?' },
  { id: 25, text: 'In one sentence, how would you like to be remembered?' },
];

// ─── Personal Concerns Instrument ───────────────────────────────────────────

export const concernCategories = [
  {
    name: 'Family',
    items: [
      { id: 1, text: 'Providing adequately for surviving spouse' },
      { id: 2, text: "Children's ongoing financial security" },
      { id: 3, text: 'Special needs care for dependents' },
      { id: 4, text: 'Maintaining family harmony after passing' },
      { id: 5, text: "Grandchildren's education funding" },
      { id: 6, text: 'Preventing estate disputes among heirs' },
    ],
  },
  {
    name: 'Health',
    items: [
      { id: 7, text: 'Long-term care costs and coverage' },
      { id: 8, text: 'Cognitive decline and decision-making capacity' },
      { id: 9, text: 'End-of-life medical decisions' },
      { id: 10, text: 'Rising healthcare costs in retirement' },
    ],
  },
  {
    name: 'Financial',
    items: [
      { id: 11, text: 'Market volatility affecting estate value' },
      { id: 12, text: 'Inflation eroding purchasing power' },
      { id: 13, text: 'Tax burden on estate and beneficiaries' },
      { id: 14, text: 'Outstanding debts or obligations' },
      { id: 15, text: 'Maintaining adequate retirement income' },
    ],
  },
  {
    name: 'Legacy',
    items: [
      { id: 16, text: 'Ensuring charitable gifts create lasting impact' },
      { id: 17, text: 'Name recognition vs. anonymous giving preferences' },
      { id: 18, text: 'Perpetuity of charitable commitments' },
      { id: 19, text: 'Preserving family values across generations' },
    ],
  },
  {
    name: 'Spiritual',
    items: [
      { id: 20, text: 'Alignment of estate plan with faith principles' },
      { id: 21, text: 'Stewardship responsibilities' },
      { id: 22, text: 'Supporting faith-based institutions' },
    ],
  },
  {
    name: 'Community',
    items: [
      { id: 23, text: 'Impact on local community organizations' },
      { id: 24, text: 'Access to education for underserved populations' },
      { id: 25, text: 'Environmental conservation efforts' },
      { id: 26, text: 'Cultural preservation and heritage' },
    ],
  },
];

// ─── Intake Data (by donor) ─────────────────────────────────────────────────

export const intakeData = {
  'donor-9': {
    completedSections: ['basicInfo', 'vbq', 'concerns', 'assets'],
    basicInfo: {
      'Full Name': 'Richard & Anne Holloway',
      'Date of Birth': 'March 14, 1958 / July 22, 1960',
      'Address': '4821 Meridian Hills Blvd, Indianapolis, IN 46208',
      'Phone': '(317) 555-0455',
      'Email': 'rholloway@gmail.com',
      'Spouse': 'Anne Holloway',
      'Children': 'Michael Holloway (age 38), David Holloway (age 35)',
      'Occupation': 'CEO, Holloway Manufacturing (Richard); Retired teacher (Anne)',
      'Attorney': 'Patricia Graves, Graves & Associates',
      'CPA': 'Mark Reynolds, Reynolds & Associates',
      'Referred By': 'Dr. James Whitfield, Midwest Seminary',
    },
    vbqResponses: {
      1: 'Faith, stewardship, and family unity. We want our legacy to show that wealth was a tool for good, not an end in itself.',
      2: 'Giving has always been central to our lives. We tithe and support our seminary — it is not optional, it is who we are.',
      3: 'Our faith is the foundation of every financial decision. Starting the business, choosing where to give — all guided by stewardship.',
      4: 'I would want wealth to come with clear values attached. Too many families pass on money without passing on the why behind it.',
      5: 'Funding the first seminary scholarship. Seeing that young man from rural Indiana get the education I had — that was everything.',
      6: 'That we were generous but wise. That we took care of our family AND made a difference in the world.',
      7: 'That wealth without guidance could divide Michael and David. The business adds complexity — we want a transition that respects both sons.',
      8: 'Both matter, but we lean local. Seeing impact in our community — in Indiana, in the seminary — is deeply personal.',
      9: 'Absolutely. We were given much and we are called to give back. Wealth is a stewardship, not an entitlement.',
      10: 'Growing up without much in Terre Haute. Building the business from nothing. Watching our seminary friends struggle with tuition.',
      11: 'We prefer modest recognition. A named scholarship is fine because it inspires others, but we do not need a building with our name.',
      12: 'Anne is my full partner in this. Every decision is made together. She often sees things I miss — especially about our sons.',
      13: 'Family security first, then charitable impact. Tax efficiency is a tool, not a goal.',
      14: 'Michael and David should run it together. We want a structured transition that protects our 47 employees too.',
      15: 'We want our family to feel connected to our giving. We hope Michael and David will continue supporting the seminary.',
      16: 'A permanent endowment appeals to us. We want the scholarship to outlast us by generations.',
      17: 'Nothing political. We want our gifts focused on education, faith, and community — not advocacy.',
      18: 'Clear documentation and a trusted executor. We have seen families torn apart and refuse to let that happen to ours.',
      19: 'Our faith story. How Richard went from seminary student to business owner. The value of hard work and giving back.',
      20: 'Very important. We want scholarships for first-generation seminary students from rural communities specifically.',
      21: 'Yes, very much. We want to meet our first scholarship recipients and see the program running.',
      22: 'We want to involve them gradually. Michael is ready; David needs more time to understand the vision.',
      23: 'That we will make a decision now that hurts Michael and David\'s relationship later.',
      24: 'Ten years ago it was all about the business. Now it is about what the business can do for others.',
      25: 'They were faithful stewards who built something meaningful and gave it back with joy.',
    },
    concerns: {
      ratings: {
        1: 5, 2: 4, 3: 1, 4: 5, 5: 3, 6: 5,
        7: 3, 8: 2, 9: 3, 10: 3,
        11: 4, 12: 3, 13: 5, 14: 1, 15: 2,
        16: 5, 17: 2, 18: 5, 19: 5,
        20: 5, 21: 4, 22: 5,
        23: 3, 24: 4, 25: 2, 26: 3,
      },
      allocation: { family: 45, charity: 35, reserve: 20 },
    },
    assets: [
      { category: 'Real Estate', totalValue: 1280000, itemCount: 2, notes: 'Primary residence ($880K) + Michigan vacation home ($400K)' },
      { category: 'Investment Accounts', totalValue: 1820000, itemCount: 4, notes: 'Brokerage, mutual funds, managed accounts' },
      { category: 'Retirement', totalValue: 640000, itemCount: 2, notes: '401(k) + Traditional IRA' },
      { category: 'Business Interests', totalValue: 4200000, itemCount: 1, notes: 'Holloway Manufacturing (100% ownership)' },
      { category: 'Personal Property', totalValue: 380000, itemCount: 0, notes: 'Art collection, vehicles, jewelry' },
      { category: 'Insurance & Annuities', totalValue: 500000, itemCount: 2, notes: 'Term life ($350K) + Annuity ($150K)' },
    ],
  },
  'donor-7': {
    completedSections: ['basicInfo', 'vbq', 'concerns', 'assets'],
    basicInfo: {
      'Full Name': 'James & Eleanor Prescott',
      'Date of Birth': 'November 8, 1955 / April 3, 1957',
      'Address': '127 Biltmore Forest Dr, Asheville, NC 28803',
      'Phone': '(828) 555-0319',
      'Email': 'jprescott@bellsouth.net',
      'Spouse': 'Eleanor Prescott',
      'Children': 'Thomas (age 44), Laura (age 41), Sarah (age 42, special needs)',
      'Occupation': 'Retired professor (James); Retired nurse (Eleanor)',
      'Attorney': 'William Chen, Chen & Partners',
      'CPA': 'Sandra Martinez, Martinez Financial',
      'Referred By': 'Susan Blackwell, Appalachian Heritage Trust',
    },
    vbqResponses: {
      1: 'Care for Sarah, land conservation, and education. Our daughter\'s wellbeing comes first, always.',
      2: 'We have supported the Heritage Trust for 20 years. The land in these mountains is irreplaceable.',
      3: 'Faith guides our compassion. We believe in caring for God\'s creation — both people and land.',
      12: 'Eleanor and I are equal partners. She understands Sarah\'s needs better than anyone.',
      23: 'That Sarah won\'t be properly cared for after we are gone. That keeps us up at night.',
      25: 'They loved fiercely, planned carefully, and left the mountains better than they found them.',
    },
    concerns: {
      ratings: {
        1: 5, 2: 3, 3: 5, 4: 4, 5: 3, 6: 3,
        7: 4, 8: 3, 9: 4, 10: 4,
        11: 2, 12: 2, 13: 3, 14: 1, 15: 3,
        16: 4, 17: 2, 18: 4, 19: 4,
        20: 4, 21: 3, 22: 4,
        23: 3, 24: 3, 25: 4, 26: 3,
      },
      allocation: { family: 55, charity: 30, reserve: 15 },
    },
    assets: [
      { category: 'Real Estate', totalValue: 620000, itemCount: 1, notes: 'Primary residence in Biltmore Forest' },
      { category: 'Investment Accounts', totalValue: 480000, itemCount: 3, notes: 'Brokerage + mutual fund accounts' },
      { category: 'Retirement', totalValue: 390000, itemCount: 2, notes: 'University pension + IRA' },
      { category: 'Personal Property', totalValue: 45000, itemCount: 0, notes: 'Vehicles, household items' },
      { category: 'Insurance & Annuities', totalValue: 200000, itemCount: 1, notes: 'Term life insurance' },
    ],
  },
  'donor-4': {
    completedSections: ['basicInfo', 'vbq'],
    basicInfo: {
      'Full Name': 'Robert & Jean Sullivan',
      'Date of Birth': 'June 22, 1952 / September 15, 1954',
      'Address': '892 Belle Meade Blvd, Nashville, TN 37205',
      'Phone': '(615) 555-0231',
      'Email': 'rsullivan@outlook.com',
      'Spouse': 'Jean Sullivan',
      'Children': 'Katherine (age 48), Robert Jr. (age 45), Elizabeth Grant (age 42)',
      'Occupation': 'Retired surgeon (Robert); Community volunteer (Jean)',
      'Attorney': 'Pending selection',
      'CPA': 'Howard & Associates',
      'Referred By': 'Margaret Ellis, Grace Community Foundation',
    },
    vbqResponses: {
      1: 'Medical education, community health, and family harmony.',
      2: 'We have given to Grace Community for a decade. Robert feels strongly about healthcare access.',
      3: 'Our faith tells us to heal and to serve. That is what Robert did for 35 years.',
      25: 'A doctor who healed bodies, and a family that healed communities.',
    },
    concerns: null,
    assets: null,
  },
};

// ─── Workflow History ────────────────────────────────────────────────────────

const HISTORY_OVERRIDES = {
  'donor-9': [
    { state: 'Invited', date: '2024-11-28' },
    { state: 'Intake Incomplete', date: '2024-12-05' },
    { state: 'Intake Complete', date: '2025-01-08' },
    { state: 'Meeting Scheduled', date: '2025-01-10' },
    { state: 'Meeting Held', date: '2025-01-20' },
    { state: 'Drafting', date: '2025-01-22' },
  ],
  'donor-7': [
    { state: 'Invited', date: '2024-12-15' },
    { state: 'Intake Incomplete', date: '2024-12-20' },
    { state: 'Intake Complete', date: '2025-01-15' },
    { state: 'Meeting Scheduled', date: '2025-01-22' },
    { state: 'Meeting Held', date: '2025-02-03' },
  ],
};

export function getWorkflowHistory(donor) {
  if (HISTORY_OVERRIDES[donor.id]) {
    return HISTORY_OVERRIDES[donor.id].map((h) => ({
      ...h,
      isCurrent: h.state === donor.workflowState,
    }));
  }
  const currentIndex = WORKFLOW_ORDER.indexOf(donor.workflowState);
  if (currentIndex < 0) return [];
  const history = [];
  const baseDate = new Date(donor.invitedAt);
  for (let i = 0; i <= currentIndex; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i * 10);
    history.push({
      state: WORKFLOW_ORDER[i],
      date: d.toISOString().split('T')[0],
      isCurrent: i === currentIndex,
    });
  }
  return history;
}

// ─── Tasks ──────────────────────────────────────────────────────────────────

export const donorTasks = {
  'donor-9': [
    { id: 't1', title: 'Review CRT tax projections', category: 'Planning', owner: 'Catherine Mercer', dueDate: '2025-02-10', status: 'pending' },
    { id: 't2', title: 'Coordinate with CPA Mark Reynolds', category: 'Administrative', owner: 'Catherine Mercer', dueDate: '2025-02-05', status: 'complete' },
    { id: 't3', title: 'Draft business succession timeline', category: 'Legal', owner: 'Catherine Mercer', dueDate: '2025-02-15', status: 'pending' },
    { id: 't4', title: 'Send Anne tax implication summary', category: 'Follow-up', owner: 'Catherine Mercer', dueDate: '2025-02-08', status: 'pending' },
    { id: 't5', title: 'Model CRT scenarios (4%, 5%, 6%)', category: 'Planning', owner: 'Catherine Mercer', dueDate: '2025-02-12', status: 'pending' },
  ],
  'donor-7': [
    { id: 't6', title: 'Draft supplemental needs trust for Sarah', category: 'Legal', owner: 'Rebecca Townsend', dueDate: '2025-02-14', status: 'pending' },
    { id: 't7', title: 'Prepare CRT illustration (5% payout)', category: 'Planning', owner: 'Rebecca Townsend', dueDate: '2025-02-12', status: 'pending' },
    { id: 't8', title: 'Follow up re: attorney conversation', category: 'Follow-up', owner: 'Rebecca Townsend', dueDate: '2025-02-17', status: 'pending' },
  ],
  'donor-8': [
    { id: 't9', title: 'Begin SVO draft', category: 'Planning', owner: 'David Harrington', dueDate: '2025-02-05', status: 'complete' },
    { id: 't10', title: 'Research pet trust provisions (TN)', category: 'Legal', owner: 'David Harrington', dueDate: '2025-02-07', status: 'pending' },
    { id: 't11', title: 'Send summary letter to Frances', category: 'Follow-up', owner: 'David Harrington', dueDate: '2025-02-03', status: 'complete' },
  ],
};

// ─── Files ──────────────────────────────────────────────────────────────────

export const donorFiles = {
  'donor-9': [
    { id: 'f1', name: 'Holloway_Financial_Summary_2024.pdf', uploadDate: '2025-01-22', category: 'Financial', size: '2.4 MB' },
    { id: 'f2', name: 'Holloway_Manufacturing_Valuation.pdf', uploadDate: '2025-01-25', category: 'Legal', size: '5.1 MB' },
    { id: 'f3', name: 'Intake_Questionnaire_Holloway.pdf', uploadDate: '2024-12-15', category: 'Personal', size: '890 KB' },
  ],
  'donor-7': [
    { id: 'f4', name: 'Prescott_Trust_Documents.pdf', uploadDate: '2025-01-28', category: 'Legal', size: '3.2 MB' },
    { id: 'f5', name: 'Sarah_Care_Plan_Summary.pdf', uploadDate: '2025-02-01', category: 'Personal', size: '1.1 MB' },
  ],
  'donor-11': [
    { id: 'f6', name: 'Crawford_Estate_Summary.pdf', uploadDate: '2025-01-12', category: 'Legal', size: '1.8 MB' },
  ],
};

// ─── Audit Log ──────────────────────────────────────────────────────────────

export const auditLog = {
  'donor-9': [
    { id: 'a1', timestamp: '2024-11-28T10:15:00', user: 'System', action: 'Donor record created' },
    { id: 'a2', timestamp: '2024-11-28T10:16:00', user: 'System', action: 'Invitation sent via Midwest Seminary Endowment' },
    { id: 'a3', timestamp: '2024-12-05T14:30:00', user: 'System', action: 'State changed: Invited \u2192 Intake Incomplete' },
    { id: 'a4', timestamp: '2024-12-15T09:00:00', user: 'Richard Holloway', action: 'Intake questionnaire submitted (partial \u2014 65%)' },
    { id: 'a5', timestamp: '2025-01-02T11:45:00', user: 'Catherine Mercer', action: 'Updated intake \u2014 added financial documents and completed VBQ' },
    { id: 'a6', timestamp: '2025-01-08T16:20:00', user: 'System', action: 'State changed: Intake Incomplete \u2192 Intake Complete' },
    { id: 'a7', timestamp: '2025-01-10T10:00:00', user: 'Catherine Mercer', action: 'Meeting scheduled for January 20 at donor residence' },
    { id: 'a8', timestamp: '2025-01-10T10:01:00', user: 'System', action: 'State changed: Intake Complete \u2192 Meeting Scheduled' },
    { id: 'a9', timestamp: '2025-01-20T17:30:00', user: 'Catherine Mercer', action: 'Meeting completed \u2014 90 min at donor residence, Indianapolis' },
    { id: 'a10', timestamp: '2025-01-20T17:31:00', user: 'System', action: 'State changed: Meeting Scheduled \u2192 Meeting Held' },
    { id: 'a11', timestamp: '2025-01-22T09:15:00', user: 'System', action: 'State changed: Meeting Held \u2192 Drafting' },
    { id: 'a12', timestamp: '2025-01-25T14:00:00', user: 'Catherine Mercer', action: 'SVO draft created \u2014 version 1' },
    { id: 'a13', timestamp: '2025-02-01T11:30:00', user: 'Catherine Mercer', action: 'SVO draft updated \u2014 version 2' },
  ],
  'donor-7': [
    { id: 'a14', timestamp: '2024-12-15T09:00:00', user: 'System', action: 'Donor record created' },
    { id: 'a15', timestamp: '2024-12-15T09:01:00', user: 'System', action: 'Invitation sent via Appalachian Heritage Trust' },
    { id: 'a16', timestamp: '2024-12-20T10:30:00', user: 'System', action: 'State changed: Invited \u2192 Intake Incomplete' },
    { id: 'a17', timestamp: '2025-01-15T14:00:00', user: 'System', action: 'State changed: Intake Incomplete \u2192 Intake Complete' },
    { id: 'a18', timestamp: '2025-01-22T09:00:00', user: 'Rebecca Townsend', action: 'Meeting scheduled for February 3 at donor residence' },
    { id: 'a19', timestamp: '2025-01-22T09:01:00', user: 'System', action: 'State changed: Intake Complete \u2192 Meeting Scheduled' },
    { id: 'a20', timestamp: '2025-02-03T18:15:00', user: 'Rebecca Townsend', action: 'Meeting completed \u2014 75 min at donor residence, Asheville' },
    { id: 'a21', timestamp: '2025-02-03T18:16:00', user: 'System', action: 'State changed: Meeting Scheduled \u2192 Meeting Held' },
  ],
};

// ─── Helpers ────────────────────────────────────────────────────────────────

export const getIntakeData = (donorId) => intakeData[donorId] || null;
export const getDonorTasks = (donorId) => donorTasks[donorId] || [];
export const getDonorFiles = (donorId) => donorFiles[donorId] || [];
export const getAuditLog = (donorId) => auditLog[donorId] || [];
