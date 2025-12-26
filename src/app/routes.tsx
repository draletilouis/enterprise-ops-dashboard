import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';

// Auth
import { LoginPage } from '../features/auth/pages/LoginPage';

// Features
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { TransactionsPage } from '../features/data-explorer/pages/TransactionsPage';
import { UsersPage } from '../features/users/pages/UsersPage';
import { SettingsPage } from '../features/settings/pages/SettingsPage';

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