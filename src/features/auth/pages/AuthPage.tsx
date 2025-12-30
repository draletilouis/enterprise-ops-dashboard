import { useState } from 'react';
import { LoginPage } from './LoginPage';
import { SignUpPage } from './SignUpPage';

interface AuthPageProps {
  defaultTab?: 'login' | 'signup';
}

export function AuthPage({ defaultTab = 'login' }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);

  if (activeTab === 'signup') {
    return <SignUpPage onSwitchToLogin={() => setActiveTab('login')} />;
  }

  return <LoginPage onSwitchToSignUp={() => setActiveTab('signup')} />;
}

AuthPage.displayName = 'AuthPage';
