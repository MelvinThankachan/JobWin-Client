import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Loader2 } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address." }),
  password: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AdminLoginForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const navigate = useNavigate();

  async function onSubmit(values: FormValues) {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {

      const response = await axios.post(
        "http://localhost:8000/api/auth/admin-login/",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data) {
        const { user, refresh, access } = response.data;


        useAuthStore.getState().setUser(user);
        useAuthStore.getState().setTokens({ refresh, access });

        toast.success("Login successful!", {
          description: "Welcome back, Admin!",
        });


        navigate("/winadmin/dashboard");
      }
    } catch (error: any) {
      console.error("Admin login error:", error);

      if (error.response?.status === 400 && error.response?.data) {
        const backendErrors = error.response.data;

        if (backendErrors.email) {
          form.setError("email", {
            type: "server",
            message: backendErrors.email[0],
          });
        }
        if (backendErrors.password) {
          form.setError("password", {
            type: "server",
            message: backendErrors.password[0],
          });
        }
      } else {
        const errorMessage = error.message || "An unexpected error occurred";
        toast.error("Failed to log in", {
          description: errorMessage,
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        className="w-full flex flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your admin email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="animate-spin mr-2" />}
          Login as Admin
        </Button>
      </form>
    </Form>
  );
}
