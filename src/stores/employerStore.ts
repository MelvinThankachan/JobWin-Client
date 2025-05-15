import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getEmployerProfile, updateEmployerProfile, type EmployerProfile } from "@/services/employerService";

// Use the EmployerProfile type from the service
export type EmployerProfileType = EmployerProfile;

type EmployerStoreType = {
  profile: EmployerProfileType | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchProfile: () => Promise<EmployerProfileType | null>;
  updateProfile: (data: Partial<EmployerProfileType>) => Promise<EmployerProfileType | null>;
  setProfile: (profile: EmployerProfileType | null) => void;
  resetProfile: () => void;
  
  // Helper functions
  isProfileComplete: () => boolean;
};


const useEmployerStore = create<EmployerStoreType>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      error: null,
      
      fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const profile = await getEmployerProfile();
          set({ profile, isLoading: false });
          return profile;
        } catch (error: any) {
          set({ 
            error: error.message || "Failed to fetch profile", 
            isLoading: false 
          });
          return null;
        }
      },
      
      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const updatedProfile = await updateEmployerProfile(data);
          set({ profile: updatedProfile, isLoading: false });
          return updatedProfile;
        } catch (error: any) {
          set({ 
            error: error.message || "Failed to update profile", 
            isLoading: false 
          });
          return null;
        }
      },
      
      setProfile: (profile) => set({ profile }),
      
      resetProfile: () => set({ profile: null }),
      
      isProfileComplete: () => {
        const profile = get().profile;
        if (!profile) return false;
        
        // Check required fields
        const requiredFields: (keyof EmployerProfileType)[] = [
          'company_name',
          'industry',
          'company_size',
          'contact_person',
          'contact_email',
          'city',
          'state',
          'country',
          'description'
        ];
        
        return requiredFields.every(field => !!profile[field]);
      }
    }),
    {
      name: "employer-storage",
      partialize: (state) => ({ profile: state.profile }),
    }
  )
);

export default useEmployerStore;
