const VARIANTS = {
  primary: 'bg-navy text-white hover:bg-navy-light',
  secondary: 'bg-white text-charcoal border border-border hover:border-navy/30',
  ghost: 'text-muted hover:text-charcoal hover:bg-slate-50',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
