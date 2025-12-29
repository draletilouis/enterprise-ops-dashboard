import { useState } from 'react';
import { useAuthStore } from '../../../store/auth.store';
import { Button } from '../../../ui/';
import { Input } from '../../../ui/input';
import { toast } from '../../../ui/toast';
import styles from './Auth.module.css';

interface SignUpPageProps {
  onSwitchToLogin: () => void;
}

export function SignUpPage({ onSwitchToLogin }: SignUpPageProps) {
  const { signUp, isLoading, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
  });
  const [localError, setLocalError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.department) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        department: formData.department,
      });
      toast.success('Account created! Please check your email to verify.');
      onSwitchToLogin();
    } catch {
      // Error is handled in the store
    }
  };

  const displayError = localError || error;

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
            <span className={styles.logoText}>Enterprise</span>
          </div>
          <h1 className={styles.authTitle}>Create an account</h1>
          <p className={styles.authSubtitle}>Get started with your free account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {displayError && (
            <div className={styles.errorAlert}>{displayError}</div>
          )}

          <div className={styles.formRow}>
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="John"
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Doe"
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="you@company.com"
          />

          <Input
            label="Department"
            value={formData.department}
            onChange={(e) => handleChange('department', e.target.value)}
            placeholder="Engineering"
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="At least 6 characters"
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
          />

          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className={styles.linkButton}
              onClick={onSwitchToLogin}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

SignUpPage.displayName = 'SignUpPage';