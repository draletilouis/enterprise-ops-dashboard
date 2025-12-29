import {
  StatsCard,
  ActivityFeed,
  RevenueChart,
  OrdersChart,
  type ActivityItem,
} from '../components';
import styles from '../components/Dashboard.module.css';

const activities: ActivityItem[] = [
  {
    id: '1',
    user: 'Sarah Johnson',
    action: 'created a new',
    target: 'Project Alpha',
    time: '2 minutes ago',
  },
  {
    id: '2',
    user: 'Mike Chen',
    action: 'updated the status of',
    target: 'Task #1234',
    time: '15 minutes ago',
  },
  {
    id: '3',
    user: 'Emily Davis',
    action: 'commented on',
    target: 'Design Review',
    time: '1 hour ago',
  },
  {
    id: '4',
    user: 'Alex Turner',
    action: 'completed',
    target: 'Sprint Planning',
    time: '2 hours ago',
  },
  {
    id: '5',
    user: 'Lisa Wang',
    action: 'uploaded files to',
    target: 'Asset Library',
    time: '3 hours ago',
  },
];

const UsersIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
  </svg>
);

const RevenueIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
      clipRule="evenodd"
    />
  </svg>
);

const OrdersIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
    <path
      fillRule="evenodd"
      d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const GrowthIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
      clipRule="evenodd"
    />
  </svg>
);

export function DashboardPage() {
  return (
    <div>
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <StatsCard
          title="Total Users"
          value="12,458"
          change={{ value: 12, type: 'increase' }}
          icon={<UsersIcon />}
          iconColor="blue"
        />
        <StatsCard
          title="Revenue"
          value="$48,352"
          change={{ value: 8, type: 'increase' }}
          icon={<RevenueIcon />}
          iconColor="green"
        />
        <StatsCard
          title="Orders"
          value="1,245"
          change={{ value: 3, type: 'decrease' }}
          icon={<OrdersIcon />}
          iconColor="purple"
        />
        <StatsCard
          title="Growth"
          value="23.5%"
          change={{ value: 5, type: 'increase' }}
          icon={<GrowthIcon />}
          iconColor="orange"
        />
      </div>

      {/* Charts */}
      <div className={styles.chartsGrid}>
        <RevenueChart />
        <OrdersChart />
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomGrid}>
        <RevenueChart />
        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
}

DashboardPage.displayName = 'DashboardPage';