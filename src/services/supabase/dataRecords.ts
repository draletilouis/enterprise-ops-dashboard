import { supabase } from './client';
import type { DataRecord } from './types';

export interface DataFilters {
  category?: string;
  region?: string;
  dateFrom?: string;
  dateTo?: string;
  minRevenue?: number;
  maxRevenue?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AggregatedData {
  totalRevenue: number;
  totalProfit: number;
  totalSales: number;
  recordCount: number;
  byCategory: { category: string; revenue: number; profit: number }[];
  byRegion: { region: string; revenue: number; profit: number }[];
}

export const dataRecordsService = {
  async getAll(
    filters: DataFilters = {},
    page = 1,
    pageSize = 20
  ): Promise<PaginatedResponse<DataRecord>> {
    let query = supabase
      .from('data_records')
      .select('*', { count: 'exact' });

    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.region) {
      query = query.eq('region', filters.region);
    }
    if (filters.dateFrom) {
      query = query.gte('record_date', filters.dateFrom);
    }
    if (filters.dateTo) {
      query = query.lte('record_date', filters.dateTo);
    }
    if (filters.minRevenue !== undefined) {
      query = query.gte('revenue', filters.minRevenue);
    }
    if (filters.maxRevenue !== undefined) {
      query = query.lte('revenue', filters.maxRevenue);
    }

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to).order('record_date', { ascending: false });

    const { data, error, count } = await query;

    if (error) throw error;

    const total = count || 0;

    return {
      data: data || [],
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  async getAggregated(filters: DataFilters = {}): Promise<AggregatedData> {
    let query = supabase.from('data_records').select('*');

    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.region) {
      query = query.eq('region', filters.region);
    }
    if (filters.dateFrom) {
      query = query.gte('record_date', filters.dateFrom);
    }
    if (filters.dateTo) {
      query = query.lte('record_date', filters.dateTo);
    }
    if (filters.minRevenue !== undefined) {
      query = query.gte('revenue', filters.minRevenue);
    }
    if (filters.maxRevenue !== undefined) {
      query = query.lte('revenue', filters.maxRevenue);
    }

    const { data, error } = await query;

    if (error) throw error;

    const records: DataRecord[] = data || [];

    // Calculate totals
    const totalRevenue = records.reduce((sum, r) => sum + Number(r.revenue), 0);
    const totalProfit = records.reduce((sum, r) => sum + Number(r.profit), 0);
    const totalSales = records.reduce((sum, r) => sum + r.sales, 0);

    // Group by category
    const categoryMap = new Map<string, { revenue: number; profit: number }>();
    records.forEach((r) => {
      const existing = categoryMap.get(r.category) || { revenue: 0, profit: 0 };
      categoryMap.set(r.category, {
        revenue: existing.revenue + Number(r.revenue),
        profit: existing.profit + Number(r.profit),
      });
    });
    const byCategory = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      revenue: Math.round(data.revenue * 100) / 100,
      profit: Math.round(data.profit * 100) / 100,
    }));

    // Group by region
    const regionMap = new Map<string, { revenue: number; profit: number }>();
    records.forEach((r) => {
      const existing = regionMap.get(r.region) || { revenue: 0, profit: 0 };
      regionMap.set(r.region, {
        revenue: existing.revenue + Number(r.revenue),
        profit: existing.profit + Number(r.profit),
      });
    });
    const byRegion = Array.from(regionMap.entries()).map(([region, data]) => ({
      region,
      revenue: Math.round(data.revenue * 100) / 100,
      profit: Math.round(data.profit * 100) / 100,
    }));

    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalProfit: Math.round(totalProfit * 100) / 100,
      totalSales,
      recordCount: records.length,
      byCategory,
      byRegion,
    };
  },

  async getCategories(): Promise<string[]> {
    const { data, error } = await supabase
      .from('data_records')
      .select('category')
      .order('category');

    if (error) throw error;

    return [...new Set(data?.map((r) => r.category) || [])];
  },

  async getRegions(): Promise<string[]> {
    const { data, error } = await supabase
      .from('data_records')
      .select('region')
      .order('region');

    if (error) throw error;

    return [...new Set(data?.map((r) => r.region) || [])];
  },
};