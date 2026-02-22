import { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const target = typeof value === 'number' ? value : parseInt(value, 10);
    if (isNaN(target)) { setDisplay(value); return; }

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  return <>{display}</>;
}

export default function StatCard({ label, value, icon: Icon, accent, animated }) {
  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-md hover:scale-[1.01] transition-all duration-200 text-center flex flex-col items-center">
      <span
        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${accent}`}
      >
        <Icon size={18} />
      </span>
      <p className="text-2xl font-serif font-bold text-navy tracking-tight">
        {animated && typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
      </p>
      <p className="text-xs text-muted font-medium mt-0.5">{label}</p>
    </div>
  );
}
