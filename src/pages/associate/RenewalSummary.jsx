import { useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  FileText,
  ArrowUpRight,
  Filter,
  Search,
} from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import StatCard from '../../components/shared/StatCard';
import Button from '../../components/shared/Button';

// ── Mock Data ────────────────────────────────────────────────────────────────

const RENEWAL_QUEUE = [
  { id: 1, donor: 'Eleanor Fairchild', associate: 'Catherine Mercer', lastSvo: 'Feb 2024', dueDate: 'Feb 2025', status: 'overdue', changes: 3, priority: 'high' },
  { id: 2, donor: 'Walter Jameson', associate: 'David Harrington', lastSvo: 'Mar 2024', dueDate: 'Mar 2025', status: 'due-soon', changes: 1, priority: 'medium' },
  { id: 3, donor: 'Thomas & Gloria Reed', associate: 'Rebecca Townsend', lastSvo: 'Apr 2024', dueDate: 'Apr 2025', status: 'due-soon', changes: 2, priority: 'medium' },
  { id: 4, donor: 'Richard & Anne Holloway', associate: 'Catherine Mercer', lastSvo: 'May 2024', dueDate: 'May 2025', status: 'upcoming', changes: 0, priority: 'low' },
  { id: 5, donor: 'Charles Pennington', associate: 'David Harrington', lastSvo: 'Jun 2024', dueDate: 'Jun 2025', status: 'upcoming', changes: 1, priority: 'low' },
  { id: 6, donor: 'Margaret Chen', associate: 'Catherine Mercer', lastSvo: 'Jul 2024', dueDate: 'Jul 2025', status: 'upcoming', changes: 0, priority: 'low' },
  { id: 7, donor: 'Dorothy Simmons', associate: 'James Whitaker', lastSvo: 'Aug 2024', dueDate: 'Aug 2025', status: 'upcoming', changes: 0, priority: 'low' },
  { id: 8, donor: 'Patricia Williams', associate: 'David Harrington', lastSvo: 'Sep 2024', dueDate: 'Sep 2025', status: 'completed', changes: 2, priority: 'none' },
];

const INSIGHTS = [
  { icon: TrendingUp, title: 'Values Shift Detected', description: 'Eleanor Fairchild\'s recent communications suggest a shift toward environmental philanthropy. Consider revisiting charitable allocation.', type: 'insight' },
  { icon: AlertTriangle, title: 'Life Event: New Grandchild', description: 'Thomas & Gloria Reed welcomed a grandchild in December. May want to discuss updated family distributions.', type: 'alert' },
  { icon: FileText, title: 'Tax Law Update', description: 'Recent estate tax exemption changes may affect 12 donors. Review threshold calculations in upcoming renewals.', type: 'info' },
  { icon: ArrowUpRight, title: 'Asset Growth Noted', description: 'Walter Jameson\'s portfolio appreciated 18% since last SVO. Consider reviewing charitable giving capacity.', type: 'insight' },
];

const STATUS_CONFIG = {
  overdue: { label: 'Overdue', color: 'bg-red-50 text-red-700 border border-red-200' },
  'due-soon': { label: 'Due Soon', color: 'bg-amber-50 text-amber-700 border border-amber-200' },
  upcoming: { label: 'Upcoming', color: 'bg-teal-50 text-teal-700 border border-teal-200' },
  completed: { label: 'Completed', color: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
};

const PRIORITY_DOT = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-slate-300',
  none: 'bg-emerald-400',
};

const INSIGHT_STYLES = {
  insight: 'bg-teal/8 border-teal/20',
  alert: 'bg-amber-50 border-amber-200',
  info: 'bg-blue-50 border-blue-200',
};

const INSIGHT_ICON_STYLES = {
  insight: 'bg-teal/15 text-teal',
  alert: 'bg-amber-100 text-amber-600',
  info: 'bg-blue-100 text-blue-600',
};

export default function RenewalSummary() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const overdueCount = RENEWAL_QUEUE.filter((r) => r.status === 'overdue').length;
  const dueSoonCount = RENEWAL_QUEUE.filter((r) => r.status === 'due-soon').length;

  const filtered = RENEWAL_QUEUE.filter((r) => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (searchQuery && !r.donor.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 animate-fadeIn">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[28px] font-serif text-navy tracking-tight">
              Annual Renewal Summary
            </h1>
            <p className="text-sm text-muted mt-1">
              Track annual SVO renewals and surface important changes for donor review meetings.
            </p>
          </div>

          {/* Alert Banner */}
          {overdueCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 mb-6 flex items-center gap-3 animate-fadeIn">
              <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} className="text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-800">
                  {overdueCount} renewal{overdueCount > 1 ? 's' : ''} overdue
                </p>
                <p className="text-xs text-red-600 mt-0.5">
                  These donors are past their annual SVO review date. Schedule renewal meetings promptly.
                </p>
              </div>
              <Button variant="danger" className="text-xs shrink-0">
                View Overdue
              </Button>
            </div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Renewals This Year" value={47} icon={RefreshCw} accent="bg-blue-50 text-blue-600" animated />
            <StatCard label="Completed" value={12} icon={CheckCircle2} accent="bg-emerald-50 text-emerald-600" animated />
            <StatCard label="Due This Quarter" value={dueSoonCount + overdueCount} icon={Calendar} accent="bg-amber-50 text-amber-600" animated />
            <StatCard label="Avg. Days to Complete" value={14} icon={Clock} accent="bg-violet-50 text-violet-600" animated />
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Renewal Queue */}
            <div className="lg:col-span-2">
              {/* Filters */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {['all', 'overdue', 'due-soon', 'upcoming', 'completed'].map((key) => (
                    <button
                      key={key}
                      onClick={() => setFilterStatus(key)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                        filterStatus === key
                          ? 'bg-navy text-white'
                          : 'bg-white text-muted border border-border hover:border-navy/30 hover:text-charcoal'
                      }`}
                    >
                      {key === 'all' ? 'All' : key === 'due-soon' ? 'Due Soon' : key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    placeholder="Search donors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-teal/20 focus:border-teal transition-all duration-200"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EEF2F7]">
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider w-6"></th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Donor</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Last SVO</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Due</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Changes</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider">Status</th>
                      <th className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => {
                      const statusCfg = STATUS_CONFIG[r.status];
                      return (
                        <tr key={r.id} className={`border-b border-border/50 last:border-0 transition-colors duration-150 hover:bg-[#EEF2F7] ${i % 2 === 1 ? 'bg-warm-white' : ''}`}>
                          <td className="pl-4 py-3.5">
                            <div className={`w-2 h-2 rounded-full ${PRIORITY_DOT[r.priority]}`} />
                          </td>
                          <td className="px-4 py-3.5">
                            <p className="font-serif font-medium text-charcoal">{r.donor}</p>
                            <p className="text-[11px] text-muted">{r.associate}</p>
                          </td>
                          <td className="px-4 py-3.5 text-xs text-muted">{r.lastSvo}</td>
                          <td className="px-4 py-3.5 text-xs text-charcoal font-medium">{r.dueDate}</td>
                          <td className="px-4 py-3.5">
                            {r.changes > 0 ? (
                              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                {r.changes} flagged
                              </span>
                            ) : (
                              <span className="text-xs text-muted">None</span>
                            )}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wide ${statusCfg.color}`}>
                              {statusCfg.label}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <button className="text-teal hover:text-teal-dark transition-colors duration-200">
                              <ChevronRight size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-sm text-muted">
                          No renewals match your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Insights Panel */}
            <div>
              <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-3">AI-Surfaced Insights</h2>
              <div className="space-y-3">
                {INSIGHTS.map((insight, i) => {
                  const Icon = insight.icon;
                  return (
                    <div
                      key={i}
                      className={`rounded-xl border p-4 transition-all duration-200 hover:shadow-md ${INSIGHT_STYLES[insight.type]}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${INSIGHT_ICON_STYLES[insight.type]}`}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm font-serif font-semibold text-navy mb-1">{insight.title}</h3>
                          <p className="text-xs text-charcoal/70 leading-relaxed">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-1">Renewal Health</h2>
                <div className="w-10 h-0.5 bg-teal rounded mb-4" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">On-time rate</span>
                    <span className="text-sm font-serif font-semibold text-emerald">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Avg. changes per renewal</span>
                    <span className="text-sm font-serif font-semibold text-navy">1.4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Donor satisfaction</span>
                    <span className="text-sm font-serif font-semibold text-navy">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">Renewals w/ values shift</span>
                    <span className="text-sm font-serif font-semibold text-amber-600">23%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
