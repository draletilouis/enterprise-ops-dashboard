import { useState, useEffect } from 'react';
import { Button } from './ui/';
import {
  SkeletonText,
  SkeletonCircle,
  SkeletonRectangle,
  SkeletonCard,
} from './ui/skeleton';
import { ToastContainer } from './ui/toast';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Skeleton Component Test</h1>

      <Button
        onClick={() => setIsLoading(true)}
        style={{ marginBottom: '1.5rem' }}
      >
        Reload (3s loading)
      </Button>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Skeleton Primitives</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <p style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
              Text lines:
            </p>
            <SkeletonText width="100%" />
            <div style={{ height: '0.5rem' }} />
            <SkeletonText width="80%" />
            <div style={{ height: '0.5rem' }} />
            <SkeletonText width="60%" />
          </div>

          <div>
            <p style={{ marginBottom: '0.5rem', color: '#6b7280' }}>Circles:</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <SkeletonCircle size={32} />
              <SkeletonCircle size={48} />
              <SkeletonCircle size={64} />
            </div>
          </div>

          <div>
            <p style={{ marginBottom: '0.5rem', color: '#6b7280' }}>
              Rectangles:
            </p>
            <SkeletonRectangle width="100%" height={120} borderRadius={8} />
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '1rem' }}>User Card Example</h2>

        {isLoading ? (
          <SkeletonCard />
        ) : (
          <div
            style={{
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              backgroundColor: '#ffffff',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <img
                src="https://i.pravatar.cc/48"
                alt="User avatar"
                style={{ width: 48, height: 48, borderRadius: '50%' }}
              />
              <div>
                <div style={{ fontWeight: 600 }}>Jane Smith</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Product Designer
                </div>
              </div>
            </div>

            <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
              Jane has been with the team for 3 years and specializes in user
              research and interaction design. She loves creating intuitive
              experiences.
            </p>

            <Button size="sm" style={{ marginTop: '1rem' }}>
              View Profile
            </Button>
          </div>
        )}
      </section>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;