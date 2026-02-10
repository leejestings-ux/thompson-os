export default function DonorProgressCard({ currentStep, totalSteps, stepLabel }) {
  const pct = Math.round(((currentStep - 1) / totalSteps) * 100);

  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <p className="text-xs text-muted font-medium uppercase tracking-wider mb-2">
        Your Progress
      </p>
      <p className="text-lg font-semibold text-navy">
        Step {currentStep} of {totalSteps}
      </p>
      <p className="text-sm text-charcoal/70 mt-0.5 mb-4">{stepLabel}</p>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-navy rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
