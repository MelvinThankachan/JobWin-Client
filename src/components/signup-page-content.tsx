import { Link } from "react-router-dom";
import AuthForm from "./auth-form";
import { H2 } from "./ui/typography";

const SignupPageContent = () => {
  return (
    <div className="flex flex-col gap-10 pt-5">
      <H2 className="text-center">Get more opportunities</H2>

      <AuthForm />

      <div className="mt-4 text-foreground/50">
        Don&apos;t have an account?{" "}
        <span className="text-primary hover:underline">
          <Link to="/login">Log In</Link>
        </span>
      </div>
    </div>
  );
};

export default SignupPageContent;
