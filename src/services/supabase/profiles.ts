import { supabase } from './client';
import type { Profile, ProfileUpdate } from './types';

export interface ProfileFilters {
  search?: string;
  role?: string;
  status?: string;
  department?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const profilesService = {
  async getAll(
    filters: ProfileFilters = {},
    page = 1,
    pageSize = 10
  ): Promise<PaginatedResponse<Profile>> {
    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' });

    // Apply search filter
    if (filters.search) {
      query = query.or(
        `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`
      );
    }

    // Apply role filter
    if (filters.role) {
      query = query.eq('role', filters.role);
    }

    // Apply status filter
    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    // Apply department filter
    if (filters.department) {
      query = query.eq('department', filters.department);
    }

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to).order('created_at', { ascending: false });

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

  async getById(id: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  },

  async update(id: string, updates: ProfileUpdate): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getDepartments(): Promise<string[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('department')
      .order('department');

    if (error) throw error;

    const departments = [...new Set(data?.map((p) => p.department) || [])];
    return departments;
  },
};