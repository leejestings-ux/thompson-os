import { useState, useEffect, useRef } from 'react';
import {
  Users,
  FileText,
  CheckCircle2,
  Clock,
  TrendingDown,
  UserPlus,
  BarChart3,
  Eye,
} from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import StatCard from '../../components/shared/StatCard';
import Button from '../../components/shared/Button';

// ── Mock Data ────────────────────────────────────────────────────────────────

const ASSOCIATES = [
  { id: 1, name: 'Catherine Mercer', role: 'Senior Associate', activeDonors: 14, svosMonth: 4, avgTime: '1.8 hrs', status: 'Active' },
  { id: 2, name: 'David Harrington', role: 'Associate', activeDonors: 12, svosMonth: 3, avgTime: '2.3 hrs', status: 'Active' },
  { id: 3, name: 'Rebecca Townsend', role: 'Associate', activeDonors: 11, svosMonth: 3, avgTime: '2.1 hrs', status: 'Active' },
  { id: 4, name: 'James Whitaker', role: 'Junior Associate', activeDonors: 10, svosMonth: 2, avgTime: '2.8 hrs', status: 'Training' },
];

const PIPELINE_STAGES = [
  { label: 'Initial Contact', count: 8, color: 'bg-blue-500' },
  { label: 'VBQ Sent', count: 6, color: 'bg-amber-500' },
  { label: 'VBQ Complete', count: 10, color: 'bg-emerald-500' },
  { label: 'SVO Draft', count: 12, color: 'bg-violet-500' },
  { label: 'SVO Delivered', count: 7, color: 'bg-teal' },
  { label: 'Closed', count: 4, color: 'bg-slate-400' },
];

const RECENT_ACTIVITY = [
  { initials: 'CM', name: 'Catherine Mercer', action: 'delivered SVO to', donor: 'Eleanor Fairchild', time: '15 min ago', dot: 'bg-emerald' },
  { initials: 'DH', name: 'David Harrington', action: 'started SVO draft for', donor: 'Walter Jameson', time: '42 min ago', dot: 'bg-violet-500' },
  { initials: 'RT', name: 'Rebecca Townsend', action: 'completed intake review for', donor: 'Thomas & Gloria Reed', time: '1 hr ago', dot: 'bg-teal' },
  { initials: 'CM', name: 'Catherine Mercer', action: 'scheduled meeting with', donor: 'Richard & Anne Holloway', time: '2 hrs ago', dot: 'bg-blue-500' },
  { initials: 'JW', name: 'James Whitaker', action: 'sent VBQ reminder to', donor: 'Dorothy Simmons', time: '2 hrs ago', dot: 'bg-amber-500' },
  { initials: 'DH', name: 'David Harrington', action: 'added meeting notes for', donor: 'Charles Pennington', time: '3 hrs ago', dot: 'bg-navy' },
  { initials: 'RT', name: 'Rebecca Townsend', action: 'flagged concern for', donor: 'Virginia Caldwell', time: '4 hrs ago', dot: 'bg-muted-red' },
  { initials: 'CM', name: 'Catherine Mercer', action: 'completed SVO for', donor: 'Margaret Chen', time: 'Yesterday', dot: 'bg-emerald' },
  { initials: 'JW', name: 'James Whitaker', action: 'onboarded new donor', donor: 'Henry Blackwell', time: 'Yesterday', dot: 'bg-blue-500' },
  { initials: 'DH', name: 'David Harrington', action: 'generated renewal report for', donor: 'Patricia Williams', time: 'Yesterday', dot: 'bg-amber-500' },
];

const DEADLINES = [
  { donor: 'Virginia Caldwell', task: 'SVO draft due', date: 'Feb 8', status: 'overdue' },
  { donor: 'Walter Jameson', task: 'Intake follow-up', date: 'Feb 9', status: 'overdue' },
  { donor: 'Richard Holloway', task: 'Meeting prep', date: 'Feb 10', status: 'today' },
  { donor: 'Eleanor Fairchild', task: 'Donor feedback review', date: 'Feb 11', status: 'upcoming' },
  { donor: 'Thomas Reed', task: 'SVO delivery', date: 'Feb 12', status: 'upcoming' },
  { donor: 'Dorothy Simmons', task: 'VBQ reminder', date: 'Feb 14', status: 'upcoming' },
];

const NPO_SUMMARY = [
  { name: 'Grace Community Foundation', associate: 'Catherine Mercer', activeDonors: 5, lastContact: 'Feb 8, 2025' },
  { name: 'Heartland Children\'s Hospital', associate: 'David Harrington', activeDonors: 4, lastContact: 'Feb 6, 2025' },
  { name: 'Appalachian Heritage Trust', associate: 'Rebecca Townsend', activeDonors: 3, lastContact: 'Feb 3, 2025' },
  { name: 'Midwest Seminary Endowment', associate: 'Catherine Mercer', activeDonors: 3, lastContact: 'Feb 7, 2025' },
];

const DEMO_DATE = new Date('2025-02-10').toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const maxStage = Math.max(...PIPELINE_STAGES.map((s) => s.count));

const STATUS_STYLES = {
  overdue: 'bg-red-50 text-red-700 border border-red-200',
  today: 'bg-amber-50 text-amber-700 border border-amber-200',
  upcoming: 'bg-teal-50 text-teal-700 border border-teal-200',
};

export default function AdminDashboard() {
  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 animate-fadeIn">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[28px] font-serif text-navy tracking-tight">
              Firm Dashboard
            </h1>
            <p className="text-sm text-muted mt-1">{DEMO_DATE}</p>
            <p className="text-sm text-charcoal/70 mt-0.5">
              Principal View &mdash; P. Cayce Powell, J.D., FCEP
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Active Donors" value={47} icon={Users} accent="bg-blue-50 text-blue-600" animated />
            <StatCard label="SVOs In Progress" value={12} icon={FileText} accent="bg-violet-50 text-violet-600" animated />
            <StatCard label="SVOs Completed (Q1)" value={8} icon={CheckCircle2} accent="bg-emerald-50 text-emerald-600" animated />
            <div className="bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md hover:scale-[1.01] transition-all duration-200 text-center flex flex-col items-center">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-50 text-amber-600 mb-3">
                <Clock size={18} />
              </span>
              <div className="flex items-baseline gap-2 justify-center">
                <p className="text-2xl font-serif font-bold text-navy tracking-tight">2.1 hrs</p>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald">
                  <TrendingDown size={12} />
                  -1.7 hrs
                </span>
              </div>
              <p className="text-xs text-muted font-medium mt-0.5">Avg. SVO Completion Time</p>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* Associate Performance */}
              <div className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider">Associate Performance</h2>
                  <div className="w-10 h-0.5 bg-teal rounded mt-2" />
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#EEF2F7]">
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">Name</th>
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">Active</th>
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">SVOs/Mo</th>
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">Avg Time</th>
                      <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ASSOCIATES.map((a, i) => (
                      <tr key={a.id} className={`border-b border-border/50 last:border-0 transition-colors duration-150 hover:bg-[#EEF2F7] ${i % 2 === 1 ? 'bg-warm-white' : ''}`}>
                        <td className="px-4 py-3">
                          <p className="font-serif font-medium text-charcoal">{a.name}</p>
                          <p className="text-[11px] text-muted">{a.role}</p>
                        </td>
                        <td className="px-4 py-3 text-charcoal font-semibold">{a.activeDonors}</td>
                        <td className="px-4 py-3 text-charcoal font-semibold">{a.svosMonth}</td>
                        <td className="px-4 py-3 text-charcoal">{a.avgTime}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wide ${
                            a.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>{a.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pipeline Health */}
              <div className="bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-1">Pipeline Health</h2>
                <div className="w-10 h-0.5 bg-teal rounded mb-4" />
                <div className="space-y-3">
                  {PIPELINE_STAGES.map((stage) => (
                    <div key={stage.label} className="flex items-center gap-3">
                      <span className="text-xs text-charcoal w-28 shrink-0 truncate">{stage.label}</span>
                      <div className="flex-1 h-6 bg-slate-100 rounded-md overflow-hidden">
                        <div
                          className={`h-full ${stage.color} rounded-md transition-all duration-700 flex items-center justify-end pr-2`}
                          style={{ width: `${(stage.count / maxStage) * 100}%` }}
                        >
                          <span className="text-[10px] font-bold text-white">{stage.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-1">Recent Activity</h2>
                <div className="w-10 h-0.5 bg-teal rounded mb-4" />
                <div className="space-y-0 max-h-[380px] overflow-y-auto">
                  {RECENT_ACTIVITY.map((event, i) => (
                    <div key={i} className={`flex items-start gap-3 py-2.5 ${i > 0 ? 'border-t border-border/40' : ''}`}>
                      <div className="w-7 h-7 rounded-full bg-navy/8 flex items-center justify-center shrink-0 text-[10px] font-bold text-navy">
                        {event.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-charcoal leading-relaxed">
                          <span className="font-semibold">{event.name}</span>{' '}
                          {event.action}{' '}
                          <span className="font-semibold text-navy">{event.donor}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${event.dot}`} />
                        <span className="text-[10px] text-muted whitespace-nowrap">{event.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Deadlines */}
              <div className="bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
                <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-1">Upcoming Deadlines</h2>
                <div className="w-10 h-0.5 bg-teal rounded mb-4" />
                <div className="space-y-2.5">
                  {DEADLINES.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0 ${STATUS_STYLES[d.status]}`}>
                        {d.status === 'overdue' ? 'Overdue' : d.status === 'today' ? 'Today' : d.date}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-charcoal truncate">{d.donor}</p>
                        <p className="text-[11px] text-muted">{d.task}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* NPO Summary */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider">NPO Client Summary</h2>
                <div className="w-10 h-0.5 bg-teal rounded mt-2" />
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#EEF2F7]">
                    <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">Organization</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">Associate</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">Active</th>
                    <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted uppercase tracking-wider">Last Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {NPO_SUMMARY.map((npo, i) => (
                    <tr key={i} className={`border-b border-border/50 last:border-0 transition-colors duration-150 hover:bg-[#EEF2F7] ${i % 2 === 1 ? 'bg-warm-white' : ''}`}>
                      <td className="px-4 py-3 font-serif font-medium text-navy">{npo.name}</td>
                      <td className="px-4 py-3 text-charcoal">{npo.associate}</td>
                      <td className="px-4 py-3 text-charcoal font-semibold">{npo.activeDonors}</td>
                      <td className="px-4 py-3 text-muted">{npo.lastContact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
              <h2 className="text-sm font-serif font-semibold text-navy uppercase tracking-wider mb-1">Quick Actions</h2>
              <div className="w-10 h-0.5 bg-teal rounded mb-4" />
              <div className="space-y-2.5">
                <Button className="w-full flex items-center justify-center gap-2">
                  <UserPlus size={15} /> Add Associate
                </Button>
                <Button variant="teal" className="w-full flex items-center justify-center gap-2">
                  <BarChart3 size={15} /> Generate Firm Report
                </Button>
                <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                  <Eye size={15} /> View All Donors
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
