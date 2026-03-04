import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Paperclip,
} from 'lucide-react';
import AppShell from '../../components/shared/AppShell';
import {
  requests,
  planningAttorneys,
  getAttorneyName,
  REQUEST_STATUSES,
} from '../../lib/requestMockData';

const STATUS_COLORS = {
  Open: 'bg-blue-50 text-blue-700 border border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border border-amber-200',
  Drafted: 'bg-violet-50 text-violet-700 border border-violet-200',
  Fulfilled: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Closed: 'bg-slate-100 text-slate-600 border border-slate-200',
};

const FILTER_TABS = ['All', 'My Queue', 'Rush', 'Completed'];

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function formatDateTime(d) {
  return new Date(d).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function WorkQueue() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortField, setSortField] = useState('dueDate');
  const [sortDir, setSortDir] = useState('asc');
  const [expandedRow, setExpandedRow] = useState(null);
  const [statuses, setStatuses] = useState(
    Object.fromEntries(requests.map((r) => [r.id, r.status]))
  );
  const [planningComments, setPlanningComments] = useState(
    Object.fromEntries(requests.map((r) => [r.id, r.planningComments]))
  );

  // Current user = Jason Meredith for demo
  const currentUser = 'pa-1';

  const filtered = useMemo(() => {
    let list = [...requests];
    if (activeFilter === 'My Queue') {
      list = list.filter((r) => r.assignedTo === currentUser);
    } else if (activeFilter === 'Rush') {
      list = list.filter((r) => r.priority === 'Rush');
    } else if (activeFilter === 'Completed') {
      list = list.filter((r) => ['Fulfilled', 'Closed'].includes(statuses[r.id]));
    }
    list.sort((a, b) => {
      let av = a[sortField];
      let bv = b[sortField];
      if (sortField === 'dueDate') {
        av = new Date(av);
        bv = new Date(bv);
      }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return list;
  }, [activeFilter, sortField, sortDir, statuses]);

  function toggleSort(field) {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  }

  function updateStatus(id, newStatus) {
    setStatuses((prev) => ({ ...prev, [id]: newStatus }));
  }

  const sortArrow = (field) => {
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' ↑' : ' ↓';
  };

  const counts = {
    All: requests.length,
    'My Queue': requests.filter((r) => r.assignedTo === currentUser).length,
    Rush: requests.filter((r) => r.priority === 'Rush').length,
    Completed: requests.filter((r) => ['Fulfilled', 'Closed'].includes(r.status)).length,
  };

  return (
    <AppShell>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 animate-fadeIn">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[28px] font-serif text-navy tracking-tight">
              Work Queue
            </h1>
            <p className="text-sm text-muted mt-1 font-serif">
              Internal request management for planning team
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 mb-6 bg-white rounded-lg border border-border p-1 w-fit">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 ${
                  activeFilter === tab
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-muted hover:text-charcoal hover:bg-slate-50'
                }`}
              >
                {tab}
                <span className={`ml-1.5 text-[10px] font-bold ${
                  activeFilter === tab ? 'text-white/70' : 'text-muted/60'
                }`}>
                  {counts[tab]}
                </span>
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-border shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-slate-50/50">
                    <th className="w-8" />
                    {[
                      { key: 'id', label: '#', width: 'w-16' },
                      { key: 'donorName', label: 'Donor' },
                      { key: 'requestingAssociate', label: 'Associate' },
                      { key: 'type', label: 'Type' },
                      { key: 'priority', label: 'Priority', width: 'w-20' },
                      { key: 'dueDate', label: 'Due Date', width: 'w-24' },
                      { key: 'assignedTo', label: 'Assigned To' },
                      { key: 'status', label: 'Status', width: 'w-32' },
                    ].map((col) => (
                      <th
                        key={col.key}
                        className={`text-left text-[10px] uppercase tracking-wider text-muted font-semibold px-4 py-3 cursor-pointer hover:text-navy transition-colors duration-150 select-none ${col.width || ''}`}
                        onClick={() => toggleSort(col.key)}
                      >
                        {col.label}{sortArrow(col.key)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((req) => {
                    const isExpanded = expandedRow === req.id;
                    const isRush = req.priority === 'Rush';
                    const currentStatus = statuses[req.id];

                    return (
                      <React.Fragment key={req.id}>
                        <tr
                          className={`border-b border-border/30 hover:bg-slate-50/50 cursor-pointer transition-colors duration-150 ${
                            isRush ? 'border-l-4 border-l-pp-gold' : ''
                          }`}
                          onClick={() =>
                            setExpandedRow(isExpanded ? null : req.id)
                          }
                        >
                          <td className="pl-4 py-3">
                            {isExpanded ? (
                              <ChevronDown size={14} className="text-muted" />
                            ) : (
                              <ChevronRight size={14} className="text-muted" />
                            )}
                          </td>
                          <td className="px-4 py-3 text-muted font-mono text-xs">
                            {req.id.replace('req-', '')}
                          </td>
                          <td className="px-4 py-3 font-medium text-navy">
                            {req.donorName}
                          </td>
                          <td className="px-4 py-3 text-charcoal">
                            {req.requestingAssociate}
                          </td>
                          <td className="px-4 py-3 text-charcoal text-xs">
                            {req.type}
                          </td>
                          <td className="px-4 py-3">
                            {isRush ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pp-gold/15 text-pp-gold border border-pp-gold/30 uppercase">
                                Rush
                              </span>
                            ) : (
                              <span className="text-xs text-muted">Normal</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-charcoal">
                            {formatDate(req.dueDate)}
                          </td>
                          <td className="px-4 py-3 text-charcoal text-xs">
                            {getAttorneyName(req.assignedTo)}
                          </td>
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={currentStatus}
                              onChange={(e) => updateStatus(req.id, e.target.value)}
                              className={`text-[10px] font-semibold px-2 py-1 rounded-full cursor-pointer ${STATUS_COLORS[currentStatus]} appearance-none text-center`}
                            >
                              {REQUEST_STATUSES.map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <tr>
                            <td colSpan={9} className="bg-slate-50/70 px-6 py-5">
                              <div className="max-w-3xl space-y-4">
                                {/* Associate Comments */}
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1.5">
                                    Associate Comments
                                  </p>
                                  <div className="bg-white border border-border rounded-lg p-3 text-sm text-charcoal">
                                    {req.associateComments}
                                  </div>
                                </div>

                                {/* Planning Team Comments */}
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1.5">
                                    Planning Team Comments
                                  </p>
                                  <textarea
                                    value={planningComments[req.id]}
                                    onChange={(e) =>
                                      setPlanningComments((prev) => ({
                                        ...prev,
                                        [req.id]: e.target.value,
                                      }))
                                    }
                                    placeholder="Add internal notes..."
                                    rows={2}
                                    className="w-full border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 resize-none transition-all duration-200"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>

                                {/* Attachments placeholder */}
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1.5">
                                    Attachments
                                  </p>
                                  <div className="flex items-center gap-2 text-sm text-muted">
                                    <Paperclip size={13} />
                                    No attachments
                                  </div>
                                </div>

                                {/* Timeline */}
                                <div>
                                  <p className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-2">
                                    Timeline
                                  </p>
                                  <div className="space-y-2">
                                    {req.timeline.map((event, i) => (
                                      <div key={i} className="flex items-center gap-3">
                                        <div className="flex items-center gap-2 text-xs text-muted w-36 shrink-0">
                                          <Clock size={11} />
                                          {formatDateTime(event.at)}
                                        </div>
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[event.status]}`}>
                                          {event.status}
                                        </span>
                                        <span className="text-xs text-charcoal">
                                          by {event.by}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
