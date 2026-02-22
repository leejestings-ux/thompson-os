export default function PageHeader({ title, subtitle, breadcrumb, children }) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-white flex-shrink-0">
      <div>
        {breadcrumb && (
          <p className="text-[11px] text-muted uppercase tracking-wider mb-1">{breadcrumb}</p>
        )}
        <h1 className="text-[22px] font-serif text-navy tracking-tight">
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
