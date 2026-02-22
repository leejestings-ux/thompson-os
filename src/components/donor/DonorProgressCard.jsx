export default function DonorProgressCard({ currentStep, totalSteps, stepLabel }) {
  const pct = Math.round(((currentStep - 1) / totalSteps) * 100);

  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
      <p className="text-[11px] text-muted font-semibold uppercase tracking-wider mb-2">
        Your Progress
      </p>
      <p className="text-xl font-serif text-navy">
        Step {currentStep} of {totalSteps}
      </p>
      <p className="text-base text-charcoal/70 mt-0.5 mb-4">{stepLabel}</p>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
