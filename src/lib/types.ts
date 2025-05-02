export type UserType = {
  id: string;
  email: string;
  role: "candidate" | "employer" | "admin";
  isActive: boolean;
  isVerified: boolean;
};

export type TokenType = {
  refresh: string;
  access: string;
};

export type OTPType = {
  // created_at: number;
  expires_at: number;
};
