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

// -- Section 1: Sources & Inheritance Questions --

function SourcesSection({ answers, onAnswer, saveTrigger }) {
  const radioClass = (qKey, value) =>
    `px-4 py-2 text-base rounded-md border transition-all duration-150 active:scale-95 cursor-pointer ${
      answers[qKey] === value
        ? 'bg-pp-gold text-pp-navy border-pp-gold font-semibold'
        : 'bg-white text-pp-navy border-pp-sage/30 hover:border-pp-gold/40'
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
        <h2 className="text-lg text-pp-navy">
          Sources &amp; Inheritance
        </h2>
        <AutoSaveIndicator trigger={saveTrigger} />
      </div>

      {/* Q1: Primary source of wealth */}
      <div className="bg-white rounded-xl border border-pp-sage/20 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-base font-medium text-pp-navy mb-3" style={{ fontStyle: 'normal' }}>
          1. What is the primary source of your wealth?
        </p>
        <div className="flex flex-wrap gap-2" style={{ fontStyle: 'normal' }}>
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
      <div className="bg-white rounded-xl border border-pp-sage/20 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-base font-medium text-pp-navy mb-3" style={{ fontStyle: 'normal' }}>
          2. Have you received a significant inheritance?
        </p>
        <div className="flex gap-3" style={{ fontStyle: 'normal' }}>
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
      <div className="bg-white rounded-xl border border-pp-sage/20 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-base font-medium text-pp-navy mb-3" style={{ fontStyle: 'normal' }}>
          3. Which factors have most shaped your views on leaving an inheritance?
          <span className="text-pp-sage font-normal ml-1">(Select all that apply)</span>
        </p>
        <div className="flex flex-wrap gap-2" style={{ fontStyle: 'normal' }}>
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
              className={`px-4 py-2 text-base rounded-md border transition-all duration-150 active:scale-95 cursor-pointer ${
                checkboxActive('q3', opt)
                  ? 'bg-pp-gold text-pp-navy border-pp-gold font-semibold'
                  : 'bg-white text-pp-navy border-pp-sage/30 hover:border-pp-gold/40'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Q4: Open-ended */}
      <div className="bg-white rounded-xl border border-pp-sage/20 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-base font-medium text-pp-navy mb-3" style={{ fontStyle: 'normal' }}>
          4. In your own words, describe what inheritance means to you.
        </p>
        <textarea
          value={answers.q4 || ''}
          onChange={(e) => onAnswer('q4', e.target.value)}
          rows={4}
          placeholder="Take your time. There are no wrong answers."
          className="w-full border border-pp-sage/30 rounded-md px-3 py-2.5 focus:outline-none focus:border-pp-gold focus:ring-2 focus:ring-pp-gold/15 transition-all duration-200 text-base placeholder:text-pp-sage/50 resize-none"
          style={{ fontStyle: 'normal' }}
        />
      </div>
    </div>
  );
}

// -- Section 2: Allocation & Goals --

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
        <h2 className="text-lg text-pp-navy">
          Allocation &amp; Goals
        </h2>
        <AutoSaveIndicator trigger={saveTrigger} />
      </div>

      {/* Allocation sliders */}
      <div className="bg-white rounded-xl border border-pp-sage/20 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-base font-medium text-pp-navy mb-1" style={{ fontStyle: 'normal' }}>
          5. If your estate were divided into three parts, how would you allocate it?
        </p>
        <p className="text-sm text-pp-sage mb-5" style={{ fontStyle: 'normal' }}>
          Adjust the percentages so they total 100%.
        </p>

        <div className="space-y-5" style={{ fontStyle: 'normal' }}>
          {[
            { key: 'heirs', label: 'To Heirs' },
            { key: 'charity', label: 'To Charity' },
            { key: 'taxes', label: 'Tax Reserve' },
          ].map(({ key, label }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-base text-pp-navy">{label}</span>
                <span className="text-base font-semibold text-pp-navy">
                  {alloc[key]}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={alloc[key]}
                onChange={(e) => setAlloc(key, e.target.value)}
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-pp-gold"
                style={{
                  background: `linear-gradient(to right, var(--color-pp-gold) ${alloc[key]}%, #e2e8f0 ${alloc[key]}%)`,
                }}
              />
            </div>
          ))}
        </div>

        <div
          className={`mt-4 pt-3 border-t border-pp-sage/15 flex items-center justify-between text-base ${
            allocValid ? 'text-emerald-600' : 'text-amber-600'
          }`}
          style={{ fontStyle: 'normal' }}
        >
          <span className="font-medium">
            Total: {allocTotal}%
          </span>
          {!allocValid && (
            <span className="text-sm">Must equal 100%</span>
          )}
        </div>
      </div>

      {/* Priority ranking */}
      <div className="bg-white rounded-xl border border-pp-sage/20 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-base font-medium text-pp-navy mb-1" style={{ fontStyle: 'normal' }}>
          6. Rank these estate planning priorities from most to least important.
        </p>
        <p className="text-sm text-pp-sage mb-4" style={{ fontStyle: 'normal' }}>
          Use the arrows to reorder.
        </p>

        <div className="space-y-2" style={{ fontStyle: 'normal' }}>
          {priorities.map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-3 bg-pp-cream rounded-lg px-4 py-2.5"
            >
              <span className="text-xs font-semibold text-pp-navy w-5">
                {i + 1}.
              </span>
              <span className="text-base text-pp-navy flex-1">{item}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveUp(i)}
                  disabled={i === 0}
                  className="text-pp-sage hover:text-pp-gold disabled:opacity-30 transition-colors duration-150"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 10l4-4 4 4" />
                  </svg>
                </button>
                <button
                  onClick={() => moveDown(i)}
                  disabled={i === priorities.length - 1}
                  className="text-pp-sage hover:text-pp-gold disabled:opacity-30 transition-colors duration-150"
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
      <div className="bg-white rounded-xl border border-pp-sage/20 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
        <p className="text-base font-medium text-pp-navy mb-1" style={{ fontStyle: 'normal' }}>
          7. Which of these goals are important to your estate plan?
        </p>
        <p className="text-sm text-pp-sage mb-4" style={{ fontStyle: 'normal' }}>
          Select all that apply.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" style={{ fontStyle: 'normal' }}>
          {goalOptions.map((goal) => {
            const selected = (answers.goals || []).includes(goal);
            return (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`text-left px-4 py-3 text-base rounded-md border transition-all duration-150 active:scale-95 ${
                  selected
                    ? 'bg-pp-gold/10 border-pp-gold/30 text-pp-gold font-medium'
                    : 'bg-white border-pp-sage/30 text-pp-navy hover:border-pp-gold/30'
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

// -- Placeholder sections --

function PlaceholderSection({ title, sectionNumber }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg text-pp-navy">{title}</h2>
      <div className="bg-white rounded-xl border border-pp-sage/20 p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="w-12 h-12 rounded-full bg-pp-sage/10 flex items-center justify-center mx-auto mb-4">
          <span className="text-lg font-semibold text-pp-sage">{sectionNumber}</span>
        </div>
        <p className="text-base text-pp-navy/70 leading-relaxed max-w-md mx-auto" style={{ fontStyle: 'normal' }}>
          This section will contain detailed questions about your{' '}
          <span className="font-medium text-pp-navy">
            {title.toLowerCase()}
          </span>
          . Your associate will guide you through these topics during your
          planning meetings.
        </p>
      </div>
    </div>
  );
}

// -- Main Component --

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
        <h1 className="text-xl font-semibold text-pp-navy tracking-tight">
          Values-Based Questionnaire
        </h1>
        <p className="text-base text-pp-sage mt-1" style={{ fontStyle: 'normal' }}>
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
