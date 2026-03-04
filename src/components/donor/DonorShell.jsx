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
    <div className="pp-shell min-h-screen bg-pp-cream">
      <header className="border-b border-pp-sage/20 bg-pp-navy">
        <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-5 flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(backTo || '/donor/home')}
              className="text-pp-cream/60 hover:text-pp-cream transition-all duration-150 hover:scale-110"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-lg tracking-tight leading-tight text-pp-cream" style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 600 }}>
              <span className="text-pp-gold">P</span>eriscope Path
            </p>
            <p className="text-[11px] text-pp-cream/50 uppercase tracking-wider" style={{ fontFamily: "'Lato', system-ui, sans-serif", fontStyle: 'normal' }}>
              Provided by Thompson &amp; Associates
            </p>
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
                      ? 'border-pp-gold text-pp-cream'
                      : 'border-transparent text-pp-cream/50 hover:text-pp-cream/80 hover:border-pp-cream/20'
                  }`
                }
                style={{ fontFamily: "'Lato', system-ui, sans-serif", fontStyle: 'normal' }}
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
      <footer className="border-t border-pp-sage/20 py-6">
        <p className="text-center text-xs text-pp-sage" style={{ fontFamily: "'Lato', system-ui, sans-serif", fontStyle: 'normal' }}>
          Provided by Thompson &amp; Associates
        </p>
      </footer>
    </div>
  );
}
