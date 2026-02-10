import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function DonorShell({ children, showBack, backTo }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-warm-white">
      <header className="border-b border-border bg-white">
        <div className="max-w-[720px] mx-auto px-6 py-4 flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(backTo || '/donor/home')}
              className="text-muted hover:text-charcoal transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div>
            <p className="text-lg font-semibold text-navy tracking-tight leading-tight">
              Thompson &amp; Associates
            </p>
            <p className="text-[11px] text-muted">Estate Planning Portal</p>
          </div>
        </div>
      </header>
      <main className="max-w-[720px] mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
