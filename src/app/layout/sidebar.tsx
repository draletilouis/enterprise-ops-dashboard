import type { SidebarProps } from './Layout.types';
import styles from './Layout.module.css';

export function Sidebar({
  items,
  currentPath,
  onNavigate,
  collapsed = false,
}: SidebarProps) {
  const sidebarClasses = [
    styles.sidebar,
    collapsed && styles.sidebarCollapsed,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside className={sidebarClasses}>
      <div className={styles.sidebarHeader}>
        {!collapsed && <span className={styles.logoText}>Stratify</span>}
        {collapsed && <span className={styles.logoTextCollapsed}>S</span>}
      </div>

      <nav className={styles.sidebarNav}>
        {items.map((item) => {
          const isActive = currentPath === item.path;

          const itemClasses = [
            styles.navItem,
            isActive && styles.navItemActive,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={item.key}
              type="button"
              className={itemClasses}
              onClick={() => onNavigate(item.path)}
              title={collapsed ? item.label : undefined}
            >
              {item.icon && <span className={styles.navIcon}>{item.icon}</span>}
              {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        {!collapsed && (
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            v1.0.0 • © 2025
          </div>
        )}
      </div>
    </aside>
  );
}

Sidebar.displayName = 'Sidebar';