import type { ReactNode } from 'react';

export interface NavItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path: string;
}

export interface SidebarProps {
  items: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export interface TopbarProps {
  title: string;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

export interface AppLayoutProps {
  children: ReactNode;
}