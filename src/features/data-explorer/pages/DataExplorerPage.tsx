import { useDataExplorer } from '../hooks';
import { DataFilters, Pagination } from '../components';
import { Table } from '../../../ui/table';
import type { Column } from '../../../ui/table';
import { Button } from '../../../ui';
import type { DataRecord } from '../../../services/supabase';
import styles from '../components/DataExplorer.module.css';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('en-US').format(value);
};

const exportToCSV = (records: DataRecord[]) => {
  if (records.length === 0) {
    alert('No data to export');
    return;
  }

  const headers = [
    'ID',
    'Category',
    'Product',
    'Region',
    'Sales',
    'Revenue',
    'Profit',
    'Date',
    'Quarter',
  ];

  const rows = records.map((record) => [
    record.id,
    record.category,
    record.product,
    record.region,
    record.sales,
    record.revenue,
    record.profit,
    record.record_date,
    record.quarter,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row
        .map((cell) => {
          const cellStr = String(cell);
          return cellStr.includes(',') ? `"${cellStr}"` : cellStr;
        })
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `data-export-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function DataExplorerPage() {
  const {
    records,
    aggregatedData,
    isLoading,
    pagination,
    filters,
    setFilters,
    setPage,
    categories,
    regions,
  } = useDataExplorer(20);

  const columns: Column<DataRecord>[] = [
    {
      key: 'category',
      header: 'Category',
      width: 120,
    },
    {
      key: 'product',
      header: 'Product',
      width: 150,
    },
    {
      key: 'region',
      header: 'Region',
      width: 100,
    },
    {
      key: 'sales',
      header: 'Sales',
      width: 100,
      align: 'right',
      render: (value) => formatNumber(value as number),
    },
    {
      key: 'revenue',
      header: 'Revenue',
      width: 120,
      align: 'right',
      render: (value) => formatCurrency(value as number),
    },
    {
      key: 'profit',
      header: 'Profit',
      width: 120,
      align: 'right',
      render: (value) => formatCurrency(value as number),
    },
    {
      key: 'record_date',
      header: 'Date',
      width: 120,
      render: (value) => new Date(value as string).toLocaleDateString(),
    },
    {
      key: 'quarter',
      header: 'Quarter',
      width: 80,
    },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Data Explorer</h1>
        <Button onClick={() => exportToCSV(records)} disabled={records.length === 0}>
          Export to CSV
        </Button>
      </div>

      {aggregatedData && (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Revenue</div>
            <div className={styles.statValue}>
              {formatCurrency(aggregatedData.totalRevenue)}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Profit</div>
            <div className={styles.statValue}>
              {formatCurrency(aggregatedData.totalProfit)}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total Sales</div>
            <div className={styles.statValue}>
              {formatNumber(aggregatedData.totalSales)}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Record Count</div>
            <div className={styles.statValue}>
              {formatNumber(aggregatedData.recordCount)}
            </div>
          </div>
        </div>
      )}

      <DataFilters
        filters={filters}
        onFiltersChange={setFilters}
        categories={categories}
        regions={regions}
      />

      <div className={styles.tableContainer}>
        <Table<DataRecord>
          data={records}
          columns={columns}
          rowKey="id"
          isLoading={isLoading}
          emptyMessage="No data records found"
        />

        {!isLoading && records.length > 0 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}

DataExplorerPage.displayName = 'DataExplorerPage';
