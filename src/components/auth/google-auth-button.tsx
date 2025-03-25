import { Button } from "@/components/ui/button";

const GoogleAuthButton = () => {
  return (
    <>
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
        <p className="text-foreground/50">Or signup with email</p>
        <div className="border flex-1"></div>
      </div>
    </>
  );
};

export default GoogleAuthButton;
