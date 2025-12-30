import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthPage } from '../features/auth/pages/AuthPage';

// Features
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { TransactionsPage } from '../features/dashboard/pages/TransactionsPage';
import { UsersPage } from '../features/users/pages/UsersPage';
import { SettingsPage } from '../features/settings/pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <AuthPage />,
  },
  {
    path: '/signup',
    element: <AuthPage defaultTab="signup" />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'transactions',
        element: <TransactionsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'reports',
        element: (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
            Reports Page (Coming Soon)
          </div>
        ),
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]);