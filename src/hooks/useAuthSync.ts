import { useEffect } from 'react';
import useAuthStore from '@/stores/authStore';

/**
 * Hook to synchronize auth tokens between localStorage and the auth store
 * This should be used in the main App component to ensure tokens are always in sync
 */
export const useAuthSync = () => {
  const setTokens = useAuthStore(state => state.setTokens);
  const removeUser = useAuthStore(state => state.removeUser);
  
  // On mount, check if there are tokens in localStorage
  useEffect(() => {
    // No need to sync tokens manually as Zustand persist middleware handles this
  }, []);
  
  // Listen for token events from other components
  useEffect(() => {
    const handleTokensUpdated = (event: CustomEvent) => {
      if (event.detail?.tokens) {
        setTokens(event.detail.tokens);
      }
    };
    
    const handleTokensCleared = () => {
      removeUser();
    };
    
    const handleLogout = () => {
      removeUser();
    };
    
    // Add event listeners
    window.addEventListener('auth-tokens-updated', handleTokensUpdated as EventListener);
    window.addEventListener('auth-tokens-cleared', handleTokensCleared);
    window.addEventListener('auth-logout', handleLogout);
    
    // Clean up
    return () => {
      window.removeEventListener('auth-tokens-updated', handleTokensUpdated as EventListener);
      window.removeEventListener('auth-tokens-cleared', handleTokensCleared);
      window.removeEventListener('auth-logout', handleLogout);
    };
  }, [setTokens, removeUser]);
  
  // Utility function to check if user is authenticated
  const isAuthenticated = () => {
    const state = useAuthStore.getState();
    return !!state.user && !!state.tokens && !!state.tokens.access && !!state.tokens.refresh;
  };
  
  return { isAuthenticated };
};
