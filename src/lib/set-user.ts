import { UserType } from "./types";

export const setUser = (refresh: string, access: string, user: UserType) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("refreshToken", refresh);
  localStorage.setItem("accessToken", access);
  console.log("User set successfully", user);
};
