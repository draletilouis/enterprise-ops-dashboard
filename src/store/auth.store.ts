import { create } from 'zustand';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    
    // Mock login - replace with real API call later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      password,
      name: 'John Doe',
      role: 'admin',
    };
    
    set({ 
      user: mockUser, 
      isAuthenticated: true,
      isLoading: false 
    });
  },
  
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
  
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
}));