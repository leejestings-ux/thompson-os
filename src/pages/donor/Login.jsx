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
    <div className="pp-shell min-h-screen bg-pp-cream flex items-center justify-center p-6">
      <div className="w-full max-w-sm animate-fadeIn">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl tracking-tight" style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 700 }}>
            <span className="text-pp-gold">P</span><span className="text-pp-navy">eriscope Path</span>
          </h1>
          <div className="w-10 h-px bg-pp-gold/40 mx-auto mt-3" />
          <p className="text-xs text-pp-sage mt-3 uppercase tracking-wider" style={{ fontFamily: "'Lato', system-ui, sans-serif", fontStyle: 'normal' }}>
            Provided by Thompson &amp; Associates
          </p>
        </div>

        {!sent ? (
          <div className="bg-white rounded-xl border border-pp-sage/20 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-base text-pp-navy/80 leading-relaxed mb-6" style={{ fontFamily: "'Lato', system-ui, sans-serif", fontStyle: 'normal' }}>
              Enter your email to access your planning portal.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-pp-navy mb-1.5 uppercase tracking-wide" style={{ fontFamily: "'Lato', system-ui, sans-serif", fontStyle: 'normal' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-pp-sage"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full text-base border border-pp-sage/30 rounded-md pl-10 pr-3 py-2.5 focus:outline-none focus:border-pp-gold focus:ring-2 focus:ring-pp-gold/15 placeholder:text-pp-sage/60 transition-all duration-200"
                    style={{ fontFamily: "'Lato', system-ui, sans-serif" }}
                  />
                </div>
              </div>
              <Button type="submit" variant="gold" className="w-full text-base py-2.5">
                Send Access Link
              </Button>
            </form>

            {/* Confidentiality */}
            <div className="flex items-start gap-2 mt-5 pt-5 border-t border-pp-sage/10">
              <ShieldCheck size={14} className="text-pp-gold shrink-0 mt-0.5" />
              <p className="text-[12px] text-pp-sage leading-relaxed" style={{ fontFamily: "'Lato', system-ui, sans-serif", fontStyle: 'normal' }}>
                Your information is protected by bank-level security. Only your
                assigned planning associate can view your data.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-pp-sage/20 p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-pp-gold/10 flex items-center justify-center mx-auto mb-4">
              <Mail size={20} className="text-pp-gold" />
            </div>
            <h2 className="text-lg text-pp-navy mb-2" style={{ fontFamily: "'Fraunces', Georgia, serif", fontStyle: 'italic', fontWeight: 600 }}>
              Check your email
            </h2>
            <p className="text-base text-pp-navy/70 leading-relaxed" style={{ fontFamily: "'Lato', system-ui, sans-serif", fontStyle: 'normal' }}>
              We&rsquo;ve sent a secure access link to{' '}
              <span className="font-medium text-pp-navy">{email}</span>.
              Please check your inbox.
            </p>
          </div>
        )}

        {/* Dev shortcut */}
        <p className="text-center mt-6">
          <Link
            to="/donor/home"
            className="text-[11px] text-pp-sage/40 hover:text-pp-sage transition-colors duration-200"
          >
            Dev: Skip to portal
          </Link>
        </p>
      </div>
    </div>
  );
}
