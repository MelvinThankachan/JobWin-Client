import JobWinLogo from "@/components/job-win-logo";
import NavBar from "@/components/nav-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - JobWin",
  description: "Authentication - JobWin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
