import Button from '../shared/Button';

export default function StepWizard({
  steps,
  currentStep,
  onBack,
  onNext,
  nextLabel,
  children,
}) {
  const label = steps[currentStep - 1] || '';

  return (
    <div>
      {/* Progress header */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-muted font-medium">
          Section {currentStep} of {steps.length}
        </p>
        <p className="text-sm font-semibold text-navy">{label}</p>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-navy rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      {children}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={currentStep === 1}
        >
          Back
        </Button>
        <Button onClick={onNext}>
          {nextLabel || (currentStep === steps.length ? 'Complete' : 'Next Section')}
        </Button>
      </div>
    </div>
  );
}
