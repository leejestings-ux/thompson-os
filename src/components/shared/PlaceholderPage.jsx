import { useLocation } from 'react-router-dom';

export default function PlaceholderPage({ title, section }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center p-8">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-navy/10 text-navy">
            {section}
          </span>
        </div>
        <h1 className="text-3xl font-semibold text-navy mb-3 tracking-tight">
          {title}
        </h1>
        <p className="text-muted text-sm font-mono mb-8">
          {location.pathname}
        </p>
        <div className="w-16 h-px bg-border mx-auto mb-8" />
        <p className="text-charcoal/60 text-sm leading-relaxed">
          This screen is a placeholder. The full implementation will replace this view.
        </p>
      </div>
    </div>
  );
}
