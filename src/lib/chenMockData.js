// ─── Robert & Margaret Chen — SVO Demo Data ────────────────────────────────

export const CHEN_BASIC = {
  robert: {
    name: 'Robert Chen',
    age: 67,
    dob: 'April 12, 1958',
    occupation: 'Retired Engineer (Boeing, 32 years)',
    email: 'rchen.family@gmail.com',
    phone: '(615) 555-0384',
  },
  margaret: {
    name: 'Margaret Chen',
    age: 64,
    dob: 'September 3, 1961',
    occupation: 'Retired Professor (Vanderbilt University, English Dept.)',
    email: 'mchen.prof@gmail.com',
    phone: '(615) 555-0385',
  },
  address: '3417 Woodmont Blvd, Nashville, TN 37215',
  marriedSince: 1985,
  previousAttorney: 'William Bradford, Bradford & Associates',
  previousDocumentsYear: 2018,
  previousDocuments: ['Will (2018)', 'Durable Power of Attorney (2018)', 'Healthcare Directive (2018)'],
  cpa: 'Linda Nguyen, Nguyen & Associates',
  referredBy: 'Margaret Ellis, Grace Community Foundation',
};

export const CHEN_CHILDREN = [
  {
    name: 'David Chen',
    age: 38,
    status: 'Married to Sarah Chen',
    children: ['Emma (age 8)', 'Lucas (age 5)'],
    occupation: 'Software engineer at Oracle',
    city: 'San Francisco, CA',
    notes: '',
  },
  {
    name: 'Lisa Chen',
    age: 35,
    status: 'Single',
    children: [],
    occupation: 'Nonprofit program director',
    city: 'Nashville, TN',
    notes: 'Lives closest to parents',
  },
  {
    name: 'James Chen',
    age: 31,
    status: 'Married to Mei Chen',
    children: ['Oliver (age 3, special needs — autism spectrum)'],
    occupation: 'High school teacher',
    city: 'Knoxville, TN',
    notes: 'Oliver requires ongoing therapy and will likely need lifelong support',
  },
];

export const CHEN_ASSETS = [
  { category: 'Primary Residence', value: 720000, ownership: 'Joint', notes: '3417 Woodmont Blvd, Nashville' },
  { category: 'Vacation Property', value: 285000, ownership: 'Joint', notes: 'Cabin — Gatlinburg, TN' },
  { category: 'Robert — 401(k)', value: 890000, ownership: 'Robert', notes: 'Boeing retirement plan, Fidelity' },
  { category: 'Margaret — 403(b)', value: 410000, ownership: 'Margaret', notes: 'Vanderbilt TIAA plan' },
  { category: 'Joint Brokerage', value: 620000, ownership: 'Joint', notes: 'Schwab managed account' },
  { category: 'Robert — Traditional IRA', value: 245000, ownership: 'Robert', notes: 'Vanguard' },
  { category: 'Margaret — Roth IRA', value: 185000, ownership: 'Margaret', notes: 'Vanguard' },
  { category: 'Savings & CDs', value: 140000, ownership: 'Joint', notes: 'First Tennessee Bank' },
  { category: 'Term Life — Robert', value: 500000, ownership: 'Robert', notes: 'Northwestern Mutual, beneficiary: Margaret' },
  { category: 'Term Life — Margaret', value: 250000, ownership: 'Margaret', notes: 'TIAA, beneficiary: Robert' },
  { category: 'Personal Property', value: 95000, ownership: 'Joint', notes: 'Vehicles, furnishings, Margaret\'s book collection' },
];

export const CHEN_PRIORITIES = {
  robert: [
    { rank: 1, label: 'Equal inheritance for all three children' },
    { rank: 2, label: 'Tax minimization on estate transfer' },
    { rank: 3, label: 'Charitable giving to Vanderbilt' },
    { rank: 4, label: 'Asset protection / creditor shielding' },
    { rank: 5, label: 'Maintaining retirement income' },
  ],
  margaret: [
    { rank: 1, label: 'Charitable giving — multiple organizations' },
    { rank: 2, label: 'Special needs provision for grandson Oliver' },
    { rank: 3, label: 'Inheritance for children (adjusted for need)' },
    { rank: 4, label: 'Education funding for all grandchildren' },
    { rank: 5, label: 'Tax minimization' },
  ],
};

export const CHEN_ALLOCATION = {
  robert: { family: 55, charity: 25, taxes: 20 },
  margaret: { family: 40, charity: 40, taxes: 20 },
};

export const CHEN_CHARITABLE = {
  shared: [
    { org: 'Vanderbilt University', amount: 'Significant', purpose: 'Scholarship endowment — English & Engineering depts.', years: 15 },
    { org: 'Nashville Humane Association', amount: 'Moderate', purpose: 'Annual fund + capital campaign', years: 10 },
  ],
  margaretOnly: [
    { org: 'Nashville Symphony', amount: 'Moderate', purpose: 'Education program for underserved youth', years: 8 },
    { org: 'Doctors Without Borders', amount: 'Modest', purpose: 'General support — inspired by college roommate who served', years: 12 },
  ],
};

export const CHEN_INHERITANCE_VIEWS = {
  robert: {
    distribution: 'Equal — one-third to each child regardless of circumstances',
    timing: 'Children should receive full control at age 35',
    conditions: 'No conditions beyond age threshold',
    inheritanceReceived: 'Small inheritance from parents ($45K) — used for David\'s college fund',
  },
  margaret: {
    distribution: 'Adjusted for need — extra provision for James\'s family due to Oliver\'s care needs',
    timing: 'Staggered: 25% at 30, 50% at 35, remainder at 40. Exception: Oliver\'s trust immediately.',
    conditions: 'Trust for Oliver funded first; remaining estate divided with extra share to James',
    inheritanceReceived: 'None — first-generation college graduate, self-funded education',
  },
};

export const CHEN_CONCERNS = {
  robert: [
    { concern: 'Tax burden on children when inheriting retirement accounts', severity: 'High' },
    { concern: 'Market volatility reducing estate value before transfer', severity: 'Medium' },
    { concern: 'Ensuring Margaret is fully provided for if he passes first', severity: 'High' },
    { concern: 'Equal treatment perceived as fair by all three children', severity: 'High' },
  ],
  margaret: [
    { concern: 'Oliver\'s lifelong care and support after both parents gone', severity: 'High' },
    { concern: 'James and Mei feeling overwhelmed by Oliver\'s care costs', severity: 'High' },
    { concern: 'Family resentment if Oliver receives a larger share', severity: 'Medium' },
    { concern: 'Charitable commitments honored even if estate is smaller than expected', severity: 'Medium' },
    { concern: 'Lisa being single — does she need different provisions?', severity: 'Low' },
  ],
};

export const CHEN_DISCUSSION_POINTS = [
  {
    title: 'Distribution philosophy differs',
    detail: 'Robert insists on equal one-third splits. Margaret wants adjusted shares with extra provision for James\'s family due to Oliver\'s special needs. This is the primary area requiring facilitated conversation.',
  },
  {
    title: 'Charitable allocation gap',
    detail: 'Robert allocates 25% to charity; Margaret allocates 40%. Margaret\'s charitable interests are also broader (4 organizations vs. Robert\'s 2). They need to agree on a combined charitable strategy.',
  },
  {
    title: 'Special needs trust not reflected in Robert\'s priorities',
    detail: 'Margaret ranks Oliver\'s care as her #2 priority. Robert does not mention special needs in his top 5. He may not fully appreciate the long-term financial implications of Oliver\'s care.',
  },
  {
    title: 'Timing of inheritance control differs',
    detail: 'Robert wants full control at age 35. Margaret prefers a staggered approach (25% at 30, 50% at 35, full at 40). The staggered approach may better protect the special needs trust.',
  },
  {
    title: 'No existing charitable provisions in 2018 estate documents',
    detail: 'Current will and trust from 2018 (attorney William Bradford) contain no charitable provisions. Both spouses now want significant charitable giving — documents are significantly outdated.',
  },
];

// ─── AI Narrative Draft Content ──────────────────────────────────────────────

export const CHEN_NARRATIVE_HTML = `
<h2>Statement of Values &amp; Objectives</h2>
<p><em>Prepared for Robert &amp; Margaret Chen</em><br><em>Thompson &amp; Associates — March 2026</em></p>

<h2>Sources of Wealth &amp; Financial Background</h2>
<p>Robert and Margaret Chen have built their financial foundation through decades of professional careers in engineering and academia. Robert retired from Boeing after 32 years as a senior systems engineer, accumulating significant retirement assets through the company's 401(k) plan. Margaret spent her career as a professor of English at Vanderbilt University, building retirement savings through the university's 403(b) program with TIAA. Together, their combined estate is valued at approximately $4.34 million, comprising retirement accounts, a jointly held brokerage portfolio, two properties, life insurance, and personal assets.</p>

<h2>Family Structure &amp; Beneficiaries</h2>
<p>The Chens have three adult children. David, 38, is a software engineer in San Francisco, married to Sarah, with two children: Emma (8) and Lucas (5). Lisa, 35, is single and works as a nonprofit program director in Nashville, living closest to her parents. James, 31, is a high school teacher in Knoxville, married to Mei, with one child: Oliver, age 3, who has been diagnosed on the autism spectrum and will likely require lifelong support and therapy.</p>
<p>Oliver's needs are a central consideration in Margaret's planning priorities. She has expressed that ensuring Oliver's care is adequately funded — both during James and Mei's lifetimes and beyond — is her second highest priority after charitable giving.</p>

<h2>Allocation Preferences</h2>
<p>Robert and Margaret have expressed differing perspectives on estate allocation. Robert prefers 55% to family, 25% to charity, and 20% reserved for taxes. Margaret prefers an equal split between family and charity at 40% each, with 20% for taxes. This divergence — particularly the gap between 25% and 40% charitable allocation — represents a key area for facilitated discussion.</p>

<h2>Goals &amp; Priorities</h2>
<p>Robert's priorities center on equal inheritance for all three children, tax-efficient transfer strategies, and charitable support for Vanderbilt University. He views fairness as equal distribution regardless of individual circumstances. Margaret's priorities begin with charitable giving across multiple organizations, followed by special needs provision for Oliver, need-adjusted inheritance, education funding for all grandchildren, and tax minimization. Margaret views fairness as responsive to each child's actual situation.</p>

<h2>Inheritance &amp; Control</h2>
<p>Robert favors straightforward distribution with children receiving full control of their inheritance at age 35. He received a small inheritance from his parents ($45,000), which he used to fund David's college education. Margaret, a first-generation college graduate who self-funded her education, prefers a staggered approach: 25% at age 30, 50% at 35, and the remainder at 40, with Oliver's special needs trust funded immediately and separately from the general estate.</p>

<h2>Charitable Intentions</h2>
<p>Both Robert and Margaret support Vanderbilt University, where they envision a scholarship endowment benefiting the English and Engineering departments — reflecting both of their professional backgrounds. They have supported Vanderbilt for 15 years. Both also support the Nashville Humane Association, contributing to its annual fund and capital campaign over the past decade.</p>
<p>Margaret additionally supports the Nashville Symphony's education program for underserved youth (8 years) and Doctors Without Borders, inspired by a college roommate who served with the organization. These additional commitments contribute to the gap between her 40% charitable allocation and Robert's 25%.</p>

<h2>Special Concerns &amp; Considerations</h2>
<p>Robert's primary concerns are the tax burden on children inheriting retirement accounts, market volatility, ensuring Margaret is fully provided for, and all three children perceiving their inheritance as fair. Margaret's concerns center on Oliver's lifelong care needs, the financial burden on James and Mei, potential family resentment over unequal distribution, and ensuring charitable commitments are honored regardless of estate size.</p>
<p>Notably, Robert does not include special needs provision in his top priorities, while Margaret ranks it second. This gap may indicate that Robert does not yet fully appreciate the long-term financial implications of Oliver's diagnosis, or that the couple has not yet had a detailed conversation about projected care costs.</p>

<h2>Current Estate Documents</h2>
<p>Robert and Margaret's existing estate documents — a will, durable power of attorney, and healthcare directive — were prepared in 2018 by attorney William Bradford of Bradford &amp; Associates. These documents contain no charitable provisions and do not address Oliver's special needs. Given the significant changes in the Chens' priorities and family circumstances since 2018, a comprehensive update is needed.</p>

<p><em>Respectfully prepared by Catherine Mercer, Senior Planning Consultant, Thompson &amp; Associates</em></p>
`.trim();

// ─── Source Annotations for AI Narrative ─────────────────────────────────────

export const CHEN_NARRATIVE_SOURCES = [
  { section: 'Sources of Wealth', source: 'Basic Info, Assets Worksheet' },
  { section: 'Family Structure', source: 'Basic Info, Concerns (Margaret)' },
  { section: 'Allocation Preferences', source: 'VBQ — Three-Box Allocation' },
  { section: 'Goals & Priorities', source: 'VBQ — Priority Rankings' },
  { section: 'Inheritance & Control', source: 'VBQ — Inheritance Views' },
  { section: 'Charitable Intentions', source: 'VBQ — Charitable Section' },
  { section: 'Special Concerns', source: 'Concerns Worksheet (both)' },
  { section: 'Current Estate Documents', source: 'Basic Info — Attorney' },
];

// ─── Review Checklist for AI Narrative ───────────────────────────────────────

export const CHEN_REVIEW_CHECKLIST = [
  { id: 'rc-1', text: 'Verified all facts match donor input', checked: false },
  { id: 'rc-2', text: 'Tone is appropriate and factual', checked: false },
  { id: 'rc-3', text: 'No AI elaboration beyond provided data', checked: false },
  { id: 'rc-4', text: 'Charitable intentions accurately represented', checked: false },
  { id: 'rc-5', text: 'Special concerns properly addressed', checked: false },
];

// ─── Data Quality Flags ──────────────────────────────────────────────────────

export const CHEN_DATA_FLAGS = {
  missing: [
    'Robert — beneficiary designation on IRA not specified',
    'Life insurance policy expiration dates not provided',
    'No long-term care insurance listed for either spouse',
  ],
  inconsistencies: [
    'Oliver\'s special needs mentioned in Margaret\'s concerns but not reflected in Robert\'s priority ranking',
    'Charitable allocation differs by 15 percentage points between spouses — requires reconciliation',
    '2018 estate documents have no charitable provisions despite both spouses now prioritizing giving',
  ],
};
