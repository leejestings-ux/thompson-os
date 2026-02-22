import { useLocation, Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import AppShell from './AppShell';

export default function PlaceholderPage({ title, section }) {
  const location = useLocation();
  const isAssociate = location.pathname.startsWith('/associate');

  const content = (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-sm w-full text-center animate-fadeIn">
        <div className="w-14 h-14 rounded-full bg-navy/5 flex items-center justify-center mx-auto mb-5">
          <Clock size={24} className="text-navy/30" />
        </div>
        <h1 className="text-xl font-serif text-navy mb-2 tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-muted leading-relaxed mb-6">
          This feature is coming soon. We're working on building this section of
          the {section || 'platform'}.
        </p>
        <Link
          to={isAssociate ? '/associate/today' : '/'}
          className="text-sm text-teal font-medium hover:text-teal-dark transition-colors duration-200"
        >
          Back to {isAssociate ? 'Dashboard' : 'Home'}
        </Link>
      </div>
    </div>
  );

  if (isAssociate) {
    return <AppShell>{content}</AppShell>;
  }

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-8">
      {content}
    </div>
  );
}
