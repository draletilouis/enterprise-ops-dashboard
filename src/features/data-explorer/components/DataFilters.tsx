import type { DataFilters as DataFiltersType } from '../../../services/supabase';
import { Input } from '../../../ui/input';
import { Button } from '../../../ui';
import styles from './DataExplorer.module.css';

interface DataFiltersProps {
  filters: DataFiltersType;
  onFiltersChange: (filters: DataFiltersType) => void;
  categories: string[];
  regions: string[];
}

export function DataFilters({
  filters,
  onFiltersChange,
  categories,
  regions,
}: DataFiltersProps) {
  const handleChange = (key: keyof DataFiltersType, value: string | number) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const handleClear = () => {
    onFiltersChange({});
  };

  const hasFilters = Object.values(filters).some((v) => v !== undefined && v !== '');

  return (
    <div className={styles.filters}>
      <div className={styles.filtersRow}>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={filters.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={filters.region || ''}
            onChange={(e) => handleChange('region', e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputWrapper}>
          <Input
            type="date"
            placeholder="Start Date"
            value={filters.dateFrom || ''}
            onChange={(e) => handleChange('dateFrom', e.target.value)}
            fullWidth={false}
          />
        </div>

        <div className={styles.inputWrapper}>
          <Input
            type="date"
            placeholder="End Date"
            value={filters.dateTo || ''}
            onChange={(e) => handleChange('dateTo', e.target.value)}
            fullWidth={false}
          />
        </div>

        <div className={styles.inputWrapper}>
          <Input
            type="number"
            placeholder="Min Revenue"
            value={filters.minRevenue || ''}
            onChange={(e) =>
              handleChange('minRevenue', e.target.value ? parseFloat(e.target.value) : '')
            }
            fullWidth={false}
          />
        </div>

        <div className={styles.inputWrapper}>
          <Input
            type="number"
            placeholder="Max Revenue"
            value={filters.maxRevenue || ''}
            onChange={(e) =>
              handleChange('maxRevenue', e.target.value ? parseFloat(e.target.value) : '')
            }
            fullWidth={false}
          />
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

DataFilters.displayName = 'DataFilters';
