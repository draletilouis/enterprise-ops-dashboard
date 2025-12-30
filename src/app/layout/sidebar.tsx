import type { SidebarProps } from './Layout.types';
import styles from './Layout.module.css';

export function Sidebar({
  items,
  currentPath,
  onNavigate,
  collapsed = false,
  onToggleCollapse,
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
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h14v14H3z" />
              <path d="M3 9h14M9 3v14" />
            </svg>
          </div>
          {!collapsed && <span className={styles.logoText}>Dralui Labs</span>}
        </div>

        {onToggleCollapse && (
          <button
            type="button"
            className={styles.collapseButton}
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              style={{
                transform: collapsed ? 'rotate(180deg)' : 'none',
                transition: 'transform 200ms ease',
              }}
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
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
            v1.0.0 • © 2024
          </div>
        )}
      </div>
    </aside>
  );
}

Sidebar.displayName = 'Sidebar';