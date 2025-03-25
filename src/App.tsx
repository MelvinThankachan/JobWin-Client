import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { H1 } from "./components/ui/typography";
import WinAdminDashboard from "./components/winadmin/dashboard";
import WinAdminCandidates from "./components/winadmin/candidates";
import WinAdminEmployers from "./components/winadmin/employers";
import WinAdminLayout from "./components/winadmin/layout";
import { ThemeProvider } from "@/components/theme-provider";
import DarkModeToggle from "./components/dark-mode-toggle";
import Error404Page from "./pages/public/error-404-page";
import AuthPageLayout from "./pages/auth/auth-page-layout";
import LoginPage from "./pages/auth/login-page";
import SignupPage from "./pages/auth/signup-page";

const router = createBrowserRouter([
  // Public Pages
  {
    path: "/",
    element: (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <H1>JobWin!</H1>
      </div>
    ),
    errorElement: <Error404Page />,
  },

  // Auth Pages
  {
    path: "/auth",
    element: <AuthPageLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/signup",
        element: <SignupPage />,
      },
    ],
  },

  // {
  //   path: "/find-jobs",
  //   element: <FindJobsPage />,
  // },
  // {
  //   path: "/find-companies",
  //   element: <FindCompaniesPage />,
  // },

  // WinAdmin Pages
  {
    path: "/winadmin",
    element: <WinAdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/winadmin/dashboard" replace />,
      },
      {
        path: "/winadmin/dashboard",
        element: <WinAdminDashboard />,
      },
      {
        path: "/winadmin/candidates",
        element: <WinAdminCandidates />,
      },
      {
        path: "/winadmin/employers",
        element: <WinAdminEmployers />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main>
        <div className="fixed right-5 bottom-5 z-10">
          <DarkModeToggle />
        </div>
        <RouterProvider router={router} />;
      </main>
    </ThemeProvider>
  );
};

export default App;
