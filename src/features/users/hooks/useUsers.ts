import { useState, useEffect, useCallback } from 'react';
import { profilesService, type Profile, type ProfileFilters } from '../../../services/supabase';

interface UseUsersReturn {
  users: Profile[];
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  filters: ProfileFilters;
  setFilters: (filters: ProfileFilters) => void;
  setPage: (page: number) => void;
  refetch: () => void;
  updateUser: (id: string, userData: Partial<Profile>) => Promise<Profile | null>;
  departments: string[];
}

export function useUsers(initialPageSize = 10): UseUsersReturn {
  const [users, setUsers] = useState<Profile[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProfileFilters>({});
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: initialPageSize,
    total: 0,
    totalPages: 0,
  });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await profilesService.getAll(
        filters,
        pagination.page,
        pagination.pageSize
      );

      setUsers(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.total,
        totalPages: response.totalPages,
      }));
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize]);

  const fetchDepartments = useCallback(async () => {
    try {
      const depts = await profilesService.getDepartments();
      setDepartments(depts);
    } catch (err) {
      console.error('Failed to fetch departments:', err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const handleSetFilters = useCallback((newFilters: ProfileFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const updateUser = useCallback(async (id: string, userData: Partial<Profile>) => {
    try {
      const updatedUser = await profilesService.update(id, userData);
      await fetchUsers();
      return updatedUser;
    } catch (err) {
      console.error('Failed to update user:', err);
      return null;
    }
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    pagination,
    filters,
    setFilters: handleSetFilters,
    setPage,
    refetch: fetchUsers,
    updateUser,
    departments,
  };
}