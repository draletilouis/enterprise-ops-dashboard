import { useState } from 'react';
import { Sidebar, Topbar, DashboardIcon, UsersIcon, DataIcon, SettingsIcon, ReportsIcon, NavItem } from './app/layout';
import { DashboardPage } from './features/dashboard';
import { ToastContainer, toast } from './ui/toast';

const navItems: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { key: 'users', label: 'Users', icon: <UsersIcon />, path: '/users' },
  { key: 'data', label: 'Data Explorer', icon: <DataIcon />, path: '/data' },
  { key: 'reports', label: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  { key: 'settings', label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

function App() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentNavItem = navItems.find((item) => item.path === currentPath);
  const pageTitle = currentNavItem?.label || 'Dashboard';

  const handleLogout = () => {
    toast.info('Logged out successfully');
  };

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
          userName="John Doe"
          onLogout={handleLogout}
        />

        <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#f9fafb', overflowY: 'auto' }}>
          {currentPath === '/dashboard' && <DashboardPage />}
          {currentPath === '/users' && <div>Users Page (Coming Soon)</div>}
          {currentPath === '/data' && <div>Data Explorer Page (Coming Soon)</div>}
          {currentPath === '/reports' && <div>Reports Page (Coming Soon)</div>}
          {currentPath === '/settings' && <div>Settings Page (Coming Soon)</div>}
        </main>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;