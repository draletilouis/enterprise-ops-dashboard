import type { TopbarProps } from './Layout.types';
import styles from './Layout.module.css';

export function Topbar({
  title,
  userName = 'John Doe',
  userAvatar,
  onLogout,
}: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <h1 className={styles.topbarTitle}>{title}</h1>

      <div className={styles.topbarRight}>
        <div className={styles.userMenu}>
          <div className={styles.userAvatar}>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} />
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#9ca3af"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{userName}</span>
            <span className={styles.userRole}>Administrator</span>
          </div>
        </div>

        {onLogout && (
          <button
            type="button"
            className={styles.logoutButton}
            onClick={onLogout}
            aria-label="Logout"
            title="Logout"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

Topbar.displayName = 'Topbar';