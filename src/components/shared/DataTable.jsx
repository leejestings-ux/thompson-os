export default function DataTable({ columns, data, emptyMessage }) {
  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#EEF2F7]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 text-[11px] font-semibold text-muted uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-muted text-sm font-serif italic"
              >
                {emptyMessage || 'No data'}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id || i}
                className={`border-b border-border/50 last:border-0 transition-colors duration-150 hover:bg-[#EEF2F7] cursor-pointer ${
                  i % 2 === 1 ? 'bg-warm-white' : ''
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-charcoal">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
