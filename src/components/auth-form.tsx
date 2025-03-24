import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const AuthForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={cn("flex flex-col gap-10 w-full", className)} {...props}>
      <Button variant="outline">
        <img
          src="/google-logo.svg"
          alt="Google Logo"
          className="h-6 w-6 mr-2"
        />
        Continue with Google
      </Button>

      <div className="flex items-center gap-5">
        <div className="border flex-1"></div>
        <p className="text-foreground/50">Or login with email</p>
        <div className="border flex-1"></div>
      </div>
      <form className="flex flex-col gap-10">
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-foreground/75 hover:text-foreground text-sm hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            placeholder="Enter password"
            type="password"
            required
          />
        </div>
        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
};

export default AuthForm;
