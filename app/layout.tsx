import type { Metadata } from "next";
import "./globals.css";
import { epilogue, clashDisplay, jetBrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "JobWin",
  description: "A job search platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${epilogue.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased flex flex-col gap-5 min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="absolute right-4 top-4 z-[100]">
            <DarkModeToggle />
          </div>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
