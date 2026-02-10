import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, LogOut } from 'lucide-react';
import DonorShell from '../../components/donor/DonorShell';
import DonorProgressCard from '../../components/donor/DonorProgressCard';
import Button from '../../components/shared/Button';

const DONOR_NAME = 'Margaret';

const STEPS = [
  { label: 'Complete Your Profile', done: true },
  { label: 'Share Your Values', done: false, current: true },
  { label: 'Express Your Concerns', done: false },
  { label: 'List Your Assets', done: false },
  { label: 'Review & Submit', done: false },
];

const CURRENT_STEP_INDEX = STEPS.findIndex((s) => s.current);

export default function DonorHome() {
  const navigate = useNavigate();

  return (
    <DonorShell>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-navy tracking-tight">
          Welcome back, {DONOR_NAME}
        </h1>
        <p className="text-sm text-muted mt-1">
          Your estate planning journey with Thompson &amp; Associates
        </p>
      </div>

      <div className="space-y-5">
        {/* Card 1: Progress */}
        <DonorProgressCard
          currentStep={CURRENT_STEP_INDEX + 1}
          totalSteps={STEPS.length}
          stepLabel={STEPS[CURRENT_STEP_INDEX].label}
        />

        {/* Card 2: Next Step */}
        <div className="bg-white rounded-xl border border-border p-6">
          <p className="text-xs text-muted font-medium uppercase tracking-wider mb-2">
            Next Step
          </p>
          <h3 className="text-base font-semibold text-navy mb-1">
            Continue Your Values Questionnaire
          </h3>
          <p className="text-sm text-charcoal/70 leading-relaxed mb-5">
            Help us understand what matters most to you. Your answers shape the
            recommendations we create for your estate plan. This takes about
            15&ndash;20 minutes.
          </p>
          <Button
            onClick={() => navigate('/donor/intake/vbq')}
            className="flex items-center gap-2"
          >
            Continue Questionnaire
            <ArrowRight size={16} />
          </Button>
        </div>

        {/* Card 3: Timeline */}
        <div className="bg-white rounded-xl border border-border p-6">
          <p className="text-xs text-muted font-medium uppercase tracking-wider mb-4">
            Your Timeline
          </p>
          <div>
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  ) : step.current ? (
                    <div className="w-5 h-5 rounded-full bg-navy ring-4 ring-navy/20 animate-pulse" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                  )}
                  {i < STEPS.length - 1 && (
                    <div
                      className={`w-px h-7 ${
                        step.done ? 'bg-emerald-300' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
                <p
                  className={`text-sm pb-5 ${
                    step.done
                      ? 'text-emerald-700 font-medium'
                      : step.current
                        ? 'text-navy font-semibold'
                        : 'text-muted'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Link
          to="/donor/intake"
          className="text-sm text-navy font-medium hover:text-navy-light transition-colors"
        >
          View All Sections
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm text-muted hover:text-charcoal transition-colors"
        >
          <LogOut size={14} />
          Sign Out
        </Link>
      </div>
    </DonorShell>
  );
}
