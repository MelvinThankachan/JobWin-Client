import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axiosInstance";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const GoogleAuthButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (provider: string) => {
    setIsLoading(true);

    const width = 500;
    const height = 600;
    const left = window.screenX + (window.screen.width - width) / 2;
    const top = window.screenY + (window.screen.height - height) / 2;

    const response = await axiosInstance.get(
      `/simple-social-auth/${provider}/auth-url/`,
      {
        params: {
          role: "employer",
        },
      }
    );

    const authorizationUrl = response.data.authorization_url;
    console.log(authorizationUrl);

    const popup = window.open(
      authorizationUrl,
      `${provider}LoginPopup`,
      `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=false,status=1`
    );

    // Polling to check if the popup is closed
    const popupTick = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(popupTick);
        setIsLoading(false);
      }
    }, 500);
  };
  return (
    <>
      <Button
        variant="outline"
        className="active:scale-[98%] hover:bg-primary/5"
        onClick={() => handleLogin("google")}
      >
        <img
          src="/google-logo.svg"
          alt="Google Logo"
          className="h-6 w-6 mr-2"
        />
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Continue with Google"
        )}
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
