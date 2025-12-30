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
    console.log('Auth store: Initialize called');
    try {
      const session = await authService.getCurrentSession();
      console.log('Auth store: Got session:', !!session);

      if (session?.user) {
        const profile = await profilesService.getById(session.user.id);
        set({
          user: session.user,
          session,
          profile,
          isAuthenticated: true,
          isInitialized: true,
        });
        console.log('Auth store: Initialized with existing session');
      } else {
        set({ isInitialized: true, isAuthenticated: false });
        console.log('Auth store: Initialized without session');
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({ isInitialized: true, isAuthenticated: false });
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      console.log('Auth store: Calling authService.signIn');
      const { user, session } = await authService.signIn({ email, password });
      console.log('Auth store: Sign in successful', { userId: user?.id });

      if (user && session) {
        try {
          console.log('Auth store: Fetching profile for user', user.id);
          const profile = await profilesService.getById(user.id);
          console.log('Auth store: Profile fetched', profile);

          // Update state with all fields at once
          const newState = {
            user,
            session,
            profile,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          };

          console.log('Auth store: About to set state with:', {
            hasUser: !!newState.user,
            hasSession: !!newState.session,
            hasProfile: !!newState.profile,
            isAuthenticated: newState.isAuthenticated,
          });

          set(newState);

          console.log('Auth store: State set complete');

          // Verify state was actually updated
          setTimeout(() => {
            const currentState = get();
            console.log('Auth store: State verification after 100ms:', {
              hasUser: !!currentState.user,
              isAuthenticated: currentState.isAuthenticated,
            });
          }, 100);
        } catch (profileError) {
          console.warn('Auth store: Profile fetch failed, continuing without profile', profileError);
          set({
            user,
            session,
            profile: null,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
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