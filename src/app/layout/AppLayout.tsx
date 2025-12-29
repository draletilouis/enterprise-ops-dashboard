import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { DashboardIcon, UsersIcon, DataIcon, SettingsIcon, ReportsIcon } from './icons';
import { useAuthStore } from '../../store/auth.store';
import type { NavItem } from './Layout.types';
import styles from './Layout.module.css';

const navItems: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    key: 'transactions',
    label: 'Transactions',
    icon: <DataIcon />,
    path: '/transactions',
  },
  {
    key: 'users',
    label: 'Users',
    icon: <UsersIcon />,
    path: '/users',
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: <ReportsIcon />,
    path: '/reports',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
  },
];

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const getPageTitle = () => {
    const currentItem = navItems.find((item) => item.path === location.pathname);
    return currentItem?.label || 'Dashboard';
  };

  return (
    <div className={styles.appLayout}>
      <Sidebar
        items={navItems}
        currentPath={location.pathname}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
      />
      <div className={styles.appMain}>
        <Topbar
          title={getPageTitle()}
          userName={user?.name}
          onLogout={handleLogout}
        />
        <main className={styles.appContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

AppLayout.displayName = 'AppLayout';
