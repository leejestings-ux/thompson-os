import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DonorShell from '../../components/donor/DonorShell';
import StepWizard from '../../components/donor/StepWizard';
import AutoSaveIndicator from '../../components/donor/AutoSaveIndicator';

const SECTIONS = [
  'Sources & Inheritance',
  'Allocation & Goals',
  'Family Dynamics',
  'Charitable Vision',
  'Legacy & Values',
];

// ── Section 1: Sources & Inheritance Questions ──────────────────────────────

function SourcesSection({ answers, onAnswer, saveTrigger }) {
  const radioClass = (qKey, value) =>
    `px-4 py-2 text-sm rounded-lg border transition-colors cursor-pointer ${
      answers[qKey] === value
        ? 'bg-navy text-white border-navy'
        : 'bg-white text-charcoal border-border hover:border-navy/30'
    }`;

  const checkboxActive = (qKey, value) =>
    (answers[qKey] || []).includes(value);

  const toggleCheckbox = (qKey, value) => {
    const current = answers[qKey] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onAnswer(qKey, next);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-navy">
          Sources &amp; Inheritance
        </h2>
        <AutoSaveIndicator trigger={saveTrigger} />
      </div>

      {/* Q1: Primary source of wealth */}
      <div className="bg-white rounded-xl border border-border p-5">
        <p className="text-sm font-medium text-charcoal mb-3">
          1. What is the primary source of your wealth?
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'Earned Income',
            'Business Ownership',
            'Inheritance',
            'Investments',
            'Real Estate',
            'Other',
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => onAnswer('q1', opt)}
              className={radioClass('q1', opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q2: Inheritance received */}
      <div className="bg-white rounded-xl border border-border p-5">
        <p className="text-sm font-medium text-charcoal mb-3">
          2. Have you received a significant inheritance?
        </p>
        <div className="flex gap-3">
          {['Yes', 'No', 'Prefer not to say'].map((opt) => (
            <button
              key={opt}
              onClick={() => onAnswer('q2', opt)}
              className={radioClass('q2', opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q3: What shaped your views on inheritance */}
      <div className="bg-white rounded-xl border border-border p-5">
        <p className="text-sm font-medium text-charcoal mb-3">
          3. Which factors have most shaped your views on leaving an inheritance?
          <span className="text-muted font-normal ml-1">(Select all that apply)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'Personal experience receiving an inheritance',
            'Religious or spiritual beliefs',
            'Observing other families',
            'Professional advice',
            'Media or books',
            'Life experiences',
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => toggleCheckbox('q3', opt)}
              className={`px-4 py-2 text-sm rounded-lg border transition-colors cursor-pointer ${
                checkboxActive('q3', opt)
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-charcoal border-border hover:border-navy/30'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q4: Open-ended */}
      <div className="bg-white rounded-xl border border-border p-5">
        <p className="text-sm font-medium text-charcoal mb-3">
          4. In your own words, describe what inheritance means to you.
        </p>
        <textarea
          value={answers.q4 || ''}
          onChange={(e) => onAnswer('q4', e.target.value)}
          rows={4}
          placeholder="Take your time. There are no wrong answers."
          className="w-full text-sm border border-border rounded-lg px-3 py-2.5 focus:outline-none focus:border-navy/40 placeholder:text-muted resize-none"
        />
      </div>
    </div>
  );
}

// ── Section 2: Allocation & Goals ───────────────────────────────────────────

function AllocationSection({ answers, onAnswer, saveTrigger }) {
  const alloc = answers.allocation || { heirs: 34, charity: 33, taxes: 33 };

  const setAlloc = (key, raw) => {
    const val = Math.max(0, Math.min(100, Number(raw) || 0));
    const updated = { ...alloc, [key]: val };
    onAnswer('allocation', updated);
  };

  const allocTotal = alloc.heirs + alloc.charity + alloc.taxes;
  const allocValid = allocTotal === 100;

  const priorities = answers.priorities || [
    'Family Security',
    'Charitable Impact',
    'Tax Efficiency',
    'Wealth Preservation',
    'Community Benefit',
  ];

  const moveUp = (index) => {
    if (index === 0) return;
    const next = [...priorities];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onAnswer('priorities', next);
  };

  const moveDown = (index) => {
    if (index === priorities.length - 1) return;
    const next = [...priorities];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onAnswer('priorities', next);
  };

  const goalOptions = [
    'Minimize estate taxes',
    'Maximize charitable impact',
    'Provide for family members equally',
    'Fund education for future generations',
    'Support a specific organization',
    'Create a family foundation',
    'Preserve a family business',
    'Protect assets from creditors',
  ];

  const toggleGoal = (goal) => {
    const current = answers.goals || [];
    const next = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : [...current, goal];
    onAnswer('goals', next);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-navy">
          Allocation &amp; Goals
        </h2>
        <AutoSaveIndicator trigger={saveTrigger} />
      </div>

      {/* Allocation sliders */}
      <div className="bg-white rounded-xl border border-border p-5">
        <p className="text-sm font-medium text-charcoal mb-1">
          5. If your estate were divided into three parts, how would you allocate it?
        </p>
        <p className="text-xs text-muted mb-5">
          Adjust the percentages so they total 100%.
        </p>

        <div className="space-y-5">
          {[
            { key: 'heirs', label: 'To Heirs', color: 'bg-navy' },
            { key: 'charity', label: 'To Charity', color: 'bg-emerald-500' },
            { key: 'taxes', label: 'Tax Reserve', color: 'bg-amber-500' },
          ].map(({ key, label, color }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-charcoal">{label}</span>
                <span className="text-sm font-semibold text-navy">
                  {alloc[key]}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={alloc[key]}
                onChange={(e) => setAlloc(key, e.target.value)}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-navy"
                style={{
                  background: `linear-gradient(to right, var(--color-navy) ${alloc[key]}%, #e2e8f0 ${alloc[key]}%)`,
                }}
              />
            </div>
          ))}
        </div>

        <div
          className={`mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-sm ${
            allocValid ? 'text-emerald-600' : 'text-amber-600'
          }`}
        >
          <span className="font-medium">
            Total: {allocTotal}%
          </span>
          {!allocValid && (
            <span className="text-xs">Must equal 100%</span>
          )}
        </div>
      </div>

      {/* Priority ranking */}
      <div className="bg-white rounded-xl border border-border p-5">
        <p className="text-sm font-medium text-charcoal mb-1">
          6. Rank these estate planning priorities from most to least important.
        </p>
        <p className="text-xs text-muted mb-4">
          Use the arrows to reorder.
        </p>

        <div className="space-y-2">
          {priorities.map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-2.5"
            >
              <span className="text-xs font-semibold text-navy w-5">
                {i + 1}.
              </span>
              <span className="text-sm text-charcoal flex-1">{item}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="text-muted hover:text-navy disabled:opacity-30 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 10l4-4 4 4" />
                  </svg>
                </button>
                <button
                  onClick={() => moveDown(i)}
                  disabled={i === priorities.length - 1}
                  className="text-muted hover:text-navy disabled:opacity-30 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals multi-select */}
      <div className="bg-white rounded-xl border border-border p-5">
        <p className="text-sm font-medium text-charcoal mb-1">
          7. Which of these goals are important to your estate plan?
        </p>
        <p className="text-xs text-muted mb-4">
          Select all that apply.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {goalOptions.map((goal) => {
            const selected = (answers.goals || []).includes(goal);
            return (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`text-left px-4 py-3 text-sm rounded-lg border transition-colors ${
                  selected
                    ? 'bg-navy/5 border-navy/30 text-navy font-medium'
                    : 'bg-white border-border text-charcoal hover:border-navy/20'
                }`}
              >
                {goal}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Placeholder sections ────────────────────────────────────────────────────

function PlaceholderSection({ title, sectionNumber }) {
  return (
    <div className="space-y-6">
      <h2 className="text-base font-semibold text-navy">{title}</h2>
      <div className="bg-white rounded-xl border border-border p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-lg font-semibold text-muted">{sectionNumber}</span>
        </div>
        <p className="text-sm text-charcoal/70 leading-relaxed max-w-md mx-auto">
          This section will contain detailed questions about your{' '}
          <span className="font-medium text-charcoal">
            {title.toLowerCase()}
          </span>
          . Your associate will guide you through these topics during your
          planning meetings.
        </p>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────

export default function Vbq() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [saveTrigger, setSaveTrigger] = useState(0);

  const handleAnswer = useCallback((key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setSaveTrigger((n) => n + 1);
  }, []);

  const handleBack = () => {
    if (step === 1) {
      navigate('/donor/intake');
    } else {
      setStep((s) => s - 1);
    }
  };

  const handleNext = () => {
    if (step === SECTIONS.length) {
      navigate('/donor/intake/concerns');
    } else {
      setStep((s) => s + 1);
    }
  };

  const renderSection = () => {
    switch (step) {
      case 1:
        return (
          <SourcesSection
            answers={answers}
            onAnswer={handleAnswer}
            saveTrigger={saveTrigger}
          />
        );
      case 2:
        return (
          <AllocationSection
            answers={answers}
            onAnswer={handleAnswer}
            saveTrigger={saveTrigger}
          />
        );
      case 3:
        return <PlaceholderSection title="Family Dynamics" sectionNumber={3} />;
      case 4:
        return <PlaceholderSection title="Charitable Vision" sectionNumber={4} />;
      case 5:
        return <PlaceholderSection title="Legacy & Values" sectionNumber={5} />;
      default:
        return null;
    }
  };

  return (
    <DonorShell showBack backTo="/donor/intake">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-navy tracking-tight">
          Values-Based Questionnaire
        </h1>
        <p className="text-sm text-muted mt-1">
          Help us understand what matters most to you.
        </p>
      </div>

      <StepWizard
        steps={SECTIONS}
        currentStep={step}
        onBack={handleBack}
        onNext={handleNext}
        nextLabel={step === SECTIONS.length ? 'Save & Continue' : undefined}
      >
        {renderSection()}
      </StepWizard>
    </DonorShell>
  );
}
