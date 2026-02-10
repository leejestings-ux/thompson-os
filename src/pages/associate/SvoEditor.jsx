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
} from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import Button from '../../components/shared/Button';
import { getDonor, getOrganization, getSvoDraft } from '../../lib/mockData';
import { getIntakeData } from '../../lib/donorMockData';
import { concernCategories } from '../../lib/donorMockData';

// ─── Expanded SVO Content (~800 words) ──────────────────────────────────────

const FULL_SVO_HTML = `
<h2>Statement of Values &amp; Objectives</h2>
<p><em>Prepared for Richard &amp; Anne Holloway</em><br><em>Thompson &amp; Associates — February 2025</em></p>

<h2>Sources of Wealth</h2>
<p>Richard and Anne Holloway have built their financial foundation through decades of disciplined entrepreneurship and careful stewardship. Richard founded Holloway Manufacturing in 1986 after completing his seminary education at Midwest Seminary. What began as a small machine shop in Terre Haute has grown into a thriving manufacturing operation employing 47 people in Indianapolis, now valued at approximately $4.2 million.</p>
<p>Beyond the business, the Holloways have accumulated a diversified portfolio of assets including their primary residence in Indianapolis ($880,000), a vacation property in Michigan ($400,000), investment accounts totaling $1.82 million across brokerage and managed accounts, and retirement savings of $640,000. Their total estimated estate value is approximately $8.82 million. Both Richard and Anne view their wealth not as a personal achievement but as a responsibility — a theme that permeates every aspect of their planning.</p>

<h2>Family &amp; Beneficiaries</h2>
<p>The Holloways have two adult sons: Michael (age 38) and David (age 35), both of whom are actively involved in the family business. Michael serves as Vice President of Operations and has expressed readiness to assume greater leadership. David manages the sales division and, while talented, is described by his parents as "still finding his footing" in the company hierarchy.</p>
<p>Richard and Anne are deeply concerned about maintaining family harmony through the transition. Anne noted that "the business could bring our boys closer together or tear them apart — and everything depends on how we handle this." They want a succession plan that respects both sons' contributions, provides clear roles and expectations, and protects the livelihoods of their 47 employees. Equal treatment of Michael and David is a non-negotiable priority, even as their roles in the business may differ.</p>

<h2>Goals &amp; Priorities</h2>
<p>The Holloways have articulated a clear hierarchy of priorities: family security first, followed by charitable impact, with tax efficiency serving as a tool rather than a goal. They want to ensure that Michael and David can sustain their current lifestyles, that the business continues to thrive under their leadership, and that the transition happens gradually over a 10-year period rather than as a sudden transfer.</p>
<p>Their estate planning goals include: establishing a structured buy-sell agreement for the business, creating income streams that support both their retirement and their charitable commitments, funding a permanent scholarship endowment at Midwest Seminary, and producing clear documentation that prevents future family disputes. Richard emphasized that "every decision should be written down so clearly that no lawyer needs to interpret it."</p>

<h2>Financial Independence</h2>
<p>Richard and Anne maintain a comfortable retirement lifestyle supported by business distributions, investment income, and retirement accounts. They have expressed moderate concern about market volatility and inflation, rating both as meaningful but not urgent worries. Their primary financial anxiety centers on the business transition period — specifically, whether the company's earnings will remain stable enough to fund the buy-sell agreement while maintaining distributions to the family.</p>
<p>We recommend modeling three scenarios with CRT payout rates of 4%, 5%, and 6% to determine the optimal balance between current income needs and long-term charitable impact. The Holloways' CPA, Mark Reynolds of Reynolds &amp; Associates, has been engaged to provide tax projections for each scenario.</p>

<h2>Charitable Intent</h2>
<p>The Holloways' charitable vision is specific, personal, and deeply rooted in their faith. They envision a named scholarship fund within Midwest Seminary's endowment, directed specifically toward first-generation seminary students from rural communities. Richard's own experience — growing up in rural Indiana and receiving the education that shaped his life — is the emotional core of this gift.</p>
<p>They have allocated approximately 35% of their estate to charitable purposes, which is above the typical range for families in their position. Anne expressed that "we have been given more than enough for our family — the rest should go back to the place that made Richard who he is." They prefer a permanent endowment over time-limited giving, wanting the scholarship to "outlast us by generations." They have explicitly excluded political organizations and advocacy groups from their charitable intent.</p>

<h2>Concerns &amp; Special Considerations</h2>
<p>Several concerns warrant careful attention in the planning process. The Holloways rated "preventing estate disputes among heirs" and "tax burden on estate and beneficiaries" as their highest-priority concerns. The business succession introduces complexity that requires coordination between estate planning, corporate law, and tax strategy.</p>
<p>Anne's involvement in all decisions is essential — Richard described her as his "full partner" who "often sees things I miss, especially about our sons." The plan must accommodate both spouses' perspectives and ensure that Anne's voice is reflected in every recommendation. Additionally, the Holloways have expressed anxiety about making decisions now that could negatively affect Michael and David's relationship in the future. This concern should guide how we frame options and present recommendations.</p>

<p><strong>Recommended Approach:</strong> A three-phase plan addressing business succession (Phase 1), charitable remainder trust funded with non-business assets (Phase 2), and directed scholarship fund creation (Phase 3). Detailed illustrations for each phase will be prepared for review at the next meeting.</p>

<p><em>Respectfully prepared by Catherine Mercer, Senior Planning Consultant, Thompson &amp; Associates</em></p>
`.trim();

// ─── Review Checklist Items ─────────────────────────────────────────────────

const INITIAL_CHECKLIST = [
  { id: 1, severity: 'warning', text: 'Allocation percentages total 95% — verify with donor', checked: false },
  { id: 2, severity: 'warning', text: 'Special needs child listed but no corresponding concern flagged', checked: false },
  { id: 3, severity: 'info', text: 'Donor expressed anxiety about financial independence — consider emphasizing in Goals section', checked: false },
  { id: 4, severity: 'info', text: 'Charitable intent is 40% — above average. Verify this aligns with family obligations', checked: false },
  { id: 5, severity: 'warning', text: 'No life insurance listed in assets — common oversight for this profile', checked: false },
  { id: 6, severity: 'info', text: 'Both sons involved in business — consider individual conversations re: expectations', checked: false },
  { id: 7, severity: 'warning', text: 'CPA coordination pending — tax projections needed before finalizing CRT payout rate', checked: false },
];

// ─── Collapsible Section ────────────────────────────────────────────────────

function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 py-3 px-4 text-xs font-semibold text-navy uppercase tracking-wider hover:bg-slate-50 transition-colors"
      >
        {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {title}
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-xs font-medium text-charcoal text-right max-w-[160px]">{value}</span>
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
      className={`p-1.5 rounded transition-colors ${
        active ? 'bg-navy/10 text-navy' : 'text-muted hover:text-charcoal hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center gap-0.5 px-3 py-2 border-b border-border bg-white">
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

// ─── Main Component ─────────────────────────────────────────────────────────

export default function SvoEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const donor = getDonor(id);
  const npo = donor ? getOrganization(donor.npoId) : null;
  const intake = donor ? getIntakeData(donor.id) : null;
  const svoDraft = donor ? getSvoDraft(donor.id) : null;

  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState(null);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [version, setVersion] = useState(3);
  const [lastSaved, setLastSaved] = useState('2 minutes ago');

  const editor = useEditor({
    extensions: [StarterKit],
    content: FULL_SVO_HTML,
  });

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      if (editor) editor.commands.setContent(FULL_SVO_HTML);
      setGenerating(false);
      showToast('SVO draft generated successfully');
    }, 2000);
  };

  const handleSave = () => {
    setVersion((v) => v + 1);
    setLastSaved('just now');
    showToast('Draft saved');
  };

  const handleMarkFinal = () => {
    setShowFinalModal(false);
    showToast('SVO marked as final');
  };

  const handleRegenerate = () => {
    setShowRegenModal(false);
    handleGenerate();
  };

  const toggleCheck = (itemId) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const openCount = checklist.filter((c) => !c.checked).length;

  if (!donor) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <p className="text-muted">Donor not found</p>
      </div>
    );
  }

  // ── Intake data for left panel ──
  const concerns = intake?.concerns;
  const assets = intake?.assets;
  const basicInfo = intake?.basicInfo;
  const vbq = intake?.vbqResponses;

  // Parse children count from basic info string
  const childrenStr = basicInfo?.['Children'] || '';
  const childrenCount = childrenStr ? childrenStr.split(',').length : 0;

  // Get medium/high concerns
  const medHighConcerns = [];
  if (concerns?.ratings) {
    concernCategories.forEach((cat) => {
      const items = cat.items.filter(
        (item) => concerns.ratings[item.id] >= 4
      );
      if (items.length > 0) {
        medHighConcerns.push({ category: cat.name, items });
      }
    });
  }

  // Asset totals
  const assetTotal = assets
    ? assets.reduce((sum, a) => sum + a.totalValue, 0)
    : 0;

  return (
    <div className="h-screen flex flex-col bg-warm-white overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="shrink-0 h-14 bg-white border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/associate/donor/${id}`)}
            className="text-muted hover:text-charcoal transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-navy">{donor.name}</h1>
            {npo && (
              <span className="text-xs text-muted">{npo.name}</span>
            )}
            <StatusBadge state={donor.workflowState} />
          </div>
        </div>
        <Button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2"
        >
          {generating ? (
            <>
              <RefreshCw size={14} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Generate SVO
            </>
          )}
        </Button>
      </header>

      {/* ── Three-Panel Layout ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── LEFT PANEL: Donor Inputs ── */}
        <aside className="w-[300px] shrink-0 bg-white border-r border-border overflow-y-auto">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-xs font-semibold text-navy uppercase tracking-wider">
              Donor Inputs
            </p>
          </div>

          <CollapsibleSection title="Personal Info">
            {basicInfo ? (
              <div className="space-y-0.5">
                <InfoRow label="Name" value={basicInfo['Full Name']} />
                <InfoRow label="DOB" value={basicInfo['Date of Birth']} />
                <InfoRow label="Spouse" value={basicInfo['Spouse'] || 'N/A'} />
                <InfoRow label="Children" value={`${childrenCount} listed`} />
                <InfoRow label="Occupation" value={basicInfo['Occupation']} />
                <InfoRow label="Phone" value={basicInfo['Phone']} />
              </div>
            ) : (
              <p className="text-xs text-muted">No intake data</p>
            )}
          </CollapsibleSection>

          <CollapsibleSection title="VBQ Highlights">
            {vbq ? (
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                    Source of Wealth
                  </p>
                  <p className="text-xs text-charcoal leading-relaxed">
                    {vbq[1]?.substring(0, 120)}...
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                    Allocation Priority
                  </p>
                  <p className="text-xs text-charcoal leading-relaxed">
                    {vbq[13]}
                  </p>
                </div>
                {concerns?.allocation && (
                  <div>
                    <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1.5">
                      Three-Box Allocation
                    </p>
                    <div className="flex gap-2">
                      {[
                        { k: 'family', label: 'Family', color: 'bg-navy' },
                        { k: 'charity', label: 'Charity', color: 'bg-emerald-500' },
                        { k: 'reserve', label: 'Reserve', color: 'bg-amber-500' },
                      ].map(({ k, label, color }) => (
                        <div key={k} className="flex-1 text-center">
                          <div className={`h-1.5 rounded-full ${color} mb-1`} style={{ width: `${concerns.allocation[k]}%` }} />
                          <p className="text-[10px] font-semibold text-charcoal">
                            {concerns.allocation[k]}%
                          </p>
                          <p className="text-[10px] text-muted">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                    Top Goals
                  </p>
                  <p className="text-xs text-charcoal leading-relaxed">
                    {vbq[6]?.substring(0, 100)}...
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                    Financial Independence
                  </p>
                  <p className="text-xs text-charcoal leading-relaxed">
                    {vbq[15]?.substring(0, 100) || 'Moderate concern about maintaining retirement income'}...
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                    Charitable Intent
                  </p>
                  <p className="text-xs text-charcoal leading-relaxed">
                    {vbq[2]?.substring(0, 120)}...
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted">No VBQ responses</p>
            )}
          </CollapsibleSection>

          <CollapsibleSection title="Concerns (Medium / High)">
            {medHighConcerns.length > 0 ? (
              <div className="space-y-3">
                {medHighConcerns.map((group) => (
                  <div key={group.category}>
                    <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mb-1">
                      {group.category}
                    </p>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-2">
                          <span
                            className={`shrink-0 mt-0.5 text-[10px] font-bold px-1.5 py-0 rounded-full ${
                              concerns.ratings[item.id] >= 5
                                ? 'bg-red-50 text-red-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}
                          >
                            {concerns.ratings[item.id] >= 5 ? 'High' : 'Med'}
                          </span>
                          <p className="text-xs text-charcoal leading-snug">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted">No medium or high concerns</p>
            )}
          </CollapsibleSection>

          <CollapsibleSection title="Assets Summary">
            {assets ? (
              <div className="space-y-1.5">
                {assets.map((a) => (
                  <div key={a.category} className="flex justify-between">
                    <span className="text-xs text-muted">{a.category}</span>
                    <span className="text-xs font-medium text-charcoal">
                      ${(a.totalValue / 1000000).toFixed(2)}M
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 mt-2 border-t border-border/50">
                  <span className="text-xs font-semibold text-navy">
                    Grand Total
                  </span>
                  <span className="text-xs font-bold text-navy">
                    ${(assetTotal / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted">No asset data</p>
            )}
          </CollapsibleSection>
        </aside>

        {/* ── CENTER PANEL: Editor ── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Toolbar editor={editor} />
          <div className="flex-1 overflow-y-auto bg-white">
            <EditorContent editor={editor} />
          </div>
          {/* Footer */}
          <div className="shrink-0 px-4 py-3 border-t border-border bg-white flex items-center justify-between">
            <p className="text-xs text-muted">
              Version {version} — Last saved {lastSaved}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleSave}>
                Save Draft
              </Button>
              <Button onClick={() => setShowFinalModal(true)}>
                Mark as Final
              </Button>
            </div>
          </div>
        </main>

        {/* ── RIGHT PANEL: Review Checklist ── */}
        <aside className="w-[280px] shrink-0 bg-white border-l border-border overflow-y-auto">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <p className="text-xs font-semibold text-navy uppercase tracking-wider">
              Issues &amp; Flags
            </p>
            {openCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                {openCount}
              </span>
            )}
          </div>

          <div className="divide-y divide-border/50">
            {checklist.map((item) => (
              <div
                key={item.id}
                className={`px-4 py-3 flex items-start gap-3 transition-opacity ${
                  item.checked ? 'opacity-40' : ''
                }`}
              >
                <button
                  onClick={() => toggleCheck(item.id)}
                  className={`shrink-0 mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                    item.checked
                      ? 'bg-navy border-navy'
                      : 'border-slate-300 hover:border-navy/40'
                  }`}
                >
                  {item.checked && (
                    <Check size={10} className="text-white" />
                  )}
                </button>
                <div className="flex items-start gap-2 min-w-0">
                  {item.severity === 'warning' ? (
                    <AlertTriangle size={14} className="shrink-0 mt-0.5 text-amber-500" />
                  ) : (
                    <Info size={14} className="shrink-0 mt-0.5 text-blue-400" />
                  )}
                  <p
                    className={`text-xs leading-relaxed ${
                      item.checked
                        ? 'line-through text-muted'
                        : 'text-charcoal'
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Regenerate */}
          <div className="p-4 border-t border-border">
            <button
              onClick={() => setShowRegenModal(true)}
              className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={14} />
              Regenerate Draft
            </button>
          </div>
        </aside>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-lg animate-[fadeIn_0.2s_ease-out] z-50">
          {toast}
        </div>
      )}

      {/* ── Mark as Final Modal ── */}
      {showFinalModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-border p-6 w-full max-w-sm shadow-xl animate-[fadeIn_0.15s_ease-out]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-navy">
                Mark as Final?
              </h3>
              <button
                onClick={() => setShowFinalModal(false)}
                className="text-muted hover:text-charcoal transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
              This will lock the SVO draft and mark it ready for delivery to the
              donor. You can still make changes later by reopening the draft.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setShowFinalModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleMarkFinal}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── Regenerate Confirmation Modal ── */}
      {showRegenModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-border p-6 w-full max-w-sm shadow-xl animate-[fadeIn_0.15s_ease-out]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-navy">
                Regenerate Draft?
              </h3>
              <button
                onClick={() => setShowRegenModal(false)}
                className="text-muted hover:text-charcoal transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
              This will replace the current draft with a newly generated version.
              Any unsaved edits will be lost. Continue?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setShowRegenModal(false)}
              >
                Cancel
              </Button>
              <button
                onClick={handleRegenerate}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
