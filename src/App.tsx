import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { H1 } from "./components/ui/typography";
import Error404 from "./components/error-404";
import LoginPage from "./pages/public/login-page";
import WinAdminDashboard from "./components/winadmin/dashboard";
import WinAdminCandidates from "./components/winadmin/candidates";
import WinAdminEmployers from "./components/winadmin/employers";
import WinAdminLayout from "./components/winadmin/layout";
import SignupPage from "./pages/public/signup-page";
import { ThemeProvider } from "@/components/theme-provider";
import DarkModeToggle from "./components/dark-mode-toggle";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <H1>JobWin!</H1>
      </div>
    ),
    errorElement: <Error404 />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },

  // {
  //   path: "/find-jobs",
  //   element: <FindJobsPage />,
  // },
  // {
  //   path: "/find-conpanies",
  //   element: <FindCompaniesPage />,
  // },

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
        <div className="fixed right-5 top-5 z-10">
          <DarkModeToggle />
        </div>
        <RouterProvider router={router} />;
      </main>
    </ThemeProvider>
  );
};

export default App;
