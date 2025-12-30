import { useState, useEffect } from 'react';
import { profilesService, type Profile } from '../../../services/supabase';
import { Table, SkeletonCard } from '../../../ui';

export function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await profilesService.getAll({}, page, 10);

        setUsers(response.data);
        setTotalPages(response.totalPages);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [page]);

  if (isLoading) {
    return (
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Users
        </h1>
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Users
        </h1>
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#fff', borderRadius: '0.5rem' }}>
          <p style={{ color: '#dc2626' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  const columns = [
    { key: 'first_name', header: 'First Name' },
    { key: 'last_name', header: 'Last Name' },
    { key: 'department', header: 'Department' },
    { key: 'role', header: 'Role' },
    { key: 'status', header: 'Status' },
  ];

  const data = users.map(user => ({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    department: user.department,
    role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
    status: (
      <span
        style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 500,
          backgroundColor: user.status === 'active' ? '#dcfce7' : user.status === 'inactive' ? '#fee2e2' : '#fef3c7',
          color: user.status === 'active' ? '#166534' : user.status === 'inactive' ? '#991b1b' : '#92400e',
        }}
      >
        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
      </span>
    ),
  }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Users
        </h1>
        <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          Page {page} of {totalPages}
        </div>
      </div>

      <Table
        columns={columns}
        data={data}
        isLoading={isLoading}
      />

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
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
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
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

UsersPage.displayName = 'UsersPage';
