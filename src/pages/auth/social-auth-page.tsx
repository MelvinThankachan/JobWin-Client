import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";
import useAuthStore from "@/stores/authStore";

type SocialAuthParams = {
  provider?: string;
};

const SocialAuthPage: React.FC = () => {
  const provider = useParams<SocialAuthParams>().provider;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });
  console.log(query);

  const setUser = useAuthStore((state) => state.setUser);
  const setTokens = useAuthStore((state) => state.setTokens);

  const [message, setMessage] = useState<React.ReactNode>(
    <Loader2 className="animate-spin" />
  );

  const errorMessage: React.ReactNode = (
    <>
      <p className="text-lg font-semibold">Something went wrong</p>
      <p className="text-sm">Please try again</p>
    </>
  );

  const closeWindow = () => {
    setTimeout(() => {
      if (window.opener) {
        window.opener.location.reload();
      }
      window.close();
    }, 3000);
  };

  useEffect(() => {
    if (
      !provider ||
      !location.search ||
      !query ||
      Object.keys(query).length === 0
    ) {
      setMessage(errorMessage);
      closeWindow();
      return;
    }

    const sendAuth = async () => {
      try {
        const response = await axiosInstance.post(
          `/simple-social-auth/${provider}/callback/`,
          query
        );
        if (response.status === 200) {
          console.log(response.data);

          setUser(response.data.user);
          setTokens({
            access: response.data.access,
            refresh: response.data.refresh,
          });

          setMessage(
            <>
              <p className="text-xl font-semibold text-success">
                Successfully logged in
              </p>
              <p className="text-lg">Redirecting...</p>
              <Loader2 className="animate-spin" />
            </>
          );
          closeWindow();
        } else {
          console.log(response);
          setMessage(errorMessage);
          closeWindow();
        }
      } catch {
        setMessage(errorMessage);
        closeWindow();
      }
    };

    sendAuth();
  }, [provider, location.search]);

  return (
    <div className="min-w-dvw min-h-dvh flex flex-col justify-center items-center gap-10 p-10">
      {message}
    </div>
  );
};

export default SocialAuthPage;
