import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout';
import { ProtectedRoute } from './ProtectedRoute';

// Auth
import { LoginPage } from '../features/auth/pages/LoginPage';

// Features
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { TransactionsPage } from '../features/auth/pages/TransactionsPage';
import { UsersPage } from '../features/auth/pages/UsersPage';
import { SettingsPage } from '../features/auth/pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
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
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
]);