import SignupForm from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import { H2, Muted, P } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-xl flex flex-col items-center gap-10">
        <H2>Welcome Back, Dude</H2>
        <Button variant="outline" size="fill" className="gap-5">
          <Image
            src="/google-logo.svg"
            alt="Google Logo"
            width={25}
            height={25}
          />{" "}
          Signup with Google
        </Button>
        <div className="w-full flex items-center justify-center gap-5">
          <div className="flex-grow border-t border-border" />
          <Muted className="text-base">Or sign up with email</Muted>
          <div className="flex-grow border-t border-border" />
        </div>
        <SignupForm />
        <div className="flex items-center justify-start w-full">
          <P>Already have an account?</P>
          <Link href="/auth/login">
            <Button variant="link" className="">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
