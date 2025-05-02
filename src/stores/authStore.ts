import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

type UserType = {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  is_verified: boolean;
};

type TokenType = {
  access: string;
  refresh: string;
};

type OTPType = {
  expires_at: number;
};

const getErrorMessage = (error: any): string => {
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  if (error.response?.data?.otp) {
    return error.response.data.otp;
  }
  if (error.message) {
    return error.message;
  }
  return "An unknown error occurred";
};

type AuthStoreType = {
  user: UserType | null;
  tokens: TokenType | null;
  otp: OTPType | null;
  isLoading: boolean;
  error: string | null;
  verificationToken: string | null;

  // Actions
  setUser: (user: UserType | null) => void;
  setTokens: (tokens: TokenType | null) => void;
  setOTP: (otp: OTPType | null) => void;
  removeUser: () => void;

  // API functions
  signup: (data: {
    email: string;
    password: string;
    role: string;
  }) => Promise<any>;
  login: (data: {
    email: string;
    password: string;
    role: string;
  }) => Promise<any>;
  verifyOTP: (
    email: string,
    otp: string,
    verificationToken: string | null
  ) => Promise<any>;
  verifyOTPWithoutAuth: (
    email: string,
    otp: string,
    verificationToken: string | null
  ) => Promise<any>;
  resendOTP: (email: string) => Promise<any>;
  resendOTPWithoutAuth: (email: string) => Promise<any>;
};

const useAuthStore = create<AuthStoreType>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      otp: null,
      isLoading: false,
      error: null,
      verificationToken: null,

      setUser: (user) => set({ user }),
      setTokens: (tokens) => set({ tokens }),
      setOTP: (otp) => set({ otp }),
      removeUser: () =>
        set({ user: null, tokens: null, otp: null, verificationToken: null }),

      signup: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/signup/", data);
          set({
            user: response.data.user,
            tokens: {
              access: response.data.access,
              refresh: response.data.refresh,
            },
            verificationToken: response.data.verification_token,
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({ error: getErrorMessage(error), isLoading: false });
          throw error;
        }
      },

      login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/login/", data);
          set({
            user: response.data.user,
            tokens: {
              access: response.data.access,
              refresh: response.data.refresh,
            },
            verificationToken: response.data.verification_token || null,
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({ error: getErrorMessage(error), isLoading: false });
          throw error;
        }
      },

      verifyOTP: async (email, otp, verificationToken) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/verify-otp/", {
            email,
            otp,
            verification_token: verificationToken,
          });
          set({
            user: response.data.user || get().user,
            tokens: {
              access: response.data.access,
              refresh: response.data.refresh,
            },
            verificationToken: null,
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({ error: getErrorMessage(error), isLoading: false });
          throw error;
        }
      },

      verifyOTPWithoutAuth: async (email, otp, verificationToken) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${axiosInstance.defaults.baseURL}/auth/verify-otp/`,
            {
              email,
              otp,
              verification_token: verificationToken,
            },
            { headers: { "Content-Type": "application/json" } }
          );
          set({
            user: response.data.user || get().user,
            tokens: {
              access: response.data.access,
              refresh: response.data.refresh,
            },
            verificationToken: null,
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({ error: getErrorMessage(error), isLoading: false });
          throw error;
        }
      },

      resendOTP: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post("/auth/resend-otp/", {
            email,
          });
          set({
            verificationToken: response.data.verification_token,
            otp: { expires_at: response.data.expires_at },
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({ error: getErrorMessage(error), isLoading: false });
          throw error;
        }
      },

      resendOTPWithoutAuth: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(
            `${axiosInstance.defaults.baseURL}/auth/resend-otp/`,
            { email },
            { headers: { "Content-Type": "application/json" } }
          );
          set({
            verificationToken: response.data.verification_token,
            otp: { expires_at: response.data.expires_at },
            isLoading: false,
          });
          return response.data;
        } catch (error) {
          set({ error: getErrorMessage(error), isLoading: false });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        verificationToken: state.verificationToken,
      }),
    }
  )
);

export default useAuthStore;
