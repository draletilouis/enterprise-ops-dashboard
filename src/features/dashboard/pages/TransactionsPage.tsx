import { useState } from 'react';
import { useDataExplorer } from '../hooks';
import { Table, SkeletonCard } from '../../../ui';
import type { DataFilters } from '../../../services/supabase';

export function TransactionsPage() {
  const {
    data,
    isLoading,
    error,
    page,
    totalPages,
    totalRecords,
    filters,
    categories,
    regions,
    setPage,
    setFilters,
    clearFilters,
    exportToCSV,
  } = useDataExplorer();

  const [localFilters, setLocalFilters] = useState<DataFilters>(filters);

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    clearFilters();
  };

  if (isLoading) {
    return (
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Transactions
        </h1>
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Transactions
        </h1>
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#fff', borderRadius: '0.5rem' }}>
          <p style={{ color: '#dc2626' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  const columns = [
    { key: 'category', header: 'Category' },
    { key: 'region', header: 'Region' },
    { key: 'revenue', header: 'Revenue' },
    { key: 'profit', header: 'Profit' },
    { key: 'sales', header: 'Sales' },
    { key: 'record_date', header: 'Date' },
  ];

  const tableData = data.map(record => ({
    id: record.id,
    category: record.category,
    region: record.region,
    revenue: `$${Number(record.revenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    profit: `$${Number(record.profit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    sales: record.sales.toLocaleString(),
    record_date: new Date(record.record_date).toLocaleDateString(),
  }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Transactions
        </h1>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            {totalRecords.toLocaleString()} records
          </span>
          <button
            onClick={exportToCSV}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        backgroundColor: '#ffffff',
        padding: '1.25rem',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>
              Category
            </label>
            <select
              value={localFilters.category || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value || undefined })}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem',
              }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>
              Region
            </label>
            <select
              value={localFilters.region || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, region: e.target.value || undefined })}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem',
              }}
            >
              <option value="">All Regions</option>
              {regions.map(reg => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>
              Date From
            </label>
            <input
              type="date"
              value={localFilters.dateFrom || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, dateFrom: e.target.value || undefined })}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#374151', marginBottom: '0.25rem' }}>
              Date To
            </label>
            <input
              type="date"
              value={localFilters.dateTo || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, dateTo: e.target.value || undefined })}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                fontSize: '0.875rem',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleApplyFilters}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Apply Filters
          </button>
          <button
            onClick={handleClearFilters}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <Table
        columns={columns}
        data={tableData}
        isLoading={isLoading}
      />

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              backgroundColor: page === 1 ? '#f3f4f6' : '#ffffff',
              color: page === 1 ? '#9ca3af' : '#374151',
              cursor: page === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            Previous
          </button>
          <span style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: '1px solid #e5e7eb',
              backgroundColor: page === totalPages ? '#f3f4f6' : '#ffffff',
              color: page === totalPages ? '#9ca3af' : '#374151',
              cursor: page === totalPages ? 'not-allowed' : 'pointer',
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

TransactionsPage.displayName = 'TransactionsPage';
