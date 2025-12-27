import { useState } from 'react';
import { Button } from './ui';
import { Input } from './ui/input';
import { Modal } from './ui/modal';

function App() {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Modal Component Test</h1>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Button onClick={() => setIsBasicOpen(true)}>Basic Modal</Button>
        <Button variant="secondary" onClick={() => setIsFormOpen(true)}>
          Form Modal
        </Button>
        <Button variant="danger" onClick={() => setIsDeleteOpen(true)}>
          Delete Confirmation
        </Button>
      </div>

      <Modal
        isOpen={isBasicOpen}
        onClose={() => setIsBasicOpen(false)}
        title="Basic Modal"
        footer={
          <Button onClick={() => setIsBasicOpen(false)}>Got it</Button>
        }
      >
        <p>This is a basic modal with a title, body content, and a footer button.</p>
        <p style={{ marginTop: '1rem' }}>
          You can close it by clicking the X button, clicking outside, or pressing
          Escape.
        </p>
      </Modal>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Create New User"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsFormOpen(false)}>Create User</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="john@example.com" />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            helperText="Must be at least 8 characters"
          />
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Delete Item"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setIsDeleteOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}

export default App;