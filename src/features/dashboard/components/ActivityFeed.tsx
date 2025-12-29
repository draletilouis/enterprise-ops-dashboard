import styles from './Dashboard.module.css';

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar?: string;
}

export interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
}

export function ActivityFeed({
  activities,
  title = 'Recent Activity',
}: ActivityFeedProps) {
  return (
    <div className={styles.activityFeed}>
      <h3 className={styles.activityTitle}>{title}</h3>
      <div className={styles.activityList}>
        {activities.map((activity) => (
          <div key={activity.id} className={styles.activityItem}>
            <div className={styles.activityAvatar}>
              {activity.avatar ? (
                <img src={activity.avatar} alt={activity.user} />
              ) : (
                <span>{activity.user.charAt(0)}</span>
              )}
            </div>
            <div className={styles.activityContent}>
              <p className={styles.activityText}>
                <strong>{activity.user}</strong> {activity.action}{' '}
                <span className={styles.activityTarget}>{activity.target}</span>
              </p>
              <span className={styles.activityTime}>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ActivityFeed.displayName = 'ActivityFeed';