import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WinAdminDashboard from "./components/winadmin/dashboard.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import WinAdminLayout from "./components/winadmin/layout.tsx";
import WinAdminCandidates from "./components/winadmin/candidates.tsx";
import WinAdminEmployers from "./components/winadmin/employers.tsx";
import Error404 from "./components/error-404.tsx";
import App from "./App.tsx";
import LoginPage from "./pages/public/login-page.tsx";
// import LandingPage from "./pages/public/LandingPage.tsx";
// import FindJobsPage from "./pages/public/FindJobsPage.tsx";
// import FindCompaniesPage from "./pages/public/FindCompaniesPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
