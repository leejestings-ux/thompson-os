import { useState } from 'react';
import {
  Home as HomeIcon,
  PiggyBank,
  Shield,
  Briefcase,
  TrendingUp,
  Landmark,
  Car,
  Package,
  AlertTriangle,
  Download,
  Clock,
} from 'lucide-react';
import Button from '../../shared/Button';
import {
  CHEN_ASSET_WIZARD,
  CHEN_ASSET_TOTAL,
} from '../../../lib/chenMockData';

const CATEGORIES = [
  {
    key: 'realEstate',
    label: 'Real Estate',
    icon: HomeIcon,
    valueField: 'estimatedValue',
    columns: ['propertyType', 'address', 'estimatedValue', 'mortgageBalance', 'ownership'],
    headers: ['Type', 'Address', 'Est. Value', 'Mortgage', 'Ownership'],
  },
  {
    key: 'retirement',
    label: 'Retirement Accounts',
    icon: PiggyBank,
    valueField: 'balance',
    columns: ['type', 'institution', 'balance', 'beneficiaryName'],
    headers: ['Type', 'Institution', 'Balance', 'Beneficiary'],
  },
  {
    key: 'lifeInsurance',
    label: 'Life Insurance',
    icon: Shield,
    valueField: 'faceValue',
    columns: ['type', 'owner', 'faceValue', 'cashValue', 'beneficiary'],
    headers: ['Type', 'Owner', 'Face Value', 'Cash Value', 'Beneficiary'],
  },
  {
    key: 'business',
    label: 'Business Interests',
    icon: Briefcase,
    valueField: 'estimatedValue',
    columns: ['entityName', 'entityType', 'ownershipPct', 'estimatedValue', 'buySellAgreement'],
    headers: ['Entity', 'Type', 'Ownership', 'Est. Value', 'Buy-Sell'],
  },
  {
    key: 'investments',
    label: 'Investment Accounts',
    icon: TrendingUp,
    valueField: 'balance',
    columns: ['institution', 'accountType', 'balance', 'ownership'],
    headers: ['Institution', 'Type', 'Balance', 'Ownership'],
  },
  {
    key: 'bank',
    label: 'Bank Accounts',
    icon: Landmark,
    valueField: 'balance',
    columns: ['institution', 'type', 'balance'],
    headers: ['Institution', 'Type', 'Balance'],
  },
  {
    key: 'personalProperty',
    label: 'Personal Property',
    icon: Car,
    valueField: 'estimatedValue',
    columns: ['description', 'estimatedValue'],
    headers: ['Description', 'Est. Value'],
  },
  {
    key: 'other',
    label: 'Other Assets',
    icon: Package,
    valueField: 'estimatedValue',
    columns: ['description', 'estimatedValue'],
    headers: ['Description', 'Est. Value'],
  },
];

const MONEY_FIELDS = ['estimatedValue', 'mortgageBalance', 'balance', 'faceValue', 'cashValue'];

function fmt(val, field) {
  if (MONEY_FIELDS.includes(field)) {
    const n = typeof val === 'number' ? val : Number(val);
    if (isNaN(n) || n === 0) return '$0';
    return '$' + n.toLocaleString('en-US');
  }
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  return val || '—';
}

function catTotal(items, valField) {
  return items.reduce((s, item) => s + (Number(item[valField]) || 0), 0);
}

// Flags for items needing attention
const DATA_FLAGS = [
  { item: 'Chen Engineering Consultants LLC', flag: 'No buy-sell agreement on file', severity: 'warning' },
  { item: 'Term Life — Robert', flag: 'Through employer — verify portability on retirement', severity: 'info' },
  { item: 'Rental Property', flag: 'Verify current tenant status and lease terms', severity: 'info' },
];

export default function AssetsTab({ donor }) {
  const isChen = donor.id === 'donor-15';
  const data = isChen ? CHEN_ASSET_WIZARD : null;
  const total = isChen ? CHEN_ASSET_TOTAL : 0;

  if (!data) {
    return (
      <div className="text-center py-16">
        <Package size={36} className="text-muted/30 mx-auto mb-3" />
        <p className="text-muted text-sm font-serif italic">
          No asset data submitted for this donor.
        </p>
      </div>
    );
  }

  const lastUpdated = new Date(data.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const totalMortgage =
    data.realEstate.reduce((s, i) => s + (i.mortgageBalance || 0), 0);
  const netEstate = total - totalMortgage;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-serif text-navy">Asset Summary</h2>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted">
            <Clock size={12} />
            Last updated: {lastUpdated}
          </div>
        </div>
        <Button variant="secondary" className="text-xs">
          <span className="flex items-center gap-1.5">
            <Download size={13} />
            Export to PDF
          </span>
        </Button>
      </div>

      {/* Grand total card */}
      <div className="bg-navy text-white rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">
            Estimated Total Estate Value
          </p>
          <p className="text-2xl font-bold mt-1">
            ${total.toLocaleString('en-US')}
          </p>
        </div>
        <div className="text-right text-sm">
          <p className="text-white/60">Less mortgages: ${totalMortgage.toLocaleString('en-US')}</p>
          <p className="text-white font-semibold mt-0.5">
            Net Estate: ${netEstate.toLocaleString('en-US')}
          </p>
        </div>
      </div>

      {/* Category tables */}
      {CATEGORIES.map((cat) => {
        const items = data[cat.key] || [];
        if (items.length === 0) return null;
        const sub = catTotal(items, cat.valueField);
        const Icon = cat.icon;

        return (
          <div key={cat.key} className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Icon size={15} className="text-teal" />
                <h3 className="text-sm font-semibold text-navy">{cat.label}</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-muted">
                  {items.length}
                </span>
              </div>
              <p className="text-sm font-semibold text-navy">
                ${sub.toLocaleString('en-US')}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    {cat.headers.map((h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] uppercase tracking-wider text-muted font-semibold px-5 py-2"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const flagMatch = DATA_FLAGS.find(
                      (f) =>
                        (item.entityName && f.item.includes(item.entityName)) ||
                        (item.type && item.owner && f.item.includes(item.type) && f.item.includes(item.owner)) ||
                        (item.propertyType && f.item.includes(item.propertyType))
                    );

                    return (
                      <tr key={item.id} className="border-b border-border/20 last:border-0 hover:bg-slate-50/50">
                        {cat.columns.map((col) => (
                          <td key={col} className="px-5 py-2.5 text-charcoal">
                            <div className="flex items-center gap-1.5">
                              {fmt(item[col], col)}
                              {col === cat.columns[0] && flagMatch && (
                                <AlertTriangle size={12} className="text-amber-500 shrink-0" />
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      {/* Data quality flags */}
      {DATA_FLAGS.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={15} className="text-amber-600" />
            <h3 className="text-sm font-semibold text-amber-800">Items Requiring Clarification</h3>
          </div>
          <div className="space-y-2">
            {DATA_FLAGS.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-amber-500 mt-0.5 shrink-0">
                  {f.severity === 'warning' ? '!' : 'i'}
                </span>
                <p className="text-amber-800">
                  <span className="font-medium">{f.item}:</span> {f.flag}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Before/After estate comparison */}
      <div className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-5">
        <h3 className="text-sm font-semibold text-navy mb-4">Estate Value Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <p className="text-[10px] text-muted uppercase tracking-wider font-semibold mb-1">
              Gross Estate Value
            </p>
            <p className="text-xl font-bold text-navy">
              ${total.toLocaleString('en-US')}
            </p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <p className="text-[10px] text-muted uppercase tracking-wider font-semibold mb-1">
              Net Estate Value
            </p>
            <p className="text-xl font-bold text-navy">
              ${netEstate.toLocaleString('en-US')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
