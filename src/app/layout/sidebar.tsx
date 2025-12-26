import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navigation = [
  { name: 'Dashboard', path: '/dashboard', icon: '' },
  { name: 'Transactions', path: '/transactions', icon: '' },
  { name: 'Users', path: '/users', icon: '' },
  { name: 'Settings', path: '/settings', icon: '' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">OpsPortal</h1>
      </div>
      
      <nav className="sidebar-nav">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <p className="sidebar-footer-text">v1.0.0</p>
      </div>
    </aside>
  );
};