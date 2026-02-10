export default function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="bg-white rounded-xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <span
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}
        >
          <Icon size={18} />
        </span>
      </div>
      <p className="text-2xl font-bold text-navy tracking-tight">{value}</p>
      <p className="text-xs text-muted font-medium mt-0.5">{label}</p>
    </div>
  );
}
