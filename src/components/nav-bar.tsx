import JobWinLogo from "./job-win-logo";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="section flex justify-between text-xl">
      <div className="flex gap-10">
        <JobWinLogo />
        <div>
          <Button size="lg" variant="link">
            Find Jobs
          </Button>
          <Button size="lg" variant="link">
            Find Companies
          </Button>
        </div>
      </div>
      <div className="flex gap-5">
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
      </div>
    </nav>
  );
};

export default NavBar;
