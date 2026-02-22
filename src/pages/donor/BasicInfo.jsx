import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import DonorShell from '../../components/donor/DonorShell';
import AutoSaveIndicator from '../../components/donor/AutoSaveIndicator';
import Button from '../../components/shared/Button';

const MARITAL_OPTIONS = ['Single', 'Married', 'Divorced', 'Widowed'];

const ESTATE_PLAN_OPTIONS = [
  'Will',
  'Revocable Living Trust',
  'Irrevocable Trust',
  'Power of Attorney',
  'Healthcare Directive / Living Will',
  'Beneficiary Designations',
  'None of the above',
];

const EMPTY_CHILD = { name: '', age: '', relationship: 'Child' };

export default function BasicInfo() {
  const navigate = useNavigate();
  const [saveTrigger, setSaveTrigger] = useState(0);

  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    citizenship: 'United States',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    maritalStatus: '',
    spouseName: '',
    spouseDob: '',
    spouseEmail: '',
    children: [],
    estatePlan: [],
  });

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaveTrigger((n) => n + 1);
  }, []);

  const updateChild = useCallback((index, field, value) => {
    setForm((prev) => {
      const children = [...prev.children];
      children[index] = { ...children[index], [field]: value };
      return { ...prev, children };
    });
    setSaveTrigger((n) => n + 1);
  }, []);

  const addChild = () => {
    setForm((prev) => ({
      ...prev,
      children: [...prev.children, { ...EMPTY_CHILD }],
    }));
  };

  const removeChild = (index) => {
    setForm((prev) => ({
      ...prev,
      children: prev.children.filter((_, i) => i !== index),
    }));
    setSaveTrigger((n) => n + 1);
  };

  const toggleEstatePlan = (option) => {
    setForm((prev) => {
      const has = prev.estatePlan.includes(option);
      return {
        ...prev,
        estatePlan: has
          ? prev.estatePlan.filter((o) => o !== option)
          : [...prev.estatePlan, option],
      };
    });
    setSaveTrigger((n) => n + 1);
  };

  const inputClass =
    'w-full border border-slate-300 rounded-md px-3 py-2.5 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-200 text-base placeholder:text-muted';
  const labelClass = 'block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide';

  return (
    <DonorShell showBack backTo="/donor/intake">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-serif font-semibold text-navy tracking-tight">
            Basic Information
          </h1>
          <p className="text-base text-muted mt-1">
            Tell us about yourself and your family.
          </p>
        </div>
        <AutoSaveIndicator trigger={saveTrigger} />
      </div>

      <div className="space-y-8">
        {/* -- Personal Information -- */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
          <h2 className="text-lg font-serif text-navy mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass}>Full Legal Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="e.g. Margaret Anne Ellis"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => update('dob', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Citizenship</label>
              <input
                type="text"
                value={form.citizenship}
                onChange={(e) => update('citizenship', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Street Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
                placeholder="123 Main Street"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => update('city', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>State</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => update('state', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>ZIP</label>
                <input
                  type="text"
                  value={form.zip}
                  onChange={(e) => update('zip', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="(555) 555-0100"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* -- Marital Status -- */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
          <h2 className="text-lg font-serif text-navy mb-4">
            Marital Status
          </h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {MARITAL_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => update('maritalStatus', opt)}
                className={`px-4 py-2 text-base rounded-md border transition-all duration-150 active:scale-95 ${
                  form.maritalStatus === opt
                    ? 'bg-teal text-white border-teal'
                    : 'bg-white text-charcoal border-slate-300 hover:border-teal/40'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {form.maritalStatus === 'Married' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50 mt-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Spouse Full Legal Name</label>
                <input
                  type="text"
                  value={form.spouseName}
                  onChange={(e) => update('spouseName', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Spouse Date of Birth</label>
                <input
                  type="date"
                  value={form.spouseDob}
                  onChange={(e) => update('spouseDob', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Spouse Email</label>
                <input
                  type="email"
                  value={form.spouseEmail}
                  onChange={(e) => update('spouseEmail', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}
        </section>

        {/* -- Children -- */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif text-navy">
              Children &amp; Dependents
            </h2>
            <button
              onClick={addChild}
              className="flex items-center gap-1 text-xs font-medium text-teal hover:text-teal-dark transition-colors duration-150"
            >
              <Plus size={14} />
              Add
            </button>
          </div>

          {form.children.length === 0 ? (
            <p className="text-base text-muted">
              No children added yet. Click "Add" to include family members.
            </p>
          ) : (
            <div className="space-y-4">
              {form.children.map((child, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_80px_120px_32px] gap-3 items-end"
                >
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      type="text"
                      value={child.name}
                      onChange={(e) => updateChild(i, 'name', e.target.value)}
                      placeholder="Child's full name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Age</label>
                    <input
                      type="number"
                      value={child.age}
                      onChange={(e) => updateChild(i, 'age', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Relation</label>
                    <select
                      value={child.relationship}
                      onChange={(e) =>
                        updateChild(i, 'relationship', e.target.value)
                      }
                      className={inputClass}
                    >
                      <option>Child</option>
                      <option>Stepchild</option>
                      <option>Grandchild</option>
                      <option>Dependent</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeChild(i)}
                    className="p-2 text-muted hover:text-muted-red transition-colors duration-150"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* -- Current Estate Plan -- */}
        <section className="bg-white rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
          <h2 className="text-lg font-serif text-navy mb-1">
            Current Estate Plan
          </h2>
          <p className="text-base text-muted mb-4">
            Select any documents you currently have in place.
          </p>
          <div className="space-y-2.5">
            {ESTATE_PLAN_OPTIONS.map((opt) => {
              const checked = form.estatePlan.includes(opt);
              return (
                <label
                  key={opt}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-150 ${
                      checked
                        ? 'bg-teal border-teal'
                        : 'border-slate-300 group-hover:border-teal/40'
                    }`}
                  >
                    {checked && (
                      <svg
                        viewBox="0 0 12 12"
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                  <span className="text-base text-charcoal">{opt}</span>
                </label>
              );
            })}
          </div>
        </section>
      </div>

      {/* -- Actions -- */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={() => navigate('/donor/intake')}
          className="text-base"
        >
          Save &amp; Exit
        </Button>
        <Button variant="teal" onClick={() => navigate('/donor/intake/vbq')} className="text-base">
          Save &amp; Continue
        </Button>
      </div>
    </DonorShell>
  );
}
