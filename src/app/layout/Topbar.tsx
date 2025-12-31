import { useState, useRef, useEffect } from 'react';
import type { TopbarProps } from './Layout.types';
import styles from './Layout.module.css';

export function Topbar({
  title,
  userName = 'Draleti Louis',
  userAvatar,
  userEmail = 'draleti@stratify.com',
  onLogout,
  onSettingsClick,
}: TopbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const getInitials = () => {
    return userName.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSettingsClick = () => {
    setIsMenuOpen(false);
    if (onSettingsClick) {
      onSettingsClick();
    }
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <h1 className={styles.topbarTitle}>{title}</h1>
      </div>

      <div className={styles.topbarRight}>
        <div className={styles.userMenuContainer} ref={menuRef}>
          <button
            type="button"
            className={styles.userMenuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="User menu"
            aria-expanded={isMenuOpen}
          >
            <div className={styles.userAvatar}>
              {userAvatar ? (
                <img src={userAvatar} alt={userName} />
              ) : (
                getInitials()
              )}
            </div>
          </button>

          {isMenuOpen && (
            <div className={styles.userMenuDropdown}>
              <div className={styles.dropdownHeader}>
                <div className={styles.dropdownAvatar}>
                  {userAvatar ? (
                    <img src={userAvatar} alt={userName} />
                  ) : (
                    getInitials()
                  )}
                </div>
                <div className={styles.dropdownUserInfo}>
                  <div className={styles.dropdownUserName}>{userName}</div>
                  <div className={styles.dropdownUserEmail}>{userEmail}</div>
                </div>
              </div>

              <div className={styles.dropdownDivider}></div>

              <div className={styles.dropdownMenu}>
                <button
                  type="button"
                  className={styles.dropdownItem}
                  onClick={handleSettingsClick}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <span>Settings</span>
                </button>
              </div>

              <div className={styles.dropdownDivider}></div>

              {onLogout && (
                <button
                  type="button"
                  className={styles.dropdownItemLogout}
                  onClick={handleLogoutClick}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 8H5a1 1 0 110-2h5.586L8.293 3.707a1 1 0 011.414-1.414L14 6.586z" clipRule="evenodd" />
                  </svg>
                  <span>Sign out</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

Topbar.displayName = 'Topbar';