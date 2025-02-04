import { create } from 'zustand';
interface AuthState {
  user: null | { id: string; name: string; email: string };
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<void>;
  // ... other actions

}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      console.log(response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('HElo failed' || 'Login failed');
      }

      const data = await response.json();
      set({ user: data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed', loading: false });
      throw error;
    }
  },
  refreshUserData: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/check-auth', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.isAuthenticated) {
        set({ 
          user: data.user,
          isAuthenticated: true
        });
      }
    } catch (error) {
      console.error('Refresh error:', error);
    }
  },
  register: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      set({ 
        user: data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false
      });
      throw error;
    }
  },
  

  logout: async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        credentials: 'include'
      });
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Logout failed' });
    }
  },

  checkAuthStatus: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/check-auth', {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Auth check failed');
      
      const data = await response.json();
      set({ 
        isAuthenticated: data.isAuthenticated,
        user: data.user || null
      });
    } catch (error) {
      set({ isAuthenticated: false, user: null });
    }
  },
  // Add these to your auth store actions
  toggleFavorite: async (petId: string) => {
    try {
      await fetch(`http://localhost:5000/api/pets/${petId}/favorite`, {
        method: 'POST',
        credentials: 'include'
      });
      // Refresh user data after successful toggle
      useAuthStore.getState().refreshUserData();
    } catch (error) {
      console.error('Favorite error:', error);
    }
  },
  
  // Add to your auth store actions
submitAdoption: async (petId: string) => {
  try {
    const response = await fetch(`http://localhost:5000/api/pets/${petId}/adopt`, {
      method: 'POST',
      credentials: 'include'
    });
    
    if (!response.ok) throw new Error('Adoption request failed');
    
    const updatedRequests = await response.json();
    set(state => ({
      user: state.user ? {
        ...state.user,
        adoptionRequests: updatedRequests
      } : null
    }));
  } catch (error) {
    console.error('Adoption error:', error);
    throw error;
  }
},
  








}));

// export default useAuthStore;