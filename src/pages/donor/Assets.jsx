import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  X,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Check,
  Home as HomeIcon,
  Building2,
  PiggyBank,
  Shield,
  Briefcase,
  TrendingUp,
  Landmark,
  Car,
  Package,
  AlertCircle,
} from 'lucide-react';
import DonorShell from '../../components/donor/DonorShell';
import AutoSaveIndicator from '../../components/donor/AutoSaveIndicator';
import Button from '../../components/shared/Button';

// ─── Category Definitions ────────────────────────────────────────────────────

const STEPS = [
  {
    key: 'realEstate',
    label: 'Real Estate',
    icon: HomeIcon,
    fields: [
      { name: 'propertyType', label: 'Property Type', type: 'select', options: ['Primary Residence', 'Rental Property', 'Vacation Home', 'Land'] },
      { name: 'address', label: 'Address', type: 'text', placeholder: 'e.g. 123 Main St, Nashville, TN', wide: true },
      { name: 'estimatedValue', label: 'Estimated Value', type: 'money' },
      { name: 'mortgageBalance', label: 'Mortgage Balance', type: 'money' },
      { name: 'ownership', label: 'Ownership', type: 'select', options: ['Joint', 'Individual', 'Trust'] },
    ],
  },
  {
    key: 'retirement',
    label: 'Retirement Accounts',
    icon: PiggyBank,
    fields: [
      { name: 'type', label: 'Account Type', type: 'select', options: ['401(k)', 'Traditional IRA', 'Roth IRA', '403(b)', 'Pension'] },
      { name: 'institution', label: 'Institution', type: 'text', placeholder: 'e.g. Fidelity, Vanguard' },
      { name: 'balance', label: 'Current Balance', type: 'money' },
      { name: 'beneficiaryDesignated', label: 'Beneficiary Designated?', type: 'select', options: ['Yes', 'No'] },
      { name: 'beneficiaryName', label: 'Beneficiary Name', type: 'text', placeholder: 'e.g. Spouse' },
    ],
  },
  {
    key: 'lifeInsurance',
    label: 'Life Insurance',
    icon: Shield,
    fields: [
      { name: 'type', label: 'Policy Type', type: 'select', options: ['Term Life', 'Whole Life', 'Universal Life'] },
      { name: 'faceValue', label: 'Face Value (Death Benefit)', type: 'money' },
      { name: 'cashValue', label: 'Cash Value', type: 'money' },
      { name: 'owner', label: 'Policy Owner', type: 'text', placeholder: 'e.g. Robert Chen' },
      { name: 'beneficiary', label: 'Beneficiary', type: 'text', placeholder: 'e.g. Margaret Chen' },
      { name: 'throughEmployer', label: 'Through Employer?', type: 'select', options: ['No', 'Yes'] },
    ],
  },
  {
    key: 'business',
    label: 'Business Interests',
    icon: Briefcase,
    fields: [
      { name: 'entityName', label: 'Business / Entity Name', type: 'text', placeholder: 'e.g. ABC Manufacturing LLC', wide: true },
      { name: 'entityType', label: 'Entity Type', type: 'select', options: ['LLC', 'S-Corp', 'C-Corp', 'Partnership', 'Sole Proprietorship'] },
      { name: 'ownershipPct', label: 'Ownership %', type: 'text', placeholder: 'e.g. 100%' },
      { name: 'estimatedValue', label: 'Estimated Value', type: 'money' },
      { name: 'buySellAgreement', label: 'Buy-Sell Agreement?', type: 'select', options: ['No', 'Yes'] },
    ],
  },
  {
    key: 'investments',
    label: 'Investment Accounts',
    icon: TrendingUp,
    fields: [
      { name: 'institution', label: 'Institution', type: 'text', placeholder: 'e.g. Schwab, Merrill Lynch' },
      { name: 'accountType', label: 'Account Type', type: 'select', options: ['Brokerage', 'Mutual Fund', 'Annuity'] },
      { name: 'balance', label: 'Current Balance', type: 'money' },
      { name: 'ownership', label: 'Ownership', type: 'select', options: ['Joint', 'Individual', 'Trust'] },
    ],
  },
  {
    key: 'bank',
    label: 'Bank Accounts',
    icon: Landmark,
    fields: [
      { name: 'institution', label: 'Institution', type: 'text', placeholder: 'e.g. Chase, First Horizon' },
      { name: 'type', label: 'Account Type', type: 'select', options: ['Checking', 'Savings', 'CD', 'Money Market'] },
      { name: 'balance', label: 'Balance', type: 'money' },
    ],
  },
  {
    key: 'personalProperty',
    label: 'Personal Property',
    icon: Car,
    fields: [
      { name: 'description', label: 'Description', type: 'text', placeholder: 'e.g. Vehicles, jewelry, art, collections', wide: true },
      { name: 'estimatedValue', label: 'Estimated Value', type: 'money' },
    ],
  },
  {
    key: 'other',
    label: 'Other Assets',
    icon: Package,
    fields: [
      { name: 'description', label: 'Description', type: 'text', placeholder: 'Describe the asset', wide: true },
      { name: 'estimatedValue', label: 'Estimated Value', type: 'money' },
    ],
  },
];

const SUMMARY_STEP = STEPS.length;

function formatMoney(n) {
  if (!n && n !== 0) return '$0';
  return '$' + Number(n).toLocaleString('en-US');
}

function parseMoney(str) {
  return Number(String(str).replace(/[^0-9.-]/g, '')) || 0;
}

function getValueField(step) {
  if (step.key === 'lifeInsurance') return 'faceValue';
  if (['retirement', 'investments', 'bank'].includes(step.key)) return 'balance';
  return 'estimatedValue';
}

function categoryTotal(items, step) {
  const field = getValueField(step);
  return items.reduce((s, item) => s + parseMoney(item[field] || 0), 0);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Assets() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [items, setItems] = useState(
    Object.fromEntries(STEPS.map((s) => [s.key, []]))
  );

  const step = STEPS[currentStep];
  const isOnSummary = currentStep === SUMMARY_STEP;

  const addItem = () => {
    const blank = {};
    step.fields.forEach((f) => {
      blank[f.name] = f.type === 'select' ? f.options[0] : '';
    });
    setItems((prev) => ({ ...prev, [step.key]: [...prev[step.key], blank] }));
  };

  const removeItem = (index) => {
    setItems((prev) => ({
      ...prev,
      [step.key]: prev[step.key].filter((_, i) => i !== index),
    }));
    setSaveTrigger((n) => n + 1);
  };

  const updateItem = useCallback(
    (index, field, value) => {
      setItems((prev) => {
        const arr = [...prev[step.key]];
        arr[index] = { ...arr[index], [field]: value };
        return { ...prev, [step.key]: arr };
      });
      setSaveTrigger((n) => n + 1);
    },
    [step?.key]
  );

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, SUMMARY_STEP));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));
  const goToStep = (i) => setCurrentStep(i);

  const grandTotal = STEPS.reduce(
    (sum, s) => sum + categoryTotal(items[s.key], s),
    0
  );

  const completedSteps = STEPS.filter((s) => items[s.key].length > 0).length;

  const inputClass =
    'w-full border border-pp-sage/30 rounded-md px-3 py-3 focus:outline-none focus:border-pp-gold focus:ring-2 focus:ring-pp-gold/15 transition-all duration-200 text-base placeholder:text-pp-sage/50';
  const labelClass =
    'block text-xs font-semibold text-pp-navy mb-1.5 uppercase tracking-wide';

  if (submitted) {
    return (
      <DonorShell showBack backTo="/donor/intake">
        <div className="text-center py-16 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-emerald-600" />
          </div>
          <h1 className="text-2xl text-pp-navy mb-3" style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic' }}>
            Assets Submitted
          </h1>
          <p className="text-base text-pp-sage max-w-md mx-auto mb-8" style={{ fontStyle: 'normal' }}>
            Your associate will review this information before your next meeting. You can update your assets at any time.
          </p>
          <Button variant="gold" onClick={() => navigate('/donor/intake')}>
            Return to My Forms
          </Button>
        </div>
      </DonorShell>
    );
  }

  return (
    <DonorShell showBack backTo="/donor/intake">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-xl text-pp-navy tracking-tight" style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic' }}>
            Assets Worksheet
          </h1>
          <p className="text-base text-pp-sage mt-1" style={{ fontStyle: 'normal' }}>
            Tell us about your assets, one category at a time.
          </p>
        </div>
        <AutoSaveIndicator trigger={saveTrigger} />
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2" style={{ fontStyle: 'normal' }}>
          <p className="text-xs text-pp-sage font-medium">
            {isOnSummary
              ? 'Review & Submit'
              : `Step ${currentStep + 1} of ${STEPS.length} — ${step.label}`}
          </p>
          <p className="text-xs text-pp-sage">
            {completedSteps} of {STEPS.length} categories completed
          </p>
        </div>
        <div className="flex gap-1">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              onClick={() => goToStep(i)}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? 'bg-pp-gold'
                  : items[s.key].length > 0
                    ? 'bg-pp-gold/40'
                    : 'bg-pp-sage/15'
              }`}
              title={s.label}
            />
          ))}
          <button
            onClick={() => goToStep(SUMMARY_STEP)}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              isOnSummary ? 'bg-pp-gold' : 'bg-pp-sage/15'
            }`}
            title="Summary"
          />
        </div>
      </div>

      {/* ─── Category Step ─── */}
      {!isOnSummary && (
        <div className="animate-fadeIn" key={step.key}>
          {/* Category header */}
          <div className="flex items-center gap-3 mb-5" style={{ fontStyle: 'normal' }}>
            <div className="w-10 h-10 rounded-lg bg-pp-gold/15 flex items-center justify-center">
              <step.icon size={20} className="text-pp-gold" />
            </div>
            <div>
              <h2 className="text-lg text-pp-navy font-semibold">{step.label}</h2>
              {items[step.key].length > 0 && (
                <p className="text-sm font-semibold text-pp-gold">
                  Subtotal: {formatMoney(categoryTotal(items[step.key], step))}
                </p>
              )}
            </div>
          </div>

          {/* Items */}
          {items[step.key].length === 0 ? (
            <div className="bg-white rounded-xl border border-pp-sage/20 p-10 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              <step.icon size={36} className="text-pp-sage/30 mx-auto mb-3" />
              <p className="text-base text-pp-sage mb-5" style={{ fontStyle: 'normal' }}>
                No {step.label.toLowerCase()} items added yet.
              </p>
              <Button variant="gold" onClick={addItem}>
                <span className="flex items-center gap-1.5">
                  <Plus size={14} />
                  Add {step.label} Item
                </span>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items[step.key].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-pp-sage/20 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center justify-between mb-4" style={{ fontStyle: 'normal' }}>
                    <p className="text-xs font-semibold text-pp-sage uppercase tracking-wide">
                      Item {i + 1}
                    </p>
                    <button
                      onClick={() => removeItem(i)}
                      className="text-pp-sage hover:text-pp-burgundy transition-colors duration-150"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ fontStyle: 'normal' }}>
                    {step.fields.map((field) => (
                      <div
                        key={field.name}
                        className={field.wide ? 'sm:col-span-2' : ''}
                      >
                        <label className={labelClass} style={{ fontStyle: 'normal' }}>
                          {field.label}
                        </label>
                        {field.type === 'select' ? (
                          <select
                            value={item[field.name] || ''}
                            onChange={(e) => updateItem(i, field.name, e.target.value)}
                            className={inputClass}
                          >
                            {field.options.map((opt) => (
                              <option key={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : field.type === 'money' ? (
                          <div className="relative">
                            <DollarSign
                              size={14}
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-pp-sage"
                            />
                            <input
                              type="text"
                              value={item[field.name] || ''}
                              onChange={(e) => updateItem(i, field.name, e.target.value)}
                              placeholder="0"
                              className={`${inputClass} pl-8`}
                            />
                          </div>
                        ) : (
                          <input
                            type="text"
                            value={item[field.name] || ''}
                            onChange={(e) => updateItem(i, field.name, e.target.value)}
                            placeholder={field.placeholder || ''}
                            className={inputClass}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={addItem}
                className="w-full py-3.5 border-2 border-dashed border-pp-sage/20 rounded-xl text-base font-medium text-pp-sage hover:text-pp-gold hover:border-pp-gold/30 transition-all duration-150 flex items-center justify-center gap-1.5"
                style={{ fontStyle: 'normal' }}
              >
                <Plus size={14} />
                Add Another {step.label} Item
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-pp-sage/20">
            <button
              onClick={goPrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-1.5 text-base font-medium transition-colors duration-150 ${
                currentStep === 0
                  ? 'text-pp-sage/30 cursor-not-allowed'
                  : 'text-pp-sage hover:text-pp-navy'
              }`}
              style={{ fontStyle: 'normal' }}
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={goNext}
                className="text-base font-medium text-pp-sage hover:text-pp-navy transition-colors duration-150"
                style={{ fontStyle: 'normal' }}
              >
                Skip This Category
              </button>
              <Button variant="gold" onClick={goNext}>
                <span className="flex items-center gap-1.5" style={{ fontStyle: 'normal' }}>
                  {currentStep === STEPS.length - 1 ? 'Review Summary' : 'Next Category'}
                  <ChevronRight size={14} />
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Summary Step ─── */}
      {isOnSummary && (
        <div className="animate-fadeIn">
          {/* Grand total */}
          <div className="bg-pp-navy rounded-xl p-6 mb-6 text-center">
            <p className="text-xs text-pp-cream/60 uppercase tracking-wider font-semibold mb-1" style={{ fontStyle: 'normal' }}>
              Estimated Total Estate Value
            </p>
            <p className="text-3xl font-bold text-pp-cream" style={{ fontStyle: 'normal' }}>
              {formatMoney(grandTotal)}
            </p>
          </div>

          {/* Category breakdowns */}
          <div className="space-y-4 mb-8">
            {STEPS.map((s, si) => {
              const catItems = items[s.key];
              const total = categoryTotal(catItems, s);
              const Icon = s.icon;
              const hasItems = catItems.length > 0;
              const valField = getValueField(s);

              return (
                <div
                  key={s.key}
                  className={`bg-white rounded-xl border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08)] ${
                    hasItems ? 'border-pp-sage/20' : 'border-pp-sage/10 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3" style={{ fontStyle: 'normal' }}>
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className={hasItems ? 'text-pp-gold' : 'text-pp-sage/40'} />
                      <h3 className="text-sm font-semibold text-pp-navy">{s.label}</h3>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-pp-sage/10 text-pp-sage">
                        {catItems.length} item{catItems.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold text-pp-navy">
                        {formatMoney(total)}
                      </p>
                      <button
                        onClick={() => goToStep(si)}
                        className="text-xs text-pp-gold hover:text-pp-gold-dark font-medium transition-colors duration-150"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  {hasItems && (
                    <div className="space-y-1.5">
                      {catItems.map((item, i) => {
                        const label =
                          item.description || item.address || item.entityName ||
                          item.institution || item.propertyType || item.type || item.owner ||
                          `Item ${i + 1}`;
                        const val = parseMoney(item[valField] || 0);
                        const hasMissing = Object.values(item).some(
                          (v) => v === '' || v === undefined
                        );

                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between text-sm py-1"
                            style={{ fontStyle: 'normal' }}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {hasMissing && (
                                <AlertCircle size={12} className="text-amber-500 shrink-0" />
                              )}
                              <span className="text-pp-navy/80 truncate">{label}</span>
                            </div>
                            <span className="text-pp-navy font-medium shrink-0 ml-3">
                              {formatMoney(val)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Confirmation */}
          <div className="bg-pp-gold/10 border border-pp-gold/30 rounded-xl p-5 mb-6 text-center" style={{ fontStyle: 'normal' }}>
            <p className="text-sm text-pp-navy">
              Your associate will review this information before your next meeting.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={goPrev}
              className="flex items-center gap-1.5 text-base font-medium text-pp-sage hover:text-pp-navy transition-colors duration-150"
              style={{ fontStyle: 'normal' }}
            >
              <ChevronLeft size={16} />
              Back to Editing
            </button>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/donor/intake')}
                className="text-base"
              >
                Save &amp; Continue Later
              </Button>
              <Button variant="gold" onClick={() => setSubmitted(true)}>
                Submit to Associate
              </Button>
            </div>
          </div>
        </div>
      )}
    </DonorShell>
  );
}
