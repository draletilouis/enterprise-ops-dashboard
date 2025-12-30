import { useState, useEffect } from 'react';
import type { Profile, ProfileUpdate } from '../../../services/supabase';
import { Button } from '../../../ui/';
import { Input } from '../../../ui/input';
import styles from './Users.module.css';

interface UserFormProps {
  user: Profile | null;
  onSubmit: (userData: ProfileUpdate) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function UserForm({ user, onSubmit, onCancel, isLoading }: UserFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: 'viewer' as Profile['role'],
    status: 'pending' as Profile['status'],
    department: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        status: user.status,
        department: user.department,
      });
    }
  }, [user]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <Input
          label="First Name"
          value={formData.first_name}
          onChange={(e) => handleChange('first_name', e.target.value)}
          error={errors.first_name}
          placeholder="Enter first name"
        />
        <Input
          label="Last Name"
          value={formData.last_name}
          onChange={(e) => handleChange('last_name', e.target.value)}
          error={errors.last_name}
          placeholder="Enter last name"
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.selectWrapper}>
          <label className={styles.selectLabel}>Role</label>
          <select
            className={styles.select}
            value={formData.role}
            onChange={(e) => handleChange('role', e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className={styles.selectWrapper}>
          <label className={styles.selectLabel}>Status</label>
          <select
            className={styles.select}
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <Input
        label="Department"
        value={formData.department}
        onChange={(e) => handleChange('department', e.target.value)}
        error={errors.department}
        placeholder="Enter department"
      />

      <div className={styles.formActions}>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Update User
        </Button>
      </div>
    </form>
  );
}

UserForm.displayName = 'UserForm';