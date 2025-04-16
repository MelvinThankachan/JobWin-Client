export type UserType = {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  isVerified: boolean;
};

export type TokenType = {
  refresh: string;
  access: string;
};


export type OTPType = {
  expires_at: number;
};