import type { ProfileFilters } from '../../../services/supabase';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui/';
import styles from './Users.module.css';

interface UserFiltersProps {
  filters: ProfileFilters;
  onFiltersChange: (filters: ProfileFilters) => void;
  departments: string[];
}

export function UserFilters({
  filters,
  onFiltersChange,
  departments,
}: UserFiltersProps) {
  const handleChange = (key: keyof ProfileFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const handleClear = () => {
    onFiltersChange({});
  };

  const hasFilters = Object.values(filters).some((v) => v);

  return (
    <div className={styles.filters}>
      <div className={styles.filtersRow}>
        <div className={styles.searchWrapper}>
          <Input
            placeholder="Search users..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            fullWidth={false}
          />
        </div>

        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={filters.role || ''}
            onChange={(e) => handleChange('role', e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={filters.status || ''}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={filters.department || ''}
            onChange={(e) => handleChange('department', e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}

UserFilters.displayName = 'UserFilters';