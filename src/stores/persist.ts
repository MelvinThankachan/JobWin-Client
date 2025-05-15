import { persist } from "zustand/middleware";

const persistMiddleware = persist({
  name: "user-store",
  getStorage: () => localStorage,
});

export default persistMiddleware;
