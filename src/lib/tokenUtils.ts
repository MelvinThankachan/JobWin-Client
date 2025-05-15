import useAuthStore from '@/stores/authStore';

export interface Tokens {
  access: string;
  refresh: string;
}

/**
 * Token utility functions that work directly with the Zustand auth store
 * This avoids having two separate token storage mechanisms
 */
export const tokenUtils = {
  /**
   * Get tokens from the auth store
   */
  getTokens: (): Tokens | null => {
    // Get tokens directly from the Zustand store state
    const tokens = useAuthStore.getState().tokens;
    
    if (!tokens || !tokens.access || !tokens.refresh) {
      return null;
    }
    
    return tokens;
  },

  /**
   * Set tokens in the auth store
   */
  setTokens: (tokens: Tokens): void => {
    if (!tokens || !tokens.access || !tokens.refresh) {
      console.error('Attempted to store invalid tokens');
      return;
    }
    
    // Update tokens in the Zustand store
    useAuthStore.getState().setTokens(tokens);
  },

  /**
   * Clear tokens from the auth store
   */
  clearTokens: (): void => {
    // Clear tokens in the Zustand store
    useAuthStore.getState().removeUser();
  },

  /**
   * Get access token from the auth store
   */
  getAccessToken: (): string | null => {
    const tokens = useAuthStore.getState().tokens;
    return tokens?.access || null;
  },

  /**
   * Get refresh token from the auth store
   */
  getRefreshToken: (): string | null => {
    const tokens = useAuthStore.getState().tokens;
    return tokens?.refresh || null;
  },
  
  /**
   * Check if tokens exist and are valid
   */
  hasValidTokens: (): boolean => {
    const tokens = useAuthStore.getState().tokens;
    return !!tokens && !!tokens.access && !!tokens.refresh;
  },
  
  /**
   * Check if the current user is authenticated
   */
  isAuthenticated: (): boolean => {
    const state = useAuthStore.getState();
    return !!state.user && !!state.tokens && !!state.tokens.access && !!state.tokens.refresh;
  }
};
