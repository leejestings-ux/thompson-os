export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-white flex-shrink-0">
      <div>
        <h1 className="text-xl font-semibold text-navy tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted text-sm mt-0.5">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}
