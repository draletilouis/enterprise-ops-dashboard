import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styles from './Dashboard.module.css';

const data = [
  { day: 'Mon', orders: 45 },
  { day: 'Tue', orders: 52 },
  { day: 'Wed', orders: 38 },
  { day: 'Thu', orders: 65 },
  { day: 'Fri', orders: 48 },
  { day: 'Sat', orders: 72 },
  { day: 'Sun', orders: 34 },
];

export function OrdersChart() {
  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>Orders This Week</h3>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              cursor={{ fill: '#f3f4f6' }}
            />
            <Bar
              dataKey="orders"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

OrdersChart.displayName = 'OrdersChart';