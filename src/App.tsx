import { useState } from 'react';
import { Button, Input } from './ui';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const emailError = email && !email.includes('@') ? 'Please enter a valid email' : '';
  const passwordValid = password.length >= 8;

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Input Component Test</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <Input
          label="Username"
          placeholder="Enter your username"
          helperText="Choose a unique username"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText="We'll never share your email"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isSuccess={passwordValid}
          helperText="Must be at least 8 characters"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <Input
          label="Organization"
          value="Acme Corp"
          disabled
          helperText="Contact admin to change"
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <Input
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
      
      <Button>Submit</Button>
    </div>
  );
}

export default App;