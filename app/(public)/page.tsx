import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import axiosInstance from "@/lib/axiosInstance";

const Home = () => {
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      console.log(response.data);
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <H1>Home Page</H1>
      {/* <Button>Click Me</Button> */}
    </div>
  );
};

export default Home;
