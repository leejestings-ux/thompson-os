import { NavLink, useLocation } from 'react-router-dom';
import { CalendarDays, Columns3, LogOut } from 'lucide-react';

const navItems = [
  { to: '/associate/today', label: 'Today', icon: CalendarDays },
  { to: '/associate/pipeline', label: 'Pipeline', icon: Columns3 },
];

export default function AppShell({ children }) {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-warm-white">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-navy flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <h1 className="text-white text-lg font-semibold tracking-tight">
            Thompson OS
          </h1>
          <p className="text-white/50 text-xs mt-0.5">Associate Console</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <NavLink
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/8'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                {label}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 pb-4">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} strokeWidth={1.5} />
            Exit
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}
