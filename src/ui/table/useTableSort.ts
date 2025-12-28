import { useState, useMemo, useCallback } from 'react';
import type { SortState, SortDirection } from './Table.types';

export function useTableSort<T extends Record<string, unknown>>(
  data: T[],
  initialSort?: SortState
) {
  const [sortState, setSortState] = useState<SortState | undefined>(initialSort);

  const handleSort = useCallback((key: string) => {
    setSortState((current) => {
      if (current?.key !== key) {
        return { key, direction: 'asc' };
      }

      const nextDirection: SortDirection =
        current.direction === 'asc'
          ? 'desc'
          : current.direction === 'desc'
          ? null
          : 'asc';

      if (nextDirection === null) {
        return undefined;
      }

      return { key, direction: nextDirection };
    });
  }, []);

  const sortedData = useMemo(() => {
    if (!sortState || !sortState.direction) {
      return data;
    }

    const { key, direction } = sortState;

    return [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      let comparison = 0;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortState]);

  const resetSort = useCallback(() => {
    setSortState(undefined);
  }, []);

  return {
    sortedData,
    sortState,
    handleSort,
    resetSort,
  };
}