import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import { authService, profilesService, type Profile } from '../services/supabase';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  isAuthenticated: boolean;
  error: string | null;

  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    department: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  session: null,
  isLoading: false,
  isInitialized: false,
  isAuthenticated: false,
  error: null,

  initialize: async () => {
    try {
      const session = await authService.getCurrentSession();

      if (session?.user) {
        const profile = await profilesService.getById(session.user.id);
        set({
          user: session.user,
          session,
          profile,
          isAuthenticated: true,
          isInitialized: true,
        });
      } else {
        set({ isInitialized: true, isAuthenticated: false });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({ isInitialized: true, isAuthenticated: false });
    }

    // Listen for auth changes
    authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const profile = await profilesService.getById(session.user.id);
        set({ user: session.user, session: session as Session, profile, isAuthenticated: true });
      } else if (event === 'SIGNED_OUT') {
        set({ user: null, session: null, profile: null, isAuthenticated: false });
      }
    });
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      console.log('Auth store: Calling authService.signIn');
      const { user, session } = await authService.signIn({ email, password });
      console.log('Auth store: Sign in successful', { userId: user?.id });

      if (user) {
        try {
          console.log('Auth store: Fetching profile for user', user.id);
          const profile = await profilesService.getById(user.id);
          console.log('Auth store: Profile fetched', profile);
          set({ user, session, profile, isAuthenticated: true, isLoading: false });
        } catch (profileError) {
          console.warn('Auth store: Profile fetch failed, continuing without profile', profileError);
          // Continue without profile - it might not exist yet
          set({ user, session, profile: null, isAuthenticated: true, isLoading: false });
        }
      }
    } catch (error) {
      console.error('Auth store: Sign in failed', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to sign in',
        isLoading: false,
      });
      throw error;
    }
  },

  signUp: async (data) => {
    set({ isLoading: true, error: null });

    try {
      await authService.signUp(data);
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign up',
        isLoading: false,
      });
      throw error;
    }
  },

  signOut: async () => {
    set({ isLoading: true });

    try {
      await authService.signOut();
      set({ user: null, session: null, profile: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to sign out',
        isLoading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));