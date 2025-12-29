import { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { Sidebar, Topbar, DashboardIcon, UsersIcon, DataIcon, SettingsIcon, ReportsIcon, NavItem } from './app/layout';
import { DashboardPage } from './features/dashboard';
import { UsersPage } from './features/users';
import { DataExplorerPage } from './features/data-explorer';
import { LoginPage, SignUpPage } from './features/auth';
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
  const { user, profile, isInitialized, initialize, signOut } = useAuthStore();
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    initialize();
  }, [initialize]);

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
          {currentPath === '/settings' && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
              Settings Page (Coming Soon)
            </div>
          )}
        </main>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;