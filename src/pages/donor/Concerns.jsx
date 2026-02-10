import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorShell from '../../components/donor/DonorShell';
import AutoSaveIndicator from '../../components/donor/AutoSaveIndicator';
import Button from '../../components/shared/Button';

const CONCERN_CATEGORIES = [
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
    name: 'Health & Disability',
    items: [
      { id: 7, text: 'Long-term care costs and coverage' },
      { id: 8, text: 'Cognitive decline and decision-making capacity' },
      { id: 9, text: 'End-of-life medical decisions' },
      { id: 10, text: 'Rising healthcare costs in retirement' },
    ],
  },
  {
    name: 'Tax',
    items: [
      { id: 11, text: 'Market volatility affecting estate value' },
      { id: 12, text: 'Inflation eroding purchasing power' },
      { id: 13, text: 'Tax burden on estate and beneficiaries' },
      { id: 14, text: 'Outstanding debts or obligations' },
      { id: 15, text: 'Maintaining adequate retirement income' },
    ],
  },
  {
    name: 'Creditor Protection',
    items: [
      { id: 16, text: 'Ensuring charitable gifts create lasting impact' },
      { id: 17, text: 'Name recognition vs. anonymous giving preferences' },
      { id: 18, text: 'Perpetuity of charitable commitments' },
      { id: 19, text: 'Preserving family values across generations' },
    ],
  },
  {
    name: 'Post-Death',
    items: [
      { id: 20, text: 'Alignment of estate plan with faith principles' },
      { id: 21, text: 'Stewardship responsibilities' },
      { id: 22, text: 'Supporting faith-based institutions' },
    ],
  },
  {
    name: 'Giving',
    items: [
      { id: 23, text: 'Impact on local community organizations' },
      { id: 24, text: 'Access to education for underserved populations' },
      { id: 25, text: 'Environmental conservation efforts' },
      { id: 26, text: 'Cultural preservation and heritage' },
    ],
  },
];

const LEVELS = ['None', 'Low', 'Medium', 'High'];
const LEVEL_COLORS = {
  None: 'bg-slate-100 text-slate-500',
  Low: 'bg-blue-50 text-blue-700',
  Medium: 'bg-amber-50 text-amber-700',
  High: 'bg-red-50 text-red-700',
};

export default function Concerns() {
  const navigate = useNavigate();
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [ratings, setRatings] = useState({});
  const [allocation, setAllocation] = useState({
    heirs: 34,
    taxes: 33,
    charity: 33,
  });

  const setRating = useCallback((id, level) => {
    setRatings((prev) => ({ ...prev, [id]: level }));
    setSaveTrigger((n) => n + 1);
  }, []);

  const setAlloc = useCallback((key, raw) => {
    const val = Math.max(0, Math.min(100, Number(raw) || 0));
    setAllocation((prev) => ({ ...prev, [key]: val }));
    setSaveTrigger((n) => n + 1);
  }, []);

  const allocTotal = allocation.heirs + allocation.taxes + allocation.charity;
  const allocValid = allocTotal === 100;
  const answeredCount = Object.keys(ratings).length;
  const totalItems = CONCERN_CATEGORIES.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  return (
    <DonorShell showBack backTo="/donor/intake">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-navy tracking-tight">
            Personal Concerns
          </h1>
          <p className="text-sm text-muted mt-1">
            Rate each concern based on how important it is to you.
          </p>
        </div>
        <AutoSaveIndicator trigger={saveTrigger} />
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-muted font-medium">
          {answeredCount} of {totalItems} answered
        </p>
        <p className="text-xs font-semibold text-navy">
          {Math.round((answeredCount / totalItems) * 100)}%
        </p>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-navy rounded-full transition-all duration-500"
          style={{
            width: `${(answeredCount / totalItems) * 100}%`,
          }}
        />
      </div>

      {/* Concern Categories */}
      <div className="space-y-6">
        {CONCERN_CATEGORIES.map((category) => (
          <section
            key={category.name}
            className="bg-white rounded-xl border border-border overflow-hidden"
          >
            <div className="px-5 py-3 bg-slate-50 border-b border-border">
              <h2 className="text-sm font-semibold text-navy">
                {category.name}
              </h2>
            </div>
            <div className="divide-y divide-border/50">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
                >
                  <p className="text-sm text-charcoal flex-1 leading-relaxed">
                    {item.text}
                  </p>
                  <div className="flex gap-1.5 shrink-0">
                    {LEVELS.map((level) => (
                      <button
                        key={level}
                        onClick={() => setRating(item.id, level)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-full transition-colors ${
                          ratings[item.id] === level
                            ? LEVEL_COLORS[level]
                            : 'bg-white text-muted border border-border hover:border-navy/20'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ── Three Boxes Allocation ── */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-navy mb-1">
          Three-Box Allocation
        </h2>
        <p className="text-sm text-muted mb-6">
          If your estate were divided into three boxes, what percentage would you
          place in each? The total must equal 100%.
        </p>

        <div className="bg-white rounded-xl border border-border p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                key: 'heirs',
                label: 'Heirs',
                desc: 'Family & beneficiaries',
                color: 'text-navy',
                bg: 'bg-navy/5',
                ring: 'ring-navy/20',
              },
              {
                key: 'taxes',
                label: 'Taxes',
                desc: 'Government obligations',
                color: 'text-amber-600',
                bg: 'bg-amber-50',
                ring: 'ring-amber-200',
              },
              {
                key: 'charity',
                label: 'Charity',
                desc: 'Charitable giving',
                color: 'text-emerald-600',
                bg: 'bg-emerald-50',
                ring: 'ring-emerald-200',
              },
            ].map(({ key, label, desc, color, bg, ring }) => (
              <div key={key} className="text-center">
                <div
                  className={`${bg} rounded-xl p-5 ring-1 ${ring} mb-3`}
                >
                  <p className={`text-3xl font-bold ${color}`}>
                    {allocation[key]}%
                  </p>
                </div>
                <p className={`text-sm font-semibold ${color}`}>{label}</p>
                <p className="text-xs text-muted mt-0.5">{desc}</p>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={allocation[key]}
                  onChange={(e) => setAlloc(key, e.target.value)}
                  className="w-full mt-3 h-2 rounded-full appearance-none cursor-pointer accent-navy"
                />
              </div>
            ))}
          </div>

          <div
            className={`mt-6 pt-4 border-t border-border/50 flex items-center justify-between ${
              allocValid ? 'text-emerald-600' : 'text-amber-600'
            }`}
          >
            <span className="text-sm font-medium">
              Total: {allocTotal}%
            </span>
            {allocValid ? (
              <span className="text-xs font-medium">
                Balanced
              </span>
            ) : (
              <span className="text-xs font-medium">
                Must equal 100%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Button variant="ghost" onClick={() => navigate('/donor/intake')}>
          Save &amp; Exit
        </Button>
        <Button onClick={() => navigate('/donor/intake/assets')}>
          Save &amp; Continue
        </Button>
      </div>
    </DonorShell>
  );
}
