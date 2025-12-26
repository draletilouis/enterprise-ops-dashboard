import React from 'react';
import { useAuthStore } from '../../store/auth.store';
import { Button } from '../../ui';
import './Topbar.css';

export const Topbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="topbar-title">Welcome back, {user?.name}</h2>
      </div>
      
      <div className="topbar-right">
        <div className="topbar-user">
          <div className="topbar-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="topbar-user-info">
            <p className="topbar-user-name">{user?.name}</p>
            <p className="topbar-user-role">{user?.role}</p>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  );
};