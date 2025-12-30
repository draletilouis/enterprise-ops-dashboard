import { Button } from '../../../ui';
import styles from './Users.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, total);

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationInfo}>
        Showing {start} to {end} of {total} entries
      </div>
      <div className={styles.paginationButtons}>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className={styles.paginationText}>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

Pagination.displayName = 'Pagination';
