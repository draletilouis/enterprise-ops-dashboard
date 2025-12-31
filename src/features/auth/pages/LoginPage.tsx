import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/auth.store';
import { Button, Input } from '../../../ui';
import styles from './Auth.module.css';

interface LoginPageProps {
  onSwitchToSignUp: () => void;
}

export function LoginPage({ onSwitchToSignUp }: LoginPageProps) {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await signIn(email, password);
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Sign in error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Invalid email or password';
      setError(errorMessage);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M3 3h14v14H3z" />
                <path d="M3 9h14M9 3v14" />
              </svg>
            </div>
            <span className={styles.logoText}>Stratify</span>
          </div>
          <h1 className={styles.authTitle}>Welcome back</h1>
          <p className={styles.authSubtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && (
            <div className={styles.errorAlert}>{error}</div>
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <Button type="submit" isLoading={isLoading} style={{ width: '100%' }}>
            Sign In
          </Button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className={styles.linkButton}
              onClick={onSwitchToSignUp}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

LoginPage.displayName = 'LoginPage';
