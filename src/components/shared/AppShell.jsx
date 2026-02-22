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
  LayoutDashboard,
  BookOpen,
  RefreshCw,
  Sparkles,
  Shield,
  UserCircle,
} from 'lucide-react';
import { organizations } from '../../lib/mockData';

const NAV_MAIN = [
  { to: '/associate/today', label: 'Today', icon: CalendarDays },
  { to: '/associate/pipeline', label: 'Pipeline', icon: Columns3 },
  { to: '/associate/ask', label: 'Ask Thompson OS', icon: Sparkles },
];

const NAV_FIRM = [
  { to: '/associate/admin', label: 'Firm Dashboard', icon: LayoutDashboard },
  { to: '/associate/training', label: 'Training', icon: BookOpen },
  { to: '/associate/renewals', label: 'Renewals', icon: RefreshCw },
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
  const [firmOpen, setFirmOpen] = useState(
    ['/associate/admin', '/associate/training', '/associate/renewals'].some((p) => location.pathname.startsWith(p))
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRoleState] = useState(() => {
    try { return localStorage.getItem('thompson-role') || 'admin'; } catch { return 'admin'; }
  });
  const setRole = (r) => {
    setRoleState(r);
    try { localStorage.setItem('thompson-role', r); } catch {}
    window.dispatchEvent(new Event('thompson-role-change'));
  };

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

        {/* Firm Management section */}
        {role === 'admin' && (
          <div>
            <button
              onClick={() => setFirmOpen(!firmOpen)}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-white/55 hover:text-white hover:bg-white/8 transition-all duration-150"
            >
              <Shield size={18} strokeWidth={1.5} />
              <span className="flex-1 text-left sidebar-label">Firm Management</span>
              <span className="sidebar-label transition-transform duration-200">
                {firmOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${firmOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="ml-5 pl-4 border-l border-white/8 mt-1 space-y-0.5">
                {NAV_FIRM.map(({ to, label, icon: Icon }) => (
                  <NavLink key={to} to={to} className={linkClass(to)} onClick={() => setMobileOpen(false)}>
                    <Icon size={14} strokeWidth={1.5} />
                    <span className="text-xs sidebar-label">{label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}

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

      {/* Role Toggle */}
      <div className="px-3 pt-3 border-t border-white/8">
        <div className="sidebar-label">
          <p className="text-white/40 text-[9px] uppercase tracking-widest font-semibold px-3 mb-1.5">View</p>
          <div className="flex bg-white/8 rounded-lg p-0.5 mx-2 mb-3">
            <button
              onClick={() => setRole('associate')}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-medium py-1.5 rounded-md transition-all duration-200 ${
                role === 'associate'
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <UserCircle size={12} />
              Associate
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-1.5 text-[10px] font-medium py-1.5 rounded-md transition-all duration-200 ${
                role === 'admin'
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Shield size={12} />
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* User + Exit */}
      <div className="px-3 pb-4 pt-2">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-teal/20 flex items-center justify-center shrink-0">
            <User size={14} className="text-teal" />
          </div>
          <div className="sidebar-label min-w-0">
            <p className="text-white text-xs font-medium truncate">{role === 'admin' ? 'P. Cayce Powell' : 'Catherine Mercer'}</p>
            <p className="text-white/40 text-[10px]">{role === 'admin' ? 'Principal' : 'Senior Associate'}</p>
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
