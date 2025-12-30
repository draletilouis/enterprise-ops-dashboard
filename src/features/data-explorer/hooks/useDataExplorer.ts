import { useState, useEffect, useCallback } from 'react';
import {
  dataRecordsService,
  type DataRecord,
  type DataFilters,
  type AggregatedData,
} from '../../../services/supabase';

interface UseDataExplorerReturn {
  records: DataRecord[];
  aggregatedData: AggregatedData | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  filters: DataFilters;
  setFilters: (filters: DataFilters) => void;
  setPage: (page: number) => void;
  refetch: () => void;
  categories: string[];
  regions: string[];
}

export function useDataExplorer(initialPageSize = 20): UseDataExplorerReturn {
  const [records, setRecords] = useState<DataRecord[]>([]);
  const [aggregatedData, setAggregatedData] = useState<AggregatedData | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<DataFilters>({});
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
    totalPages: 0,
  });

  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await dataRecordsService.getAll(
        filters,
        pagination.page,
        pagination.pageSize
      );

      setRecords(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.total,
        totalPages: response.totalPages,
      }));
    } catch (err) {
      setError('Failed to fetch data records');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  const fetchAggregatedData = useCallback(async () => {
    try {
      const data = await dataRecordsService.getAggregated(filters);
      setAggregatedData(data);
    } catch (err) {
      console.error('Failed to fetch aggregated data:', err);
    }
  }, [filters]);

  const fetchCategories = useCallback(async () => {
    try {
      const cats = await dataRecordsService.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  const fetchRegions = useCallback(async () => {
    try {
      const regs = await dataRecordsService.getRegions();
      setRegions(regs);
    } catch (err) {
      console.error('Failed to fetch regions:', err);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  useEffect(() => {
    fetchAggregatedData();
  }, [fetchAggregatedData]);

  useEffect(() => {
    fetchCategories();
    fetchRegions();
  }, [fetchCategories, fetchRegions]);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handleSetFilters = useCallback((newFilters: DataFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  return {
    records,
    aggregatedData,
    isLoading,
    error,
    pagination,
    filters,
    setFilters: handleSetFilters,
    setPage,
    refetch: fetchRecords,
    categories,
    regions,
  };
}
