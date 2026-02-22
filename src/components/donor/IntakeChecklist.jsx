import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, Lock } from 'lucide-react';

const SECTIONS = [
  { key: 'basicInfo', label: 'Basic Information', desc: 'Personal and family details', pct: 100, path: '/donor/intake/basic-info' },
  { key: 'vbq', label: 'Values Questionnaire', desc: 'Understanding your priorities', pct: 40, path: '/donor/intake/vbq' },
  { key: 'concerns', label: 'Personal Concerns', desc: 'What matters most to you', pct: 0, path: '/donor/intake/concerns' },
  { key: 'assets', label: 'Assets Worksheet', desc: 'Your financial picture', pct: 0, path: '/donor/intake/assets' },
  { key: 'review', label: 'Review & Submit', desc: 'Final review before submission', pct: 0, path: null },
];

export default function IntakeChecklist() {
  const navigate = useNavigate();
  const overallPct = Math.round(
    SECTIONS.reduce((sum, s) => sum + s.pct, 0) / SECTIONS.length
  );

  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-base font-medium text-charcoal">Overall Progress</p>
          <p className="text-base font-serif font-semibold text-navy">{overallPct}%</p>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Section list */}
      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const isComplete = section.pct === 100;
          const isLocked = !section.path;
          const isStarted = section.pct > 0 && !isComplete;

          return (
            <button
              key={section.key}
              onClick={() => section.path && navigate(section.path)}
              disabled={isLocked}
              className={`w-full text-left bg-white rounded-xl border p-5 flex items-center gap-4 transition-all duration-200 ${
                isLocked
                  ? 'border-border/50 opacity-50 cursor-not-allowed'
                  : 'border-border hover:border-teal/30 hover:shadow-md hover:scale-[1.005] cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]'
              }`}
            >
              {/* Status icon */}
              {isComplete ? (
                <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
              ) : isLocked ? (
                <Lock size={22} className="text-muted shrink-0" />
              ) : (
                <Circle size={24} className={`shrink-0 ${isStarted ? 'text-teal' : 'text-muted/40'}`} />
              )}

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-charcoal">
                  {section.label}
                </p>
                <p className="text-sm text-muted mt-0.5">{section.desc}</p>
              </div>

              {/* Completion */}
              {!isLocked && (
                <div className="shrink-0 text-right">
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wide ${
                      isComplete
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isStarted
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-50 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {section.pct}%
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
