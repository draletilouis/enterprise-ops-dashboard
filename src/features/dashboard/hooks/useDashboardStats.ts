import { useState, useEffect } from 'react';
import { profilesService, dataRecordsService } from '../../../services/supabase';

export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  growth: number;
  isLoading: boolean;
  error: string | null;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalRevenue: 0,
    totalOrders: 0,
    growth: 0,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        setStats(prev => ({ ...prev, isLoading: true, error: null }));

        // Fetch total users count
        const usersResponse = await profilesService.getAll({ status: 'active' }, 1, 1);
        const totalUsers = usersResponse.total;

        // Fetch revenue and orders data
        const dataResponse = await dataRecordsService.getAggregated({});
        const totalRevenue = dataResponse.totalRevenue || 0;
        const totalSales = dataResponse.totalSales || 0;

        // Calculate growth (mock for now - you can enhance this with historical data)
        const growth = 23.5;

        setStats({
          totalUsers,
          totalRevenue,
          totalOrders: totalSales,
          growth,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch stats',
        }));
      }
    }

    fetchStats();
  }, []);

  return stats;
}
