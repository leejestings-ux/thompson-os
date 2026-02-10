import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();
  const isDonor = location.pathname.startsWith('/donor');

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-8">
      <div className="max-w-sm w-full text-center">
        <p className="text-6xl font-bold text-navy/20 mb-4">404</p>
        <h1 className="text-xl font-semibold text-navy mb-2">
          Page not found
        </h1>
        <p className="text-sm text-muted leading-relaxed mb-8">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been
          moved.
        </p>
        <Link
          to={isDonor ? '/donor/home' : '/associate/today'}
          className="inline-block px-6 py-2.5 bg-navy text-white text-sm font-medium rounded-lg hover:bg-navy-light transition-colors"
        >
          {isDonor ? 'Back to Home' : 'Back to Dashboard'}
        </Link>
      </div>
    </div>
  );
}
