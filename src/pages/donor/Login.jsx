import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';
import Button from '../../components/shared/Button';

export default function DonorLogin() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) setSent(true);
  }

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-serif text-navy tracking-tight">
            Thompson &amp; Associates
          </h1>
          <div className="w-10 h-px bg-teal/30 mx-auto mt-3" />
        </div>

        {!sent ? (
          <div className="bg-white rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-base text-charcoal/80 leading-relaxed mb-6">
              Enter your email to access your planning portal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1.5 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full text-base border border-slate-300 rounded-md pl-10 pr-3 py-2.5 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 placeholder:text-muted transition-all duration-200"
                  />
                </div>
              </div>
              <Button type="submit" variant="teal" className="w-full text-base py-2.5">
                Send Access Link
              </Button>
            </form>

            {/* Confidentiality */}
            <div className="flex items-start gap-2 mt-5 pt-5 border-t border-border/50">
              <ShieldCheck size={14} className="text-teal shrink-0 mt-0.5" />
              <p className="text-[12px] text-muted leading-relaxed">
                Your information is protected by bank-level security. Only your
                assigned planning associate can view your data.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-border p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <Mail size={20} className="text-emerald-600" />
            </div>
            <h2 className="text-lg font-serif text-navy mb-2">
              Check your email
            </h2>
            <p className="text-base text-charcoal/70 leading-relaxed">
              We&rsquo;ve sent a secure access link to{' '}
              <span className="font-medium text-charcoal">{email}</span>.
              Please check your inbox.
            </p>
          </div>
        )}

        {/* Dev shortcut */}
        <p className="text-center mt-6">
          <Link
            to="/donor/home"
            className="text-[11px] text-muted/50 hover:text-muted transition-colors duration-200"
          >
            Dev: Skip to portal
          </Link>
        </p>
      </div>
    </div>
  );
}
