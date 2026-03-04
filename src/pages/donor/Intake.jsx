import DonorShell from '../../components/donor/DonorShell';
import IntakeChecklist from '../../components/donor/IntakeChecklist';

export default function DonorIntake() {
  return (
    <DonorShell showBack backTo="/donor/home">
      <div className="mb-6">
        <h1 className="text-[22px] text-pp-navy tracking-tight">
          Your Intake Forms
        </h1>
        <p className="text-base text-pp-sage mt-1" style={{ fontStyle: 'normal' }}>
          Complete each section to help us build your personalized estate plan.
        </p>
      </div>
      <IntakeChecklist />
    </DonorShell>
  );
}
