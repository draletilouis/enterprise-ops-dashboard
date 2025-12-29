import type { ReactNode } from 'react';
import styles from './Dashboard.module.css';

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: ReactNode;
  iconColor?: 'blue' | 'green' | 'purple' | 'orange';
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  iconColor = 'blue',
}: StatsCardProps) {
  return (
    <div className={styles.statsCard}>
      <div className={styles.statsHeader}>
        <div className={`${styles.statsIcon} ${styles[iconColor]}`}>
          {icon}
        </div>
        {change && (
          <span
            className={`${styles.statsChange} ${
              change.type === 'increase' ? styles.positive : styles.negative
            }`}
          >
            {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}%
          </span>
        )}
      </div>
      <div className={styles.statsValue}>{value}</div>
      <div className={styles.statsTitle}>{title}</div>
    </div>
  );
}

StatsCard.displayName = 'StatsCard';