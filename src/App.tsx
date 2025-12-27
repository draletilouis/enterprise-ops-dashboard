import { Button } from './ui';
import { ToastContainer, toast } from './ui/toast';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Toast Component Test</h1>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button
          variant="primary"
          onClick={() => toast.success('Changes saved successfully!')}
        >
          Success Toast
        </Button>

        <Button
          variant="danger"
          onClick={() => toast.error('Failed to save changes. Please try again.')}
        >
          Error Toast
        </Button>

        <Button
          variant="secondary"
          onClick={() => toast.warning('Your session will expire in 5 minutes.')}
        >
          Warning Toast
        </Button>

        <Button
          variant="outline"
          onClick={() => toast.info('A new version is available.')}
        >
          Info Toast
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            toast.success('First toast');
            toast.info('Second toast');
            toast.warning('Third toast');
          }}
        >
          Multiple Toasts
        </Button>

        <Button variant="outline" onClick={() => toast.dismissAll()}>
          Clear All
        </Button>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;