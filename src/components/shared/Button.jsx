const VARIANTS = {
  primary: 'bg-navy text-white hover:bg-dark-navy shadow-sm',
  secondary: 'bg-white text-navy border border-navy/20 hover:bg-[#EEF2F7] hover:border-navy/30',
  ghost: 'text-muted hover:text-charcoal hover:bg-slate-50',
  danger: 'bg-muted-red text-white hover:bg-[#A93226] shadow-sm',
  teal: 'bg-teal text-white hover:bg-teal-dark shadow-sm',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 ${VARIANTS[variant] || VARIANTS.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
