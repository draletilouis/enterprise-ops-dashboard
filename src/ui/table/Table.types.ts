import type { ReactNode } from 'react';

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey?: keyof T;
  sortState?: SortState;
  onSort?: (key: string) => void;
  isLoading?: boolean;
  loadingRows?: number;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  hoverable?: boolean;
  striped?: boolean;
  compact?: boolean;
}