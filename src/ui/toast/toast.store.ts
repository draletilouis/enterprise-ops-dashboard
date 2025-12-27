import { create } from 'zustand';
import type { ToastStore } from './Toast.types';

let toastCounter = 0;
const generateId = () => `toast-${Date.now()}-${++toastCounter}`;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = generateId();

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));

const DEFAULT_DURATION = 5000;

export const toast = {
  success: (message: string, duration = DEFAULT_DURATION) => {
    return useToastStore.getState().addToast({
      message,
      variant: 'success',
      duration,
    });
  },

  error: (message: string, duration = DEFAULT_DURATION) => {
    return useToastStore.getState().addToast({
      message,
      variant: 'error',
      duration,
    });
  },

  warning: (message: string, duration = DEFAULT_DURATION) => {
    return useToastStore.getState().addToast({
      message,
      variant: 'warning',
      duration,
    });
  },

  info: (message: string, duration = DEFAULT_DURATION) => {
    return useToastStore.getState().addToast({
      message,
      variant: 'info',
      duration,
    });
  },

  dismiss: (id: string) => {
    useToastStore.getState().removeToast(id);
  },

  dismissAll: () => {
    useToastStore.getState().clearToasts();
  },
};