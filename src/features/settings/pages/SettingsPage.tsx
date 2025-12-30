import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../store/auth.store';
import { profilesService, type ProfileUpdate } from '../../../services/supabase';
import { Button, Input } from '../../../ui';
import { toast } from '../../../ui/toast';
import styles from './Settings.module.css';

export function SettingsPage() {
  const { user, profile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    department: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.first_name,
        lastName: profile.last_name,
        department: profile.department,
      });
    }
  }, [profile]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user?.id) {
      toast.error('User not authenticated');
      setIsLoading(false);
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.department) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const updates: ProfileUpdate = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        department: formData.department,
      };

      await profilesService.update(user.id, updates);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        firstName: profile.first_name,
        lastName: profile.last_name,
        department: profile.department,
      });
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h1 className={styles.settingsTitle}>Profile Settings</h1>
        <p className={styles.settingsSubtitle}>
          Update your personal information and preferences
        </p>
      </div>

      <div className={styles.settingsCard}>
        <form onSubmit={handleSubmit} className={styles.settingsForm}>
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>

            <div className={styles.formRow}>
              <Input
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="John"
              />
              <Input
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Doe"
              />
            </div>

            <Input
              label="Email"
              type="email"
              value={user?.email || ''}
              disabled
              placeholder="you@company.com"
            />

            <Input
              label="Department"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              placeholder="Engineering"
            />
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Account Information</h2>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Role</span>
                <span className={styles.infoValue}>{profile?.role || 'N/A'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Status</span>
                <span className={styles.infoValue}>{profile?.status || 'N/A'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Member Since</span>
                <span className={styles.infoValue}>
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.formActions}>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

SettingsPage.displayName = 'SettingsPage';
