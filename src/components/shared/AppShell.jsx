import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  Columns3,
  Building2,
  ChevronDown,
  ChevronRight,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { organizations } from '../../lib/mockData';

const NAV_MAIN = [
  { to: '/associate/today', label: 'Today', icon: CalendarDays },
  { to: '/associate/pipeline', label: 'Pipeline', icon: Columns3 },
];

const NAV_BOTTOM = [
  { to: '/associate/reports', label: 'Reports', icon: BarChart3 },
  { to: '/associate/templates', label: 'Templates', icon: FileText },
  { to: '/associate/settings', label: 'Settings', icon: Settings },
];

export default function AppShell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientsOpen, setClientsOpen] = useState(
    location.pathname.startsWith('/associate/npo')
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = (to, exact = true) => {
    const isActive = exact
      ? location.pathname === to
      : location.pathname.startsWith(to);
    return `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-white/60 hover:text-white hover:bg-white/8'
    }`;
  };

  const sidebar = (
    <>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <button
          onClick={() => navigate('/associate/today')}
          className="text-left"
        >
          <h1 className="text-white text-lg font-semibold tracking-tight">
            Thompson OS
          </h1>
          <p className="text-white/50 text-xs mt-0.5">Associate Console</p>
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_MAIN.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkClass(to)} onClick={() => setMobileOpen(false)}>
            <Icon size={18} strokeWidth={location.pathname === to ? 2 : 1.5} />
            <span className="sidebar-label">{label}</span>
          </NavLink>
        ))}

        {/* Clients section */}
        <div>
          <button
            onClick={() => setClientsOpen(!clientsOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-colors"
          >
            <Building2 size={18} strokeWidth={1.5} />
            <span className="flex-1 text-left sidebar-label">Clients</span>
            {clientsOpen ? (
              <ChevronDown size={14} className="sidebar-label" />
            ) : (
              <ChevronRight size={14} className="sidebar-label" />
            )}
          </button>
          {clientsOpen && (
            <div className="ml-5 pl-4 border-l border-white/10 mt-1 space-y-0.5">
              {organizations.map((org) => (
                <NavLink
                  key={org.id}
                  to={`/associate/npo/${org.id}`}
                  className={linkClass(`/associate/npo/${org.id}`)}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="text-xs sidebar-label truncate">{org.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Secondary nav */}
        <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
          {NAV_BOTTOM.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass(to)} onClick={() => setMobileOpen(false)}>
              <Icon size={18} strokeWidth={1.5} />
              <span className="sidebar-label">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Exit */}
      <div className="px-3 pb-4">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          <LogOut size={18} strokeWidth={1.5} />
          <span className="sidebar-label">Exit</span>
        </NavLink>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-warm-white">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-56 lg:w-56 md:w-16 flex-shrink-0 bg-navy flex-col">
        {sidebar}
      </aside>

      {/* Mobile header + drawer */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-12 bg-navy flex items-center px-4 gap-3">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="text-white text-sm font-semibold">Thompson OS</span>
      </div>
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="md:hidden fixed top-12 left-0 bottom-0 z-30 w-56 bg-navy flex flex-col">
            {sidebar}
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex flex-col md:mt-0 mt-12">
        {children}
      </main>
    </div>
  );
}
