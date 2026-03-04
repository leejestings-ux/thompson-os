import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  AlertTriangle,
  Info,
  Check,
  RefreshCw,
  Sparkles,
  X,
  Send,
  Users,
  FileText,
  AlertCircle,
  CheckCircle2,
  Settings2,
} from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import Button from '../../components/shared/Button';
import { getDonor, getOrganization } from '../../lib/mockData';
import {
  CHEN_BASIC,
  CHEN_CHILDREN,
  CHEN_ASSETS,
  CHEN_PRIORITIES,
  CHEN_ALLOCATION,
  CHEN_CHARITABLE,
  CHEN_INHERITANCE_VIEWS,
  CHEN_CONCERNS,
  CHEN_DISCUSSION_POINTS,
  CHEN_NARRATIVE_HTML,
  CHEN_NARRATIVE_SOURCES,
  CHEN_REVIEW_CHECKLIST,
  CHEN_DATA_FLAGS,
} from '../../lib/chenMockData';

// ─── Collapsible Section ────────────────────────────────────────────────────

function Collapsible({ title, defaultOpen = true, badge, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 py-3 px-4 text-xs font-semibold text-navy uppercase tracking-wider hover:bg-slate-50/80 transition-all duration-150"
      >
        <span className={`transition-transform duration-200 ${open ? 'rotate-0' : '-rotate-90'}`}>
          <ChevronDown size={14} />
        </span>
        <span className="flex-1 text-left">{title}</span>
        {badge}
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4">{children}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div className={`flex justify-between py-1 ${highlight ? 'bg-amber-50/60 -mx-1 px-1 rounded' : ''}`}>
      <span className="text-xs text-muted">{label}</span>
      <span className="text-xs font-medium text-charcoal text-right max-w-[180px]">{value}</span>
    </div>
  );
}

// ─── Editor Toolbar ─────────────────────────────────────────────────────────

function Toolbar({ editor }) {
  if (!editor) return null;
  const btn = (active, onClick, children, title) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded transition-all duration-150 ${
        active ? 'bg-teal/10 text-teal' : 'text-muted hover:text-charcoal hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  );
  return (
    <div className="flex items-center gap-0.5 px-4 py-2 border-b border-border bg-white/80 backdrop-blur-sm">
      {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <Bold size={16} />, 'Bold')}
      {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <Italic size={16} />, 'Italic')}
      <div className="w-px h-5 bg-border mx-1" />
      {btn(editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 size={16} />, 'Heading 2')}
      {btn(editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 size={16} />, 'Heading 3')}
      <div className="w-px h-5 bg-border mx-1" />
      {btn(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), <List size={16} />, 'Bullet List')}
      {btn(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered size={16} />, 'Ordered List')}
      <div className="w-px h-5 bg-border mx-1" />
      {btn(false, () => editor.chain().focus().undo().run(), <Undo2 size={16} />, 'Undo')}
      {btn(false, () => editor.chain().focus().redo().run(), <Redo2 size={16} />, 'Redo')}
    </div>
  );
}

// ─── Restatement: Comparison Row ────────────────────────────────────────────

function ComparisonRow({ label, robertValue, margaretValue, differs }) {
  return (
    <tr className={differs ? 'bg-[#D6BA7B]/[0.12]' : ''}>
      <td className="py-2 px-3 text-xs font-medium text-navy border-b border-border/40 w-[30%]">{label}</td>
      <td className="py-2 px-3 text-xs text-charcoal border-b border-border/40 border-l border-border/30 w-[35%]">{robertValue}</td>
      <td className="py-2 px-3 text-xs text-charcoal border-b border-border/40 border-l border-border/30 w-[35%]">{margaretValue}</td>
    </tr>
  );
}

function SectionHeader({ title }) {
  return (
    <tr>
      <td colSpan={3} className="bg-slate-50 py-2 px-3 border-b border-border/40">
        <span className="text-[11px] font-bold text-navy uppercase tracking-wider">{title}</span>
      </td>
    </tr>
  );
}

// ─── Restatement View ───────────────────────────────────────────────────────

function RestatementView() {
  return (
    <div className="max-w-[820px] mx-auto my-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-t-lg border border-border/50 px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif text-navy">Restatement — Robert &amp; Margaret Chen</h2>
            <p className="text-xs text-muted mt-0.5">Structured reorganization of donor input data</p>
          </div>
          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide">
            Instant Delivery
          </span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border-x border-border/50 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2.5 px-3 text-[10px] font-bold text-muted uppercase tracking-wider w-[30%]">Category</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-navy uppercase tracking-wider border-l border-border/30 w-[35%]">Robert Chen</th>
              <th className="py-2.5 px-3 text-[10px] font-bold text-navy uppercase tracking-wider border-l border-border/30 w-[35%]">Margaret Chen</th>
            </tr>
          </thead>
          <tbody>
            {/* Names & Family */}
            <SectionHeader title="Names & Family Structure" />
            <ComparisonRow label="Age" robertValue="67" margaretValue="64" />
            <ComparisonRow label="Occupation" robertValue="Retired Engineer (Boeing)" margaretValue="Retired Professor (Vanderbilt)" />
            <ComparisonRow label="Children" robertValue="David (38), Lisa (35), James (31)" margaretValue="David (38), Lisa (35), James (31)" />
            <ComparisonRow label="Grandchildren" robertValue="Emma (8), Lucas (5), Oliver (3)" margaretValue="Emma (8), Lucas (5), Oliver (3, special needs)" differs />
            <ComparisonRow label="Married Since" robertValue="1985" margaretValue="1985" />

            {/* Current Estate */}
            <SectionHeader title="Current Estate Situation" />
            <ComparisonRow label="Existing Documents" robertValue="Will, POA, Healthcare Dir." margaretValue="Will, POA, Healthcare Dir." />
            <ComparisonRow label="Year Executed" robertValue="2018" margaretValue="2018" />
            <ComparisonRow label="Attorney" robertValue="William Bradford" margaretValue="William Bradford" />
            <ComparisonRow label="Charitable Provisions" robertValue="None in current docs" margaretValue="None in current docs" />

            {/* Sources of Wealth */}
            <SectionHeader title="Sources of Wealth & Financial Background" />
            <ComparisonRow label="Primary Source" robertValue="Boeing career (32 yrs)" margaretValue="Vanderbilt career" />
            <ComparisonRow label="Retirement Accounts" robertValue="401(k): $890K, IRA: $245K" margaretValue="403(b): $410K, Roth IRA: $185K" />
            <ComparisonRow label="Inheritance Received" robertValue="$45K from parents" margaretValue="None — first-gen college grad" differs />

            {/* Allocation Preferences */}
            <SectionHeader title="Allocation Preferences" />
            <ComparisonRow label="To Family" robertValue="55%" margaretValue="40%" differs />
            <ComparisonRow label="To Charity" robertValue="25%" margaretValue="40%" differs />
            <ComparisonRow label="Tax Reserve" robertValue="20%" margaretValue="20%" />

            {/* Ranked Priorities */}
            <SectionHeader title="Ranked Goals & Priorities" />
            {CHEN_PRIORITIES.robert.map((r, i) => (
              <ComparisonRow
                key={i}
                label={`#${r.rank}`}
                robertValue={r.label}
                margaretValue={CHEN_PRIORITIES.margaret[i].label}
                differs={r.label !== CHEN_PRIORITIES.margaret[i].label}
              />
            ))}

            {/* Inheritance Views */}
            <SectionHeader title="Views on Control, Heirs & Independence" />
            <ComparisonRow label="Distribution" robertValue="Equal — 1/3 each" margaretValue="Adjusted for need — extra for James" differs />
            <ComparisonRow label="Control Timing" robertValue="Full control at 35" margaretValue="Staggered: 25% at 30, 50% at 35, full at 40" differs />
            <ComparisonRow label="Conditions" robertValue="Age threshold only" margaretValue="Oliver's trust funded immediately" differs />

            {/* Charitable */}
            <SectionHeader title="Charitable Intentions & Values" />
            <ComparisonRow label="Vanderbilt University" robertValue="Yes — 15 years" margaretValue="Yes — 15 years" />
            <ComparisonRow label="Nashville Humane Assoc." robertValue="Yes — 10 years" margaretValue="Yes — 10 years" />
            <ComparisonRow label="Nashville Symphony" robertValue="—" margaretValue="Yes — 8 years" differs />
            <ComparisonRow label="Doctors Without Borders" robertValue="—" margaretValue="Yes — 12 years" differs />

            {/* Concerns */}
            <SectionHeader title="Special Concerns & Considerations" />
            <ComparisonRow label="Top Concern" robertValue="Tax burden on children" margaretValue="Oliver's lifelong care" differs />
            <ComparisonRow label="Second Concern" robertValue="Market volatility" margaretValue="James & Mei overwhelmed by costs" differs />
            <ComparisonRow label="Family Worry" robertValue="Equal treatment seen as fair" margaretValue="Resentment over unequal shares" differs />
          </tbody>
        </table>
      </div>

      {/* Key Discussion Points */}
      <div className="bg-white border border-border/50 rounded-b-lg px-6 py-5 shadow-sm">
        <h3 className="text-sm font-serif font-semibold text-navy mb-3 flex items-center gap-2">
          <AlertCircle size={15} className="text-amber-500" />
          Key Discussion Points
        </h3>
        <div className="space-y-3">
          {CHEN_DISCUSSION_POINTS.map((point, i) => (
            <div key={i} className="flex gap-3">
              <span className="shrink-0 w-5 h-5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold flex items-center justify-center border border-amber-200 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-semibold text-navy">{point.title}</p>
                <p className="text-xs text-charcoal/70 leading-relaxed mt-0.5">{point.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── AI Narrative View ──────────────────────────────────────────────────────

function NarrativeView({ editor }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 animate-fadeIn">
      {/* Status badge */}
      <div className="flex items-center justify-center py-3 bg-amber-50/50 border-b border-amber-100">
        <span className="text-[11px] font-semibold text-amber-700 flex items-center gap-1.5">
          <AlertTriangle size={12} />
          Draft — Pending Associate Review
        </span>
      </div>

      <Toolbar editor={editor} />

      <div className="flex-1 overflow-y-auto bg-[#F5F5F0]">
        {/* Source annotations sidebar */}
        <div className="max-w-[820px] mx-auto my-6 flex gap-4">
          {/* Source column */}
          <div className="hidden xl:block w-[120px] shrink-0 pt-[88px] space-y-[72px]">
            {CHEN_NARRATIVE_SOURCES.map((s, i) => (
              <div key={i} className="text-right">
                <p className="text-[9px] font-semibold text-muted/60 uppercase tracking-wide leading-tight">{s.source}</p>
              </div>
            ))}
          </div>

          {/* Document */}
          <div className="flex-1 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] rounded border border-border/50">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function SvoEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const donor = getDonor(id);
  const npo = donor ? getOrganization(donor.npoId) : null;

  const [mode, setMode] = useState('restatement');
  const [reviewChecklist, setReviewChecklist] = useState(CHEN_REVIEW_CHECKLIST);
  const [svoDefault, setSvoDefault] = useState('both');
  const [donorOverride, setDonorOverride] = useState('default');
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState(null);
  const [status, setStatus] = useState('Draft');
  const [showDeliverModal, setShowDeliverModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: CHEN_NARRATIVE_HTML,
  });

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      if (editor) editor.commands.setContent(CHEN_NARRATIVE_HTML);
      setGenerating(false);
      showToast('AI Narrative draft generated');
    }, 2000);
  };

  const toggleReviewItem = (itemId) => {
    setReviewChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const allReviewChecked = reviewChecklist.every((item) => item.checked);
  const checkedCount = reviewChecklist.filter((c) => c.checked).length;
  const totalAssets = CHEN_ASSETS.reduce((sum, a) => sum + a.value, 0);

  if (!donor) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <p className="text-muted font-serif italic">Donor not found</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-warm-white overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="shrink-0 h-14 bg-white border-b border-border flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/associate/donor/${id}`)}
            className="text-muted hover:text-charcoal transition-all duration-150 hover:scale-110"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-serif font-semibold text-navy">{donor.name}</h1>
            {npo && <span className="text-xs text-muted">{npo.name}</span>}
            <StatusBadge state={donor.workflowState} />
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => setMode('restatement')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-all duration-200 ${
                mode === 'restatement'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-muted hover:text-charcoal'
              }`}
            >
              <Users size={14} />
              Restatement
            </button>
            <button
              onClick={() => setMode('narrative')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md transition-all duration-200 ${
                mode === 'narrative'
                  ? 'bg-white text-navy shadow-sm'
                  : 'text-muted hover:text-charcoal'
              }`}
            >
              <Sparkles size={14} />
              AI Narrative Draft
            </button>
          </div>
        </div>
      </header>

      {/* ── Three-Panel Layout ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── LEFT PANEL: Donor Input Data ── */}
        <aside className="hidden lg:flex w-[280px] shrink-0 bg-white border-r border-border flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border shrink-0">
            <p className="text-xs font-semibold text-navy font-serif uppercase tracking-wider">
              Donor Input Data
            </p>
            <p className="text-[10px] text-muted mt-0.5">VBQ + Basic Info + Assets</p>
          </div>

          <div className="flex-1 overflow-y-auto">
            <Collapsible title="Personal Info">
              <div className="space-y-0.5">
                <InfoRow label="Robert" value={`${CHEN_BASIC.robert.age}, ${CHEN_BASIC.robert.occupation.split('(')[0].trim()}`} />
                <InfoRow label="Margaret" value={`${CHEN_BASIC.margaret.age}, Professor (Vanderbilt)`} />
                <InfoRow label="Married" value={`Since ${CHEN_BASIC.marriedSince}`} />
                <InfoRow label="Address" value="Nashville, TN" />
                <InfoRow label="Attorney" value={CHEN_BASIC.previousAttorney.split(',')[0]} />
                <InfoRow label="Docs Date" value="2018 (outdated)" />
              </div>
            </Collapsible>

            <Collapsible title="Children & Grandchildren">
              <div className="space-y-2.5">
                {CHEN_CHILDREN.map((child) => (
                  <div key={child.name}>
                    <p className="text-xs font-medium text-charcoal">{child.name}, {child.age}</p>
                    <p className="text-[10px] text-muted">{child.status} · {child.city}</p>
                    {child.children.length > 0 && (
                      <p className="text-[10px] text-muted mt-0.5">
                        Children: {child.children.join(', ')}
                      </p>
                    )}
                    {child.notes && (
                      <p className="text-[10px] text-amber-600 font-medium mt-0.5">{child.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </Collapsible>

            <Collapsible title="Allocation (Three-Box)">
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5">Robert</p>
                  <div className="flex gap-2">
                    {Object.entries(CHEN_ALLOCATION.robert).map(([k, v]) => (
                      <div key={k} className="flex-1 text-center">
                        <div className="text-xs font-bold text-charcoal">{v}%</div>
                        <div className="text-[10px] text-muted capitalize">{k}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5">Margaret</p>
                  <div className="flex gap-2">
                    {Object.entries(CHEN_ALLOCATION.margaret).map(([k, v]) => (
                      <div key={k} className="flex-1 text-center">
                        <div className="text-xs font-bold text-charcoal">{v}%</div>
                        <div className="text-[10px] text-muted capitalize">{k}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Collapsible>

            <Collapsible title="Charitable Intent">
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">Shared</p>
                {CHEN_CHARITABLE.shared.map((c) => (
                  <div key={c.org}>
                    <p className="text-xs font-medium text-charcoal">{c.org}</p>
                    <p className="text-[10px] text-muted">{c.purpose} · {c.years} yrs</p>
                  </div>
                ))}
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mt-2">Margaret Only</p>
                {CHEN_CHARITABLE.margaretOnly.map((c) => (
                  <div key={c.org}>
                    <p className="text-xs font-medium text-charcoal">{c.org}</p>
                    <p className="text-[10px] text-muted">{c.purpose} · {c.years} yrs</p>
                  </div>
                ))}
              </div>
            </Collapsible>

            <Collapsible title="Concerns" defaultOpen={false}>
              <div className="space-y-2.5">
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider">Robert</p>
                {CHEN_CONCERNS.robert.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`shrink-0 text-[9px] font-bold px-1.5 rounded-full mt-0.5 ${
                      c.severity === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>{c.severity}</span>
                    <p className="text-xs text-charcoal leading-snug">{c.concern}</p>
                  </div>
                ))}
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mt-2">Margaret</p>
                {CHEN_CONCERNS.margaret.map((c, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className={`shrink-0 text-[9px] font-bold px-1.5 rounded-full mt-0.5 ${
                      c.severity === 'High' ? 'bg-red-50 text-red-700 border border-red-200'
                        : c.severity === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-50 text-slate-500 border border-slate-200'
                    }`}>{c.severity}</span>
                    <p className="text-xs text-charcoal leading-snug">{c.concern}</p>
                  </div>
                ))}
              </div>
            </Collapsible>

            <Collapsible title="Assets Summary" defaultOpen={false}>
              <div className="space-y-1">
                {CHEN_ASSETS.map((a) => (
                  <div key={a.category} className="flex justify-between py-0.5">
                    <span className="text-xs text-muted truncate mr-2">{a.category}</span>
                    <span className="text-xs font-medium text-charcoal shrink-0">
                      ${(a.value / 1000).toFixed(0)}K
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 mt-2 border-t border-border/50">
                  <span className="text-xs font-serif font-semibold text-navy">Total</span>
                  <span className="text-xs font-serif font-bold text-navy">
                    ${(totalAssets / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
            </Collapsible>
          </div>
        </aside>

        {/* ── CENTER PANEL ── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {mode === 'restatement' ? (
            <div className="flex-1 overflow-y-auto bg-[#F5F5F0]">
              <RestatementView />
              {/* Deliver button */}
              <div className="max-w-[820px] mx-auto mb-8 flex justify-center">
                <button
                  onClick={() => setShowDeliverModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#D6BA7B] text-[#1F2E45] font-semibold text-sm rounded-lg shadow-sm hover:bg-[#C5A566] transition-all duration-200 active:scale-95"
                >
                  <Send size={15} />
                  Deliver Restatement to Donor
                </button>
              </div>
            </div>
          ) : (
            <NarrativeView editor={editor} />
          )}

          {/* Footer — only for Narrative mode */}
          {mode === 'narrative' && (
            <div className="shrink-0 px-4 py-3 border-t border-border bg-white flex items-center justify-between">
              <p className="text-xs text-muted">
                Status: <span className="font-medium text-amber-600">{status}</span>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex items-center gap-1.5"
                >
                  <RefreshCw size={13} className={generating ? 'animate-spin' : ''} />
                  {generating ? 'Generating...' : 'Regenerate Draft'}
                </Button>
                <Button
                  onClick={() => setShowApproveModal(true)}
                  disabled={!allReviewChecked}
                  className={`flex items-center gap-1.5 ${allReviewChecked ? '' : 'opacity-50 cursor-not-allowed'}`}
                >
                  <Check size={14} />
                  Approve &amp; Finalize
                </Button>
              </div>
            </div>
          )}
        </main>

        {/* ── RIGHT PANEL ── */}
        <aside className="hidden lg:flex w-[260px] shrink-0 bg-white border-l border-border flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-border shrink-0">
            <p className="text-xs font-semibold text-navy font-serif uppercase tracking-wider">
              Controls &amp; Flags
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* SVO Mode Preferences */}
            <Collapsible title="SVO Mode Preferences" badge={<Settings2 size={12} className="text-muted" />}>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-semibold text-muted uppercase tracking-wider block mb-1">
                    My Default SVO Mode
                  </label>
                  <select
                    value={svoDefault}
                    onChange={(e) => setSvoDefault(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-teal"
                  >
                    <option value="restatement">Restatement Only</option>
                    <option value="narrative">AI Narrative Only</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-muted uppercase tracking-wider block mb-1">
                    Override for This Donor
                  </label>
                  <select
                    value={donorOverride}
                    onChange={(e) => setDonorOverride(e.target.value)}
                    className="w-full text-xs border border-slate-300 rounded px-2 py-1.5 focus:outline-none focus:border-teal"
                  >
                    <option value="default">Use My Default</option>
                    <option value="restatement">Restatement Only</option>
                    <option value="narrative">AI Narrative Only</option>
                    <option value="both">Both</option>
                  </select>
                </div>
              </div>
            </Collapsible>

            {/* Data Quality Flags */}
            <Collapsible
              title="Data Quality Flags"
              badge={
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                  {CHEN_DATA_FLAGS.missing.length + CHEN_DATA_FLAGS.inconsistencies.length}
                </span>
              }
            >
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <AlertCircle size={10} />
                    Missing Data ({CHEN_DATA_FLAGS.missing.length})
                  </p>
                  <div className="space-y-1.5">
                    {CHEN_DATA_FLAGS.missing.map((flag, i) => (
                      <p key={i} className="text-xs text-charcoal leading-snug pl-3 border-l-2 border-red-200">
                        {flag}
                      </p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <AlertTriangle size={10} />
                    Inconsistencies ({CHEN_DATA_FLAGS.inconsistencies.length})
                  </p>
                  <div className="space-y-1.5">
                    {CHEN_DATA_FLAGS.inconsistencies.map((flag, i) => (
                      <p key={i} className="text-xs text-charcoal leading-snug pl-3 border-l-2 border-amber-200">
                        {flag}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Collapsible>

            {/* Review Checklist — only visible in Narrative mode */}
            {mode === 'narrative' && (
              <Collapsible
                title="Review Checklist"
                badge={
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    allReviewChecked
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {checkedCount}/{reviewChecklist.length}
                  </span>
                }
              >
                <div className="space-y-2">
                  {reviewChecklist.map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-start gap-2.5 cursor-pointer group transition-opacity duration-200 ${
                        item.checked ? 'opacity-50' : ''
                      }`}
                    >
                      <button
                        onClick={() => toggleReviewItem(item.id)}
                        className={`shrink-0 mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                          item.checked
                            ? 'bg-teal border-teal'
                            : 'border-slate-300 group-hover:border-teal/40'
                        }`}
                      >
                        {item.checked && <Check size={10} className="text-white" />}
                      </button>
                      <span className={`text-xs leading-relaxed ${
                        item.checked ? 'line-through text-muted' : 'text-charcoal'
                      }`}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </Collapsible>
            )}

            {/* Status */}
            <Collapsible title="Status">
              <div className="space-y-2">
                {['Draft', 'Under Review', 'Approved', 'Delivered'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    {status === s ? (
                      <div className="w-3 h-3 rounded-full bg-teal ring-2 ring-teal/20" />
                    ) : ['Draft', 'Under Review', 'Approved', 'Delivered'].indexOf(s) < ['Draft', 'Under Review', 'Approved', 'Delivered'].indexOf(status) ? (
                      <CheckCircle2 size={12} className="text-emerald-500" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border-2 border-slate-200" />
                    )}
                    <span className={`text-xs ${status === s ? 'font-semibold text-navy' : 'text-muted'}`}>
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </Collapsible>

            {/* Generate Button */}
            {mode === 'narrative' && (
              <div className="p-4 border-t border-border">
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full px-4 py-2.5 text-sm font-medium rounded-md bg-slate-50 text-navy border border-border hover:bg-slate-100 transition-all duration-150 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-40"
                >
                  {generating ? (
                    <>
                      <RefreshCw size={14} className="animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      Generate AI Narrative
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-lg animate-fadeIn z-50">
          {toast}
        </div>
      )}

      {/* ── Deliver Restatement Modal ── */}
      {showDeliverModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-overlayFadeIn">
          <div className="bg-white rounded-xl border border-border p-6 w-full max-w-sm shadow-xl animate-modalFadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-serif text-navy">Deliver Restatement?</h3>
              <button onClick={() => setShowDeliverModal(false)} className="text-muted hover:text-charcoal transition-all duration-150 hover:rotate-90">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
              This will make the Restatement document available immediately in Robert &amp; Margaret Chen's Periscope Path portal. This contains their own reorganized input data — no professional analysis.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowDeliverModal(false)}>Cancel</Button>
              <button
                onClick={() => { setShowDeliverModal(false); setStatus('Delivered'); showToast('Restatement delivered to donor portal'); }}
                className="px-4 py-2 text-sm font-medium rounded-md bg-[#D6BA7B] text-[#1F2E45] hover:bg-[#C5A566] shadow-sm transition-all duration-150 active:scale-95"
              >
                Deliver Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Approve & Finalize Modal ── */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-overlayFadeIn">
          <div className="bg-white rounded-xl border border-border p-6 w-full max-w-sm shadow-xl animate-modalFadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-serif text-navy">Approve &amp; Finalize?</h3>
              <button onClick={() => setShowApproveModal(false)} className="text-muted hover:text-charcoal transition-all duration-150 hover:rotate-90">
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
              This will mark the AI Narrative draft as approved and ready for delivery. All review checklist items have been verified. You can still edit after approval.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowApproveModal(false)}>Cancel</Button>
              <Button onClick={() => { setShowApproveModal(false); setStatus('Approved'); showToast('AI Narrative approved and finalized'); }}>
                Approve
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
