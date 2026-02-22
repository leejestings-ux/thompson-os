export default function Tabs({ items, active, onChange }) {
  return (
    <div className="flex items-center gap-1 px-6 border-b border-border bg-white flex-shrink-0 overflow-x-auto">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onChange(item.key)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
            active === item.key
              ? 'border-teal text-navy'
              : 'border-transparent text-muted hover:text-charcoal hover:border-slate-200'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
