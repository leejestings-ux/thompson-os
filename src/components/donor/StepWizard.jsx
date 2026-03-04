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
        <p className="text-sm text-pp-sage font-medium" style={{ fontStyle: 'normal' }}>
          Section {currentStep} of {steps.length}
        </p>
        <p className="text-base font-semibold text-pp-navy">{label}</p>
      </div>
      <div className="w-full h-1.5 bg-pp-sage/10 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-pp-gold rounded-full transition-all duration-700"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="animate-fadeIn" key={currentStep}>
        {children}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-pp-sage/20">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={currentStep === 1}
          className="text-base"
        >
          Back
        </Button>
        <Button variant="gold" onClick={onNext} className="text-base">
          {nextLabel || (currentStep === steps.length ? 'Complete' : 'Next Section')}
        </Button>
      </div>
    </div>
  );
}
