import { useState, useEffect } from 'react';

function SkeletonLine({ width = '100%', height = '14px', className = '' }) {
  return (
    <div
      className={`skeleton-shimmer rounded ${className}`}
      style={{ width, height }}
    />
  );
}

function SkeletonAvatar({ size = 40, className = '' }) {
  return (
    <div
      className={`skeleton-shimmer rounded-full shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-border p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <SkeletonAvatar size={36} />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="60%" height="14px" />
          <SkeletonLine width="40%" height="10px" />
        </div>
      </div>
      <div className="space-y-2.5">
        <SkeletonLine width="100%" height="12px" />
        <SkeletonLine width="85%" height="12px" />
        <SkeletonLine width="70%" height="12px" />
      </div>
    </div>
  );
}

function SkeletonTableRow({ columns = 5, className = '' }) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 ${className}`}>
      {Array.from({ length: columns }).map((_, i) => (
        <SkeletonLine
          key={i}
          width={i === 0 ? '30%' : `${60 + Math.random() * 40}%`}
          height="12px"
          className="flex-1"
        />
      ))}
    </div>
  );
}

function SkeletonStatCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-border p-5 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="skeleton-shimmer rounded-lg w-10 h-10" />
      </div>
      <SkeletonLine width="48px" height="28px" className="mb-2" />
      <SkeletonLine width="80px" height="10px" />
    </div>
  );
}

export function SkeletonTodayView() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      {/* Header skeleton */}
      <div>
        <SkeletonLine width="320px" height="28px" className="mb-2" />
        <SkeletonLine width="200px" height="14px" className="mb-2" />
        <SkeletonLine width="240px" height="12px" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonStatCard key={i} />
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <SkeletonLine width="160px" height="16px" className="mb-4" />
            <div className="bg-white rounded-xl border border-border divide-y divide-border/50">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonTableRow key={i} columns={4} className="" />
              ))}
            </div>
          </div>
          <div>
            <SkeletonLine width="140px" height="16px" className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          <SkeletonCard />
          <div className="bg-white rounded-xl border border-border p-6">
            <SkeletonLine width="120px" height="14px" className="mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <SkeletonAvatar size={8} />
                  <div className="flex-1 space-y-1.5">
                    <SkeletonLine width="90%" height="11px" />
                    <SkeletonLine width="60%" height="9px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonPipelineBoard() {
  return (
    <div className="flex gap-3 p-4 h-full min-w-max">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-72 flex flex-col bg-table-stripe/50 rounded-xl border border-border/50 h-full">
          <div className="px-3.5 py-3 border-b border-border/50 flex items-center gap-2.5">
            <div className="skeleton-shimmer w-2 h-2 rounded-full" />
            <SkeletonLine width="80px" height="10px" />
          </div>
          <div className="flex-1 p-2.5 space-y-2.5">
            {Array.from({ length: 2 + Math.floor(Math.random() * 2) }).map((_, j) => (
              <div key={j} className="bg-white rounded-lg border border-border p-3.5">
                <SkeletonLine width="80%" height="12px" className="mb-2" />
                <SkeletonLine width="60%" height="10px" className="mb-3" />
                <SkeletonLine width="100%" height="6px" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonDonorCenter() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <SkeletonCard />
    </div>
  );
}

export default function withSkeleton(Component, Skeleton, delay = 1200) {
  return function SkeletonWrapped(props) {
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
        requestAnimationFrame(() => setVisible(true));
      }, delay);
      return () => clearTimeout(timer);
    }, []);

    if (loading) return <Skeleton />;

    return (
      <div className={`transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <Component {...props} />
      </div>
    );
  };
}

export { SkeletonLine, SkeletonAvatar, SkeletonCard, SkeletonTableRow, SkeletonStatCard };
