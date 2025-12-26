import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Providers } from './providers';
import '../styles/globals.css';

export const App: React.FC = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};