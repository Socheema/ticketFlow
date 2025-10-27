import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email || !password) {
      return { success: false, error: 'Please fill in all fields' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Mock successful login
    const user = {
      id: '1',
      name: email.split('@')[0],
      email: email,
    };

    set({ user, isAuthenticated: true });
    return { success: true };
  },

  signup: async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!name || !email || !password) {
      return { success: false, error: 'Please fill in all fields' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    if (!email.includes('@')) {
      return { success: false, error: 'Please enter a valid email' };
    }

    // Mock successful signup
    const user = {
      id: '1',
      name: name,
      email: email,
    };

    set({ user, isAuthenticated: true });
    return { success: true };
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
