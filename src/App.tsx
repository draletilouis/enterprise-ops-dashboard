import { useState } from 'react';
import { Button } from './ui/';
import { Table, useTableSort, type Column } from './ui/table';
import { ToastContainer, toast } from './ui/toast';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const users: User[] = [
  { id: 1, name: 'John Smith', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2023-03-22' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', joinDate: '2022-11-08' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'active', joinDate: '2023-06-01' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', joinDate: '2022-08-30' },
];

const columns: Column<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    width: 100,
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    width: 100,
    render: (value) => (
      <span
        style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 500,
          backgroundColor: value === 'active' ? '#dcfce7' : '#fee2e2',
          color: value === 'active' ? '#166534' : '#991b1b',
        }}
      >
        {value === 'active' ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    key: 'joinDate',
    header: 'Join Date',
    sortable: true,
    width: 120,
    render: (value) => new Date(value as string).toLocaleDateString(),
  },
  {
    key: 'actions',
    header: 'Actions',
    width: 100,
    align: 'center',
    render: (_, row) => (
      <Button
        size="sm"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          toast.info(`Editing ${row.name}`);
        }}
      >
        Edit
      </Button>
    ),
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { sortedData, sortState, handleSort } = useTableSort(users);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Table Component Test</h1>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <Button onClick={simulateLoading}>Simulate Loading</Button>
      </div>

      <Table<User>
        data={sortedData}
        columns={columns}
        rowKey="id"
        sortState={sortState}
        onSort={handleSort}
        isLoading={isLoading}
        striped
        onRowClick={(row) => toast.success(`Clicked: ${row.name}`)}
      />

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;