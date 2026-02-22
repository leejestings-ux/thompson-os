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
  User,
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
    return `flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-150 relative ${
      isActive
        ? 'bg-white/12 text-white before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-teal before:rounded-r'
        : 'text-white/55 hover:text-white hover:bg-white/8 hover:before:absolute hover:before:left-0 hover:before:top-1 hover:before:bottom-1 hover:before:w-[3px] hover:before:bg-teal/40 hover:before:rounded-r'
    }`;
  };

  const sidebar = (
    <>
      {/* Logo */}
      <div className="px-5 h-16 flex items-center border-b border-white/8">
        <button
          onClick={() => navigate('/associate/today')}
          className="text-left"
        >
          <h1 className="text-white text-lg font-serif tracking-tight">
            Thompson <span className="text-teal">&amp;</span> Associates
          </h1>
          <p className="text-white/40 text-[10px] mt-0.5 uppercase tracking-widest">
            <span className="text-teal font-semibold">OS</span> &middot; Associate Console
          </p>
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
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
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/55 hover:text-white hover:bg-white/8 transition-all duration-150"
          >
            <Building2 size={18} strokeWidth={1.5} />
            <span className="flex-1 text-left sidebar-label">Clients</span>
            <span className="sidebar-label transition-transform duration-200">
              {clientsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-200 ${clientsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="ml-5 pl-4 border-l border-white/8 mt-1 space-y-0.5">
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
          </div>
        </div>

        {/* Divider + secondary nav */}
        <div className="pt-4 mt-4 border-t border-white/8 space-y-0.5">
          {NAV_BOTTOM.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={linkClass(to)} onClick={() => setMobileOpen(false)}>
              <Icon size={18} strokeWidth={1.5} />
              <span className="sidebar-label">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User + Exit */}
      <div className="px-3 pb-4 border-t border-white/8 pt-3">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
            <User size={14} className="text-teal" />
          </div>
          <div className="sidebar-label min-w-0">
            <p className="text-white text-xs font-medium truncate">Catherine Mercer</p>
            <p className="text-white/40 text-[10px]">Senior Associate</p>
          </div>
        </div>
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/35 hover:text-white/70 hover:bg-white/5 transition-all duration-150"
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
      <aside className="hidden md:flex w-56 lg:w-56 md:w-16 flex-shrink-0 bg-dark-navy flex-col">
        {sidebar}
      </aside>

      {/* Mobile header + drawer */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-12 bg-dark-navy flex items-center px-4 gap-3">
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white transition-transform duration-200 active:scale-90">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="text-white text-sm font-serif">Thompson &amp; Associates</span>
      </div>
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 z-30 bg-black/40 animate-overlayFadeIn" onClick={() => setMobileOpen(false)} />
          <aside className="md:hidden fixed top-12 left-0 bottom-0 z-30 w-56 bg-dark-navy flex flex-col animate-slideInRight">
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
