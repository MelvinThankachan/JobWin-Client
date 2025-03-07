import JobWinLogo from "./job-win-logo";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-start w-full h-full py-5">
      <div className="container mx-auto flex justify-start">
        <JobWinLogo />
      </div>
    </nav>
  );
};

export default NavBar;
