import { create } from "zustand";
import { UserType, TokenType, OTPType } from "@/lib/types";
import { persist } from "zustand/middleware";

type AuthStoreType = {
  user: UserType | null;
  tokens: TokenType | null;
  otp: OTPType | null;
  setUser: (user: UserType | null) => void;
  setTokens: (tokens: TokenType | null) => void;
  setOTP: (otp: OTPType | null) => void;
  removeUser: () => void;
};

const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      otp: null,
      setUser: (user) => set({ user }),
      setTokens: (tokens) => set({ tokens }),
      setOTP: (otp) => set({ otp }),
      removeUser: () => set({ user: null, tokens: null, otp: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
