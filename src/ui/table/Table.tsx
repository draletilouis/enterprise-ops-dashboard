import type { TableProps, Column, SortDirection } from './Table.types';
import styles from './Table.module.css';

function SortIcon({
  direction,
  isActive,
}: {
  direction: SortDirection;
  isActive: boolean;
}) {
  const iconClasses = [
    styles.sortIcon,
    isActive && styles.sortIconActive,
    isActive && direction === 'desc' && styles.sortIconDesc,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <svg className={iconClasses} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  rowKey = 'id' as keyof T,
  sortState,
  onSort,
  isLoading = false,
  loadingRows = 5,
  emptyMessage = 'No data available',
  onRowClick,
  hoverable,
  striped = false,
  compact = false,
}: TableProps<T>) {
  const isHoverable = hoverable ?? Boolean(onRowClick);

  const tableClasses = [styles.table, compact && styles.compact]
    .filter(Boolean)
    .join(' ');

  const handleHeaderClick = (column: Column<T>) => {
    if (column.sortable && onSort) {
      onSort(column.key);
    }
  };

  const getCellValue = (row: T, key: string): unknown => {
    return row[key as keyof T];
  };

  const renderCell = (row: T, column: Column<T>) => {
    const value = getCellValue(row, column.key);

    if (column.render) {
      return column.render(value as T[keyof T], row);
    }

    if (value === null || value === undefined) {
      return '—';
    }

    return String(value);
  };

  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return styles.alignCenter;
      case 'right':
        return styles.alignRight;
      default:
        return styles.alignLeft;
    }
  };

  const renderLoadingRows = () => {
    return Array.from({ length: loadingRows }).map((_, rowIndex) => (
      <tr key={`skeleton-${rowIndex}`} className={styles.tr}>
        {columns.map((column) => (
          <td
            key={column.key}
            className={`${styles.td} ${getAlignClass(column.align)}`}
          >
            <div
              className={styles.skeleton}
              style={{ width: `${Math.random() * 40 + 60}%` }}
            />
          </td>
        ))}
      </tr>
    ));
  };

  const renderEmptyState = () => {
    return (
      <tr>
        <td colSpan={columns.length} className={styles.emptyState}>
          {emptyMessage}
        </td>
      </tr>
    );
  };

  const renderDataRows = () => {
    return data.map((row) => {
      const key = String(row[rowKey]);

      const rowClasses = [
        styles.tr,
        isHoverable && styles.hoverable,
        striped && styles.striped,
      ]
        .filter(Boolean)
        .join(' ');

      return (
        <tr key={key} className={rowClasses} onClick={() => onRowClick?.(row)}>
          {columns.map((column) => (
            <td
              key={column.key}
              className={`${styles.td} ${getAlignClass(column.align)}`}
              style={{ width: column.width }}
            >
              {renderCell(row, column)}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <table className={tableClasses}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((column) => {
              const isSorted = sortState?.key === column.key;
              const sortDirection = isSorted ? sortState.direction : null;

              const headerClasses = [
                styles.th,
                column.sortable && styles.sortable,
                getAlignClass(column.align),
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <th
                  key={column.key}
                  className={headerClasses}
                  style={{ width: column.width }}
                  onClick={() => handleHeaderClick(column)}
                  aria-sort={
                    isSorted
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                >
                  <div className={styles.headerContent}>
                    <span>{column.header}</span>
                    {column.sortable && (
                      <SortIcon direction={sortDirection} isActive={isSorted} />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? renderLoadingRows()
            : data.length === 0
            ? renderEmptyState()
            : renderDataRows()}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = 'Table';