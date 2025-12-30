import { useEffect, useState } from 'react';
import { useAuthStore } from './store/auth.store';
import { Sidebar, Topbar, DashboardIcon, UsersIcon, DataIcon, SettingsIcon, ReportsIcon } from './app/layout';
import type { NavItem } from './app/layout';
import { DashboardPage } from './features/dashboard';
import { UsersPage } from './features/users';
import { DataExplorerPage } from './features/data-explorer';
import { LoginPage, SignUpPage } from './features/auth';
import { SettingsPage } from './features/settings';
import { ToastContainer, toast } from './ui/toast';
import { SkeletonCard } from './ui/skeleton';

const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { key: 'users', label: 'Users', icon: <UsersIcon />, path: '/users' },
  { key: 'data', label: 'Data Explorer', icon: <DataIcon />, path: '/data' },
  { key: 'reports', label: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  { key: 'settings', label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

function App() {
  console.log('App component rendering');
  const user = useAuthStore((state) => state.user);
  console.log('App: user from store:', user);
  const profile = useAuthStore((state) => state.profile);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const initialize = useAuthStore((state) => state.initialize);
  const signOut = useAuthStore((state) => state.signOut);

  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Debug: Direct store subscription to verify reactivity
  useEffect(() => {
    console.log('App.tsx: Setting up direct store subscription');
    const unsubscribe = useAuthStore.subscribe((state) => {
      console.log('App.tsx: Store state changed (direct subscription):', {
        hasUser: !!state.user,
        isAuthenticated: state.isAuthenticated,
        isInitialized: state.isInitialized,
      });
    });
    return unsubscribe;
  }, []);

  // Debug: Log when user state changes
  useEffect(() => {
    console.log('App.tsx: User state changed (useEffect):', { user: !!user, isInitialized });
  }, [user, isInitialized]);

  const currentNavItem = navItems.find((item) => item.path === currentPath);
  const pageTitle = currentNavItem?.label || 'Dashboard';

  const handleLogout = async () => {
    await signOut();
    toast.info('Logged out successfully');
  };

  // Show loading while initializing
  if (!isInitialized) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
        <SkeletonCard />
        <div style={{ height: '1rem' }} />
        <SkeletonCard />
      </div>
    );
  }

  // Show auth pages if not logged in
  if (!user) {
    return (
      <>
        {authView === 'login' ? (
          <LoginPage onSwitchToSignUp={() => setAuthView('signup')} />
        ) : (
          <SignUpPage onSwitchToLogin={() => setAuthView('login')} />
        )}
        <ToastContainer position="top-right" />
      </>
    );
  }

  // Show main app if logged in
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        items={navItems}
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar
          title={pageTitle}
          userName={profile ? `${profile.first_name} ${profile.last_name}` : 'User'}
          userAvatar={profile?.avatar_url || undefined}
          onLogout={handleLogout}
        />

        <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#f9fafb', overflowY: 'auto' }}>
          {currentPath === '/dashboard' && <DashboardPage />}
          {currentPath === '/users' && <UsersPage />}
          {currentPath === '/data' && <DataExplorerPage />}
          {currentPath === '/reports' && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
              Reports Page (Coming Soon)
            </div>
          )}
          {currentPath === '/settings' && <SettingsPage />}
        </main>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;