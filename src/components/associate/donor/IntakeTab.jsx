import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  getIntakeData,
  vbqQuestions,
  concernCategories,
} from '../../../lib/donorMockData';

function AccordionSection({ title, completion, isOpen, onToggle, children }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-table-stripe/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isOpen ? (
            <ChevronDown size={16} className="text-navy" />
          ) : (
            <ChevronRight size={16} className="text-muted" />
          )}
          <h3 className="text-sm font-semibold text-charcoal">{title}</h3>
        </div>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
            completion === 100
              ? 'bg-emerald-50 text-emerald-700'
              : completion > 0
                ? 'bg-amber-50 text-amber-700'
                : 'bg-slate-100 text-slate-500'
          }`}
        >
          {completion}%
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-border p-4 bg-warm-white">
          {children}
        </div>
      )}
    </div>
  );
}

export default function IntakeTab({ donor }) {
  const intake = getIntakeData(donor.id);
  const [openSections, setOpenSections] = useState(['basicInfo']);

  function toggleSection(key) {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  if (!intake) {
    return (
      <div className="text-center py-12">
        <p className="text-muted text-sm">
          Intake has not been started for this donor.
        </p>
      </div>
    );
  }

  const completed = intake.completedSections || [];
  const pct = (key) => (completed.includes(key) ? 100 : 0);

  return (
    <div className="space-y-3">
      {/* Basic Info */}
      <AccordionSection
        title="Basic Information"
        completion={pct('basicInfo')}
        isOpen={openSections.includes('basicInfo')}
        onToggle={() => toggleSection('basicInfo')}
      >
        {intake.basicInfo ? (
          <dl className="space-y-0">
            {Object.entries(intake.basicInfo).map(([label, value]) => (
              <div
                key={label}
                className="py-2 border-b border-border/40 last:border-0"
              >
                <dt className="text-xs text-muted font-medium mb-0.5">
                  {label}
                </dt>
                <dd className="text-sm text-charcoal">{value || '\u2014'}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="text-sm text-muted">Not completed</p>
        )}
      </AccordionSection>

      {/* VBQ */}
      <AccordionSection
        title="Values-Based Questionnaire (VBQ)"
        completion={pct('vbq')}
        isOpen={openSections.includes('vbq')}
        onToggle={() => toggleSection('vbq')}
      >
        {intake.vbqResponses ? (
          <div className="space-y-4">
            {vbqQuestions.map((q) => (
              <div
                key={q.id}
                className="pb-3 border-b border-border/40 last:border-0"
              >
                <p className="text-xs text-muted font-medium mb-1">
                  Q{q.id}. {q.text}
                </p>
                <p className="text-sm text-charcoal leading-relaxed">
                  {intake.vbqResponses[q.id] || (
                    <span className="italic text-muted">No response</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">Not completed</p>
        )}
      </AccordionSection>

      {/* Personal Concerns */}
      <AccordionSection
        title="Personal Concerns"
        completion={pct('concerns')}
        isOpen={openSections.includes('concerns')}
        onToggle={() => toggleSection('concerns')}
      >
        {intake.concerns ? (
          <div className="space-y-6">
            {concernCategories.map((cat) => (
              <div key={cat.name}>
                <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">
                  {cat.name}
                </h4>
                <div className="space-y-1.5">
                  {cat.items.map((item) => {
                    const rating = intake.concerns.ratings[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-1.5 px-3 rounded bg-white"
                      >
                        <span className="text-sm text-charcoal">
                          {item.text}
                        </span>
                        <div className="flex items-center gap-1 shrink-0 ml-3">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              className={`w-2 h-2 rounded-full ${
                                n <= rating ? 'bg-navy' : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Three-box allocation */}
            <div>
              <h4 className="text-xs font-semibold text-navy uppercase tracking-wider mb-3">
                Estate Allocation
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Family', value: intake.concerns.allocation.family, color: 'bg-blue-500' },
                  { label: 'Charity', value: intake.concerns.allocation.charity, color: 'bg-emerald-500' },
                  { label: 'Reserve', value: intake.concerns.allocation.reserve, color: 'bg-amber-500' },
                ].map((box) => (
                  <div
                    key={box.label}
                    className="bg-white rounded-lg p-3 text-center border border-border"
                  >
                    <div
                      className={`w-3 h-3 rounded-full mx-auto mb-2 ${box.color}`}
                    />
                    <p className="text-2xl font-bold text-navy">{box.value}%</p>
                    <p className="text-xs text-muted font-medium">
                      {box.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">Not completed</p>
        )}
      </AccordionSection>

      {/* Assets */}
      <AccordionSection
        title="Assets"
        completion={pct('assets')}
        isOpen={openSections.includes('assets')}
        onToggle={() => toggleSection('assets')}
      >
        {intake.assets ? (
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white border-b border-border">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted uppercase tracking-wider">
                    Total Value
                  </th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted uppercase tracking-wider">
                    Items
                  </th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {intake.assets.map((asset, i) => (
                  <tr
                    key={asset.category}
                    className={`border-b border-border/50 last:border-0 ${
                      i % 2 === 1 ? 'bg-table-stripe' : 'bg-white'
                    }`}
                  >
                    <td className="px-4 py-2.5 font-medium text-charcoal">
                      {asset.category}
                    </td>
                    <td className="px-4 py-2.5 text-right text-charcoal">
                      ${asset.totalValue.toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-right text-muted">
                      {asset.itemCount || '\u2014'}
                    </td>
                    <td className="px-4 py-2.5 text-muted text-xs">
                      {asset.notes}
                    </td>
                  </tr>
                ))}
                <tr className="bg-navy/5 font-semibold">
                  <td className="px-4 py-2.5 text-navy">Total</td>
                  <td className="px-4 py-2.5 text-right text-navy">
                    $
                    {intake.assets
                      .reduce((sum, a) => sum + a.totalValue, 0)
                      .toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted">
                    {intake.assets.reduce((sum, a) => sum + a.itemCount, 0)}
                  </td>
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-muted">Not completed</p>
        )}
      </AccordionSection>
    </div>
  );
}
