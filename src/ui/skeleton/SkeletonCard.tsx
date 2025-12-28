import { SkeletonText, SkeletonCircle, SkeletonRectangle } from './Skeleton';

export function SkeletonCard() {
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        backgroundColor: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <SkeletonCircle size={48} />
        <div style={{ flex: 1 }}>
          <SkeletonText width="60%" height={16} />
          <div style={{ height: '0.5rem' }} />
          <SkeletonText width="40%" height={14} />
        </div>
      </div>

      <div style={{ height: '1rem' }} />

      <SkeletonText width="100%" height={14} />
      <div style={{ height: '0.5rem' }} />
      <SkeletonText width="100%" height={14} />
      <div style={{ height: '0.5rem' }} />
      <SkeletonText width="75%" height={14} />

      <div style={{ height: '1rem' }} />

      <SkeletonRectangle width={100} height={36} borderRadius={6} />
    </div>
  );
}

SkeletonCard.displayName = 'SkeletonCard';