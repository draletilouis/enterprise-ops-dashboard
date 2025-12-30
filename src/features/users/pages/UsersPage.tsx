import { useState } from 'react';
import { useUsers } from '../hooks';
import { UserForm, UserFilters, Pagination } from '../components';
import { Table } from '../../../ui/table';
import type { Column } from '../../../ui/table';
import { Button } from '../../../ui';
import { Modal } from '../../../ui/modal';
import { toast } from '../../../ui/toast';
import type { Profile, ProfileUpdate } from '../../../services/supabase';
import styles from '../components/Users.module.css';

const StatusBadge = ({ status }: { status: Profile['status'] }) => {
  const badgeClass =
    status === 'active'
      ? styles.badgeActive
      : status === 'inactive'
      ? styles.badgeInactive
      : styles.badgePending;

  return (
    <span className={`${styles.badge} ${badgeClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const RoleBadge = ({ role }: { role: Profile['role'] }) => {
  const badgeClass =
    role === 'admin'
      ? styles.badgeAdmin
      : role === 'editor'
      ? styles.badgeEditor
      : styles.badgeViewer;

  return (
    <span className={`${styles.badge} ${badgeClass}`}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

export function UsersPage() {
  const {
    users,
    isLoading,
    pagination,
    filters,
    setFilters,
    setPage,
    updateUser,
    departments,
  } = useUsers(10);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditClick = (user: Profile) => {
    setSelectedUser(user);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (userData: ProfileUpdate) => {
    if (!selectedUser) return;

    setIsSubmitting(true);
    try {
      await updateUser(selectedUser.id, userData);
      toast.success('User updated successfully');
      setIsFormModalOpen(false);
    } catch {
      toast.error('Failed to update user');
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns: Column<Profile>[] = [
    {
      key: 'name',
      header: 'User',
      render: (_, user) => (
        <div className={styles.userCell}>
          <div className={styles.userAvatar}>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={`${user.first_name} ${user.last_name}`} />
            ) : (
              <span className={styles.userAvatarFallback}>
                {user.first_name.charAt(0)}
                {user.last_name.charAt(0)}
              </span>
            )}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {user.first_name} {user.last_name}
            </span>
            <span className={styles.userEmail}>
              {user.department}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      width: 100,
      render: (_, user) => <RoleBadge role={user.role} />,
    },
    {
      key: 'status',
      header: 'Status',
      width: 100,
      render: (_, user) => <StatusBadge status={user.status} />,
    },
    {
      key: 'department',
      header: 'Department',
      width: 140,
    },
    {
      key: 'created_at',
      header: 'Joined',
      width: 120,
      render: (value) => new Date(value as string).toLocaleDateString(),
    },
    {
      key: 'actions',
      header: 'Actions',
      width: 100,
      align: 'center',
      render: (_, user) => (
        <div className={styles.actions}>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(user);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Users</h1>
      </div>

      <UserFilters
        filters={filters}
        onFiltersChange={setFilters}
        departments={departments}
      />

      <div className={styles.tableContainer}>
        <Table<Profile>
          data={users}
          columns={columns}
          rowKey="id"
          isLoading={isLoading}
          emptyMessage="No users found"
        />

        {!isLoading && users.length > 0 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onPageChange={setPage}
          />
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="Edit User"
        size="md"
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}

UsersPage.displayName = 'UsersPage';