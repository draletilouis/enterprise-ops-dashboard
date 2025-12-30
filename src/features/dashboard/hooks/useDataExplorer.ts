import { useState, useEffect } from 'react';
import { dataRecordsService, type DataFilters, type DataRecord } from '../../../services/supabase';

export interface DataExplorerState {
  data: DataRecord[];
  isLoading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  totalRecords: number;
  filters: DataFilters;
  categories: string[];
  regions: string[];
}

export function useDataExplorer() {
  const [state, setState] = useState<DataExplorerState>({
    data: [],
    isLoading: true,
    error: null,
    page: 1,
    totalPages: 1,
    totalRecords: 0,
    filters: {},
    categories: [],
    regions: [],
  });

  // Fetch categories and regions on mount
  useEffect(() => {
    async function fetchFilterOptions() {
      try {
        const [categories, regions] = await Promise.all([
          dataRecordsService.getCategories(),
          dataRecordsService.getRegions(),
        ]);
        setState(prev => ({ ...prev, categories, regions }));
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    }
    fetchFilterOptions();
  }, []);

  // Fetch data when page or filters change
  useEffect(() => {
    async function fetchData() {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const response = await dataRecordsService.getAll(state.filters, state.page, 20);

        setState(prev => ({
          ...prev,
          data: response.data,
          totalPages: response.totalPages,
          totalRecords: response.total,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch data',
        }));
      }
    }

    fetchData();
  }, [state.page, state.filters]);

  const setPage = (page: number) => {
    setState(prev => ({ ...prev, page }));
  };

  const setFilters = (filters: DataFilters) => {
    setState(prev => ({ ...prev, filters, page: 1 }));
  };

  const clearFilters = () => {
    setState(prev => ({ ...prev, filters: {}, page: 1 }));
  };

  const exportToCSV = () => {
    if (state.data.length === 0) return;

    const headers = ['ID', 'Category', 'Region', 'Revenue', 'Profit', 'Sales', 'Date'];
    const rows = state.data.map(record => [
      record.id,
      record.category,
      record.region,
      record.revenue,
      record.profit,
      record.sales,
      record.record_date,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    ...state,
    setPage,
    setFilters,
    clearFilters,
    exportToCSV,
  };
}
