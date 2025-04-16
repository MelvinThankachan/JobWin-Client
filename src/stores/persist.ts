import { persist } from 'zustand/middleware';

const persistMiddleware = persist({
  name: 'user-store', // The name of the store
  getStorage: () => localStorage, // Use localStorage as the storage
});

export default persistMiddleware;