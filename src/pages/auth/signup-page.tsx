import GoogleAuthButton from "@/components/auth/google-auth-button";
import SignupForm from "@/components/auth/signup-form";
import { H2 } from "@/components/ui/typography";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <H2 className="text-center">Get more opportunities</H2>

      <GoogleAuthButton />

      <SignupForm />

      <div className="mt-4 text-foreground/50">
        Don&apos;t have an account?{" "}
        <span className="text-primary hover:underline">
          <Link to="/auth/login">Log In</Link>
        </span>
      </div>
    </div>
  );
};

export default SignupPage;
