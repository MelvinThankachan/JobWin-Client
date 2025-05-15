import axiosInstance from "@/lib/axiosInstance";
import useAuthStore from "@/stores/authStore";

export type EmployerProfile = {
  id?: number;
  company_name: string;
  logo?: File | null;
  website?: string | null;
  industry: string;
  company_size: string;
  year_founded?: number | null;
  contact_person: string;
  contact_email: string;
  address?: string;
  city: string;
  state: string;
  country: string;
  postal_code?: string;
  description: string;
  mission?: string;
  culture?: string;
  linkedin?: string | null;
  benefits?: string;
  is_profile_completed?: boolean;
};

export const getEmployerProfile = async (): Promise<EmployerProfile> => {
  // Simplified authentication check
  const user = useAuthStore.getState().user;
  if (!user) {
    throw new Error("Authentication required");
  }
  
  if (user.role !== "employer") {
    throw new Error("Only employers can access this resource");
  }
  
  try {
    // The authorization header will be added by the axios interceptor
    const response = await axiosInstance.get("/employer/profile/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployerProfile = async (
  profileData: Partial<EmployerProfile>
): Promise<EmployerProfile> => {
  // Simplified authentication check
  const user = useAuthStore.getState().user;
  if (!user) {
    throw new Error("Authentication required");
  }
  
  if (user.role !== "employer") {
    throw new Error("Only employers can access this resource");
  }
  
  try {
    // Create a clean copy of the data to process
    const processedData: Record<string, any> = {};
    
    // Only include defined fields and handle special cases
    Object.entries(profileData).forEach(([key, value]) => {
      // Skip undefined values
      if (value === undefined) return;
      
      // Handle empty strings for text fields - convert to empty string rather than null
      // This matches Django's expectation for CharField/TextField
      if (typeof value === 'string') {
        processedData[key] = value;
      } 
      // Handle special nullable fields
      else if (key === 'year_founded') {
        if (value === null || (typeof value === 'string' && value === '') || value === 0) {
          processedData[key] = null;
        } else {
          processedData[key] = value;
        }
      }
      // Handle URL fields - Django URLField expects either a valid URL or null
      else if (key === 'website' || key === 'linkedin') {
        if (value === null || (typeof value === 'string' && value === '')) {
          processedData[key] = null;
        } else {
          processedData[key] = value;
        }
      }
      // Handle all other fields
      else {
        processedData[key] = value;
      }
    });
    
    // If there's a logo file, we need to use FormData
    if (profileData.logo instanceof File) {
      const formData = new FormData();
      
      // Add the logo file
      formData.append("logo", profileData.logo);
      
      // Add all other fields
      Object.entries(processedData).forEach(([key, value]) => {
        if (key !== "logo" && value !== undefined) {
          // Convert null to empty string for form data
          formData.append(key, value === null ? '' : String(value));
        }
      });
      
      console.log('Sending form data:', Object.fromEntries(formData));
      
      const response = await axiosInstance.patch("/employer/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      
      return response.data;
    }
    
    // If no logo file, use regular JSON
    console.log('Sending JSON data:', processedData);
    const response = await axiosInstance.patch("/employer/profile/", processedData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating profile:', error.response?.data || error.message);
    throw error;
  }
};
