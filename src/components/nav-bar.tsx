import JobWinLogo from "./job-win-logo";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import { LogOut, User } from "lucide-react";

const NavBar = () => {
  const user = useAuthStore((state) => state.user);
  const removeUser = useAuthStore((state) => state.removeUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    navigate("/");
  };

  return (
    <nav className="section flex justify-between items-center text-xl">
      <div className="flex gap-10">
        <Link to="/">
          <JobWinLogo />
        </Link>
        <div>
          {user && user.role === "employer" ? (
            // Navigation links for employers
            <>
              <Link to="/employer/dashboard">
                <Button size="lg" variant="link">
                  Dashboard
                </Button>
              </Link>
              <Link to="/employer/profile">
                <Button size="lg" variant="link">
                  Company Profile
                </Button>
              </Link>
            </>
          ) : (
            // Navigation links for candidates and public
            <>
              <Link to="/jobs">
                <Button size="lg" variant="link">
                  Find Jobs
                </Button>
              </Link>
              <Link to="/companies">
                <Button size="lg" variant="link">
                  Find Companies
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-5 items-center">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-primary">
              <User size={20} />
              <span className="font-medium">{user.email}</span>
            </div>
            <Separator orientation="vertical" />
            <Button
              size="lg"
              variant="destructive"
              className="flex gap-2 items-center"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/auth/login">
              <Button size="lg" variant="link">
                Login
              </Button>
            </Link>
            <Separator orientation="vertical" />
            <Link to="/auth/signup">
              <Button size="lg" className="px-10">
                Signup
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
