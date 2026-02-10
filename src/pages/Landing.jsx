import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-10">
          <h1 className="text-4xl font-semibold text-navy tracking-tight mb-2">
            Thompson OS
          </h1>
          <div className="w-12 h-px bg-navy/30 mx-auto mb-4" />
          <p className="text-charcoal/70 text-sm leading-relaxed">
            Values-based estate planning platform
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/associate/today"
            className="block w-full px-6 py-3.5 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors"
          >
            Associate Console
          </Link>
          <Link
            to="/donor/home"
            className="block w-full px-6 py-3.5 bg-white text-navy text-sm font-medium rounded-lg border border-border hover:border-navy/30 transition-colors"
          >
            Donor Portal
          </Link>
        </div>

        <p className="mt-10 text-xs text-muted">
          Thompson & Associates
        </p>
      </div>
    </div>
  );
}
