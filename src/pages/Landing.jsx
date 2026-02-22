import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center animate-fadeIn">
        <div className="mb-10">
          <h1 className="text-4xl font-serif text-navy tracking-tight mb-2">
            Thompson <span className="text-teal">&amp;</span> Associates
          </h1>
          <div className="w-12 h-px bg-teal/40 mx-auto mb-4" />
          <p className="text-charcoal/70 text-sm leading-relaxed">
            Values-based estate planning platform
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/associate/today"
            className="block w-full px-6 py-3.5 bg-navy text-white text-sm font-medium rounded-md hover:bg-dark-navy shadow-sm transition-all duration-200 active:scale-[0.98]"
          >
            Associate Console
          </Link>
          <Link
            to="/donor/home"
            className="block w-full px-6 py-3.5 bg-white text-navy text-sm font-medium rounded-md border border-navy/20 hover:bg-[#EEF2F7] hover:border-navy/30 transition-all duration-200 active:scale-[0.98]"
          >
            Donor Portal
          </Link>
        </div>

        <p className="mt-10 text-xs text-muted font-serif">
          Thompson &amp; Associates
        </p>
      </div>
    </div>
  );
}
