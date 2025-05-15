import { useEffect } from 'react';
import useAuthStore from '@/stores/authStore';

/**
 * AuthInitializer component
 * 
 * This component initializes the authentication system when the app loads.
 * It ensures that the token management is properly set up and handles auth events.
 */
const AuthInitializer = () => {
  const removeUser = useAuthStore(state => state.removeUser);
  
  useEffect(() => {
    console.log('AuthInitializer: Setting up auth event listeners');
    
    // Handle auth logout events
    const handleLogout = () => {
      console.log('AuthInitializer: Logout event received');
      removeUser();
    };
    
    // Add event listeners
    window.addEventListener('auth-logout', handleLogout);
    
    // Clean up
    return () => {
      window.removeEventListener('auth-logout', handleLogout);
    };
  }, [removeUser]);
  
  return null; // This component doesn't render anything
};

export default AuthInitializer;
