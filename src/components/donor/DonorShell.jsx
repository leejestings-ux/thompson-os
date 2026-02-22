import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, ClipboardList, FileText, ListChecks } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/donor/home', label: 'Home', icon: Home },
  { to: '/donor/intake', label: 'My Forms', icon: ClipboardList },
  { to: '/donor/deliverables', label: 'Documents', icon: FileText },
  { to: '/donor/next-steps', label: 'Action Items', icon: ListChecks },
];

export default function DonorShell({ children, showBack, backTo }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-white">
      <header className="border-b border-border bg-white">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-5 flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(backTo || '/donor/home')}
              className="text-muted hover:text-charcoal transition-all duration-150 hover:scale-110"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-lg font-serif text-navy tracking-tight leading-tight">
              Thompson &amp; Associates
            </p>
            <p className="text-[11px] text-muted uppercase tracking-wider">Estate Planning Portal</p>
          </div>
        </div>
        {/* Top nav */}
        <div className="max-w-[720px] mx-auto px-4 sm:px-6">
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/donor/intake'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                    isActive
                      ? 'border-teal text-navy'
                      : 'border-transparent text-muted hover:text-charcoal hover:border-slate-200'
                  }`
                }
              >
                <Icon size={14} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-[720px] mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
}
