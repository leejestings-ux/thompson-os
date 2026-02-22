import { getAuditLog } from '../../../lib/donorMockData';

export default function AuditTab({ donor }) {
  const log = getAuditLog(donor.id);

  if (log.length === 0) {
    return (
      <div className="text-center py-12 animate-fadeIn">
        <p className="text-muted text-sm font-serif italic">No audit entries.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] animate-fadeIn">
      {log.map((entry, i) => {
        const date = new Date(entry.timestamp);
        const isSystem = entry.user === 'System';
        return (
          <div
            key={entry.id}
            className={`flex items-start gap-4 px-5 py-3 transition-colors duration-150 hover:bg-[#EEF2F7] ${
              i > 0 ? 'border-t border-border/50' : ''
            } ${i % 2 === 1 ? 'bg-warm-white' : ''}`}
          >
            <div className="w-20 shrink-0">
              <p className="text-xs text-muted font-mono">
                {date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-[10px] text-muted font-mono">
                {date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-charcoal">{entry.action}</p>
              <p
                className={`text-xs mt-0.5 ${
                  isSystem ? 'text-muted font-serif italic' : 'text-navy font-medium'
                }`}
              >
                {entry.user}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
