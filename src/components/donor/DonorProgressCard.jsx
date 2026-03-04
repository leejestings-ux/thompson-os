export default function DonorProgressCard({ currentStep, totalSteps, stepLabel }) {
  const pct = Math.round(((currentStep - 1) / totalSteps) * 100);

  return (
    <div className="bg-white rounded-xl border border-pp-sage/20 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
      <p className="text-[11px] text-pp-sage font-semibold uppercase tracking-wider mb-2" style={{ fontStyle: 'normal' }}>
        Your Progress
      </p>
      <p className="text-xl text-pp-navy">
        Step {currentStep} of {totalSteps}
      </p>
      <p className="text-base text-pp-navy/70 mt-0.5 mb-4" style={{ fontStyle: 'normal' }}>{stepLabel}</p>
      <div className="w-full h-2 bg-pp-sage/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-pp-gold rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
