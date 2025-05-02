import axiosInstance from "@/lib/axiosInstance";

// Types
export interface Candidate {
  id: number;
  email: string;
  created_at: string;
  is_active: boolean;
  is_verified: boolean;
}

export interface Employer {
  id: number;
  email: string;
  created_at: string;
  is_active: boolean;
  is_verified: boolean;
}

export interface UserCounts {
  candidateCount: number;
  employerCount: number;
}

// API functions
export const fetchCandidates = async (): Promise<Candidate[]> => {
  const response = await axiosInstance.get("/winadmin/candidates/");
  return response.data;
};

export const fetchEmployers = async (): Promise<Employer[]> => {
  const response = await axiosInstance.get("/winadmin/employers/");
  return response.data;
};

export const fetchUserCounts = async (): Promise<UserCounts> => {
  const [candidatesResponse, employersResponse] = await Promise.all([
    axiosInstance.get("/winadmin/candidates/"),
    axiosInstance.get("/winadmin/employers/"),
  ]);
  
  return {
    candidateCount: candidatesResponse.data.length,
    employerCount: employersResponse.data.length,
  };
};

export const toggleUserActivation = async (userId: number): Promise<{ message: string }> => {
  const response = await axiosInstance.patch(`/winadmin/user/${userId}/activation/`);
  return response.data;
};

export const fetchUserDetails = async (userId: number): Promise<Candidate | Employer> => {
  const response = await axiosInstance.get(`/winadmin/user/${userId}/`);
  return response.data;
};
