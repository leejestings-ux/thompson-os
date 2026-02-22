import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

export default function AutoSaveIndicator({ trigger }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger > 0) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 1500);
      return () => clearTimeout(t);
    }
  }, [trigger]);

  if (!visible) return <span className="h-5" />;

  return (
    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium animate-fadeIn">
      <Check size={12} />
      Saved
    </span>
  );
}
