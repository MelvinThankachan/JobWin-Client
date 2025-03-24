import { Link } from "react-router-dom";
import LoginForm from "./auth-form";
import { H2 } from "./ui/typography";

const LoginPageContent = () => {
  return (
    <div className="flex flex-col gap-10 pt-5">
      <H2 className="text-center">Welcome Back, Dude</H2>

      <LoginForm />

      <div className="mt-4 text-foreground/50">
        Don&apos;t have an account?{" "}
        <span className="text-primary hover:underline">
          <Link to="/signup">Sign up</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPageContent;
