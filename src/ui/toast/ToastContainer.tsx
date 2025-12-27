import { createPortal } from 'react-dom';
import { useToastStore } from './toast.store';
import type { ToastContainerProps } from './Toast.types';
import { Toast } from './Toast';
import styles from './Toast.module.css';

const positionClasses: Record<string, string> = {
  'top-right': styles.topRight,
  'top-left': styles.topLeft,
  'bottom-right': styles.bottomRight,
  'bottom-left': styles.bottomLeft,
  'top-center': styles.topCenter,
  'bottom-center': styles.bottomCenter,
};

export function ToastContainer({ position = 'top-right' }: ToastContainerProps) {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  const containerContent = (
    <div className={`${styles.container} ${positionClasses[position]}`}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={removeToast} />
      ))}
    </div>
  );

  return createPortal(containerContent, document.body);
}

ToastContainer.displayName = 'ToastContainer';