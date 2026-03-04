import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, DollarSign } from 'lucide-react';
import DonorShell from '../../components/donor/DonorShell';
import AutoSaveIndicator from '../../components/donor/AutoSaveIndicator';
import Button from '../../components/shared/Button';

const CATEGORIES = [
  {
    key: 'realEstate',
    label: 'Real Estate',
    fields: [
      { name: 'description', label: 'Property Description', type: 'text', placeholder: 'e.g. Primary residence — 123 Main St' },
      { name: 'value', label: 'Estimated Value', type: 'money' },
      { name: 'ownership', label: 'Ownership', type: 'select', options: ['Individual', 'Joint', 'Trust', 'LLC'] },
      { name: 'mortgage', label: 'Mortgage Balance', type: 'money' },
    ],
  },
  {
    key: 'retirement',
    label: 'Retirement',
    fields: [
      { name: 'description', label: 'Account Type', type: 'select', options: ['401(k)', 'Traditional IRA', 'Roth IRA', 'Pension', '403(b)', 'SEP IRA', 'Other'] },
      { name: 'institution', label: 'Institution', type: 'text', placeholder: 'e.g. Fidelity, Vanguard' },
      { name: 'value', label: 'Current Balance', type: 'money' },
      { name: 'beneficiary', label: 'Named Beneficiary', type: 'text', placeholder: 'e.g. Spouse' },
    ],
  },
  {
    key: 'bank',
    label: 'Bank & Savings',
    fields: [
      { name: 'description', label: 'Account Type', type: 'select', options: ['Checking', 'Savings', 'Money Market', 'CD', 'Other'] },
      { name: 'institution', label: 'Institution', type: 'text', placeholder: 'e.g. Chase, Wells Fargo' },
      { name: 'value', label: 'Balance', type: 'money' },
    ],
  },
  {
    key: 'investments',
    label: 'Investments',
    fields: [
      { name: 'description', label: 'Description', type: 'text', placeholder: 'e.g. Brokerage account, mutual funds' },
      { name: 'institution', label: 'Held At', type: 'text', placeholder: 'e.g. Schwab, Merrill Lynch' },
      { name: 'value', label: 'Current Value', type: 'money' },
      { name: 'ownership', label: 'Ownership', type: 'select', options: ['Individual', 'Joint', 'Trust'] },
    ],
  },
  {
    key: 'insurance',
    label: 'Insurance',
    fields: [
      { name: 'description', label: 'Policy Type', type: 'select', options: ['Term Life', 'Whole Life', 'Universal Life', 'Annuity', 'Long-Term Care', 'Other'] },
      { name: 'carrier', label: 'Carrier', type: 'text', placeholder: 'e.g. Northwestern Mutual' },
      { name: 'value', label: 'Death Benefit / Value', type: 'money' },
      { name: 'beneficiary', label: 'Beneficiary', type: 'text', placeholder: 'e.g. Spouse, Trust' },
    ],
  },
  {
    key: 'business',
    label: 'Business',
    fields: [
      { name: 'description', label: 'Business Name', type: 'text', placeholder: 'e.g. ABC Manufacturing LLC' },
      { name: 'entityType', label: 'Entity Type', type: 'select', options: ['Sole Proprietorship', 'LLC', 'S-Corp', 'C-Corp', 'Partnership', 'Other'] },
      { name: 'value', label: 'Estimated Value', type: 'money' },
      { name: 'ownership', label: 'Ownership %', type: 'text', placeholder: 'e.g. 100%' },
    ],
  },
  {
    key: 'other',
    label: 'Other',
    fields: [
      { name: 'description', label: 'Description', type: 'text', placeholder: 'e.g. Art collection, vehicles, jewelry' },
      { name: 'value', label: 'Estimated Value', type: 'money' },
      { name: 'notes', label: 'Notes', type: 'text', placeholder: 'Any relevant details' },
    ],
  },
];

function formatMoney(n) {
  if (!n && n !== 0) return '$0';
  return '$' + Number(n).toLocaleString('en-US');
}

function parseMoney(str) {
  return Number(String(str).replace(/[^0-9.-]/g, '')) || 0;
}

export default function Assets() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('realEstate');
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [items, setItems] = useState(
    Object.fromEntries(CATEGORIES.map((c) => [c.key, []]))
  );

  const category = CATEGORIES.find((c) => c.key === activeTab);

  const addItem = () => {
    const blank = {};
    category.fields.forEach((f) => {
      blank[f.name] = f.type === 'select' ? f.options[0] : '';
    });
    setItems((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], blank],
    }));
  };

  const removeItem = (index) => {
    setItems((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((_, i) => i !== index),
    }));
    setSaveTrigger((n) => n + 1);
  };

  const updateItem = useCallback(
    (index, field, value) => {
      setItems((prev) => {
        const arr = [...prev[activeTab]];
        arr[index] = { ...arr[index], [field]: value };
        return { ...prev, [activeTab]: arr };
      });
      setSaveTrigger((n) => n + 1);
    },
    [activeTab]
  );

  // Totals
  const categoryTotal = (key) =>
    (items[key] || []).reduce(
      (sum, item) => sum + parseMoney(item.value),
      0
    );

  const grandTotal = CATEGORIES.reduce(
    (sum, c) => sum + categoryTotal(c.key),
    0
  );

  const inputClass =
    'w-full border border-pp-sage/30 rounded-md px-3 py-2.5 focus:outline-none focus:border-pp-gold focus:ring-2 focus:ring-pp-gold/15 transition-all duration-200 text-base placeholder:text-pp-sage/50';
  const labelClass = 'block text-xs font-semibold text-pp-navy mb-1.5 uppercase tracking-wide';

  return (
    <DonorShell showBack backTo="/donor/intake">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-pp-navy tracking-tight">
            Assets Worksheet
          </h1>
          <p className="text-base text-pp-sage mt-1" style={{ fontStyle: 'normal' }}>
            List your assets by category to help us understand your financial
            picture.
          </p>
        </div>
        <AutoSaveIndicator trigger={saveTrigger} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-6 -mx-1 px-1" style={{ fontStyle: 'normal' }}>
        {CATEGORIES.map((cat) => {
          const count = items[cat.key].length;
          const isActive = activeTab === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`shrink-0 px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                isActive
                  ? 'bg-pp-gold text-pp-navy'
                  : 'text-pp-sage hover:text-pp-navy hover:bg-pp-sage/5'
              }`}
            >
              {cat.label}
              {count > 0 && (
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-pp-navy/15 text-pp-navy'
                      : 'bg-pp-sage/10 text-pp-sage'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Category */}
      <div className="space-y-4">
        {/* Category total */}
        <div className="flex items-center justify-between" style={{ fontStyle: 'normal' }}>
          <h2 className="text-lg text-pp-navy">
            {category.label}
          </h2>
          <p className="text-base font-semibold text-pp-navy">
            {formatMoney(categoryTotal(activeTab))}
          </p>
        </div>

        {/* Items */}
        {items[activeTab].length === 0 ? (
          <div className="bg-white rounded-xl border border-pp-sage/20 p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-base text-pp-sage mb-4" style={{ fontStyle: 'normal' }}>
              No {category.label.toLowerCase()} items added yet.
            </p>
            <Button variant="gold" onClick={addItem}>
              <span className="flex items-center gap-1.5">
                <Plus size={14} />
                Add {category.label} Item
              </span>
            </Button>
          </div>
        ) : (
          <>
            {items[activeTab].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-pp-sage/20 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]"
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
                  {category.fields.map((field) => (
                    <div
                      key={field.name}
                      className={
                        field.name === 'description' ? 'sm:col-span-2' : ''
                      }
                    >
                      <label className={labelClass} style={{ fontStyle: 'normal' }}>
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={item[field.name] || ''}
                          onChange={(e) =>
                            updateItem(i, field.name, e.target.value)
                          }
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
                            onChange={(e) =>
                              updateItem(i, field.name, e.target.value)
                            }
                            placeholder="0"
                            className={`${inputClass} pl-8`}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={item[field.name] || ''}
                          onChange={(e) =>
                            updateItem(i, field.name, e.target.value)
                          }
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
              className="w-full py-3 border-2 border-dashed border-pp-sage/20 rounded-xl text-base font-medium text-pp-sage hover:text-pp-gold hover:border-pp-gold/30 transition-all duration-150 flex items-center justify-center gap-1.5"
              style={{ fontStyle: 'normal' }}
            >
              <Plus size={14} />
              Add Another {category.label} Item
            </button>
          </>
        )}
      </div>

      {/* -- Sticky Grand Total -- */}
      <div className="sticky bottom-0 mt-8 -mx-6 px-6 py-4 bg-white border-t border-pp-sage/20 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-[720px] mx-auto flex items-center justify-between" style={{ fontStyle: 'normal' }}>
          <div>
            <p className="text-xs font-semibold text-pp-sage uppercase tracking-wide">
              Estimated Total Assets
            </p>
            <p className="text-2xl font-bold text-pp-navy">
              {formatMoney(grandTotal)}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-sm text-pp-sage">
            {CATEGORIES.map((cat) => {
              const total = categoryTotal(cat.key);
              if (total === 0) return null;
              return (
                <span key={cat.key}>
                  {cat.label}: {formatMoney(total)}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-pp-sage/20">
        <Button variant="ghost" onClick={() => navigate('/donor/intake')} className="text-base">
          Save &amp; Exit
        </Button>
        <Button variant="gold" onClick={() => navigate('/donor/intake')} className="text-base">
          Save &amp; Complete
        </Button>
      </div>
    </DonorShell>
  );
}
