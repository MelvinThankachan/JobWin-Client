import NavBar from "@/components/nav-bar";
import { Outlet } from "react-router-dom";

const PublicPageLayout = () => {
  return (
    <div className="page-layout">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default PublicPageLayout;


