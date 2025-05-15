import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";
import useEmployerStore from "@/stores/employerStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { H1, H3 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Upload } from "lucide-react";
import type { EmployerProfile } from "@/services/employerService";
import type { EmployerProfileType } from "@/stores/employerStore";

// Form validation schema
const profileSchema = z.object({
  company_name: z.string().min(1, { message: "Company name is required" }),
  logo: z.any().optional(), // File upload field
  // website: z
  //   .string()
  //   .url({ message: "Please enter a valid URL" })
  //   .optional()
  //   .or(z.literal(""))
  //   .transform(val => val === "" ? null : val),
  industry: z.string().min(1, { message: "Industry is required" }),
  company_size: z.string().min(1, { message: "Company size is required" }),
  year_founded: z
    .union([
      z.coerce.number().min(1800, { message: "Year must be after 1800" }),
      z.literal("").transform(() => null),
      z.null(),
    ])
    .optional(),

  // Contact Information - Required fields
  contact_person: z.string().min(1, { message: "Contact person is required" }),
  contact_email: z.string().email({ message: "Please enter a valid email" }),

  // Address - Some fields required based on backend model
  address: z.string().default(""),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  postal_code: z.string().optional().default(""),

  // Company Details
  description: z
    .string()
    .min(1, { message: "Company description is required" }),
  mission: z.string().optional().default(""),
  culture: z.string().optional().default(""),
  // linkedin: z
  //   .string()
  //   .url({ message: "Please enter a valid LinkedIn URL" })
  //   .optional()
  //   .or(z.literal(""))
  //   .transform(val => val === "" ? null : val),
  benefits: z.string().optional().default(""),
});

const EmployerProfile = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  // Use the employer store
  const { profile, isLoading, fetchProfile, updateProfile } =
    useEmployerStore();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      company_name: "",
      logo: undefined,
      // website: "",
      industry: "",
      company_size: "",
      year_founded: null,
      contact_person: "",
      contact_email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      description: "",
      mission: "",
      culture: "",
      // linkedin: "",
      benefits: "",
    },
  });

  // Check if user is authenticated and is an employer
  useEffect(() => {
    if (!user) {
      toast.error("Authentication required", {
        description: "Please log in to access this page",
      });
      navigate("/auth/login");
      return;
    }

    if (user.role !== "employer") {
      toast.error("Access denied", {
        description: "Only employers can access this page",
      });
      navigate("/");
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user || user.role !== "employer") {
      return;
    }

    const loadProfile = async () => {
      try {
        await fetchProfile();
      } catch (error: any) {
        toast.error("Failed to load profile", {
          description: error.message || "Please try again later",
        });
      }
    };

    loadProfile();
  }, [user, fetchProfile]);

  useEffect(() => {
    if (profile) {
      const formValues: Record<string, any> = {};

      Object.keys(profile).forEach((key) => {
        if (key !== "logo" && key !== "is_profile_completed" && key !== "id") {
          formValues[key] = profile[key as keyof EmployerProfile];
          form.setValue(key as any, profile[key as keyof EmployerProfile]);
        }
      });

      form.reset(formValues);

      if (profile.logo) {
        setLogoPreview(String(profile.logo));
      }
    }
  }, [profile, form]);

  useEffect(() => {
    const handleLogout = () => {
      navigate("/auth/login");
    };

    window.addEventListener("auth-logout", handleLogout);

    return () => {
      window.removeEventListener("auth-logout", handleLogout);
    };
  }, [navigate]);

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const formData: Partial<EmployerProfileType> = {
        ...values,
      };

      if (form.getValues("logo") instanceof File) {
        formData.logo = form.getValues("logo") as File;
      }
      console.log("Submitting profile data:", formData);

      const updatedProfile = await updateProfile(formData);

      if (updatedProfile) {
        console.log("Profile updated successfully:", updatedProfile);

        form.reset(form.getValues());

        toast.success("Profile updated successfully");
      }
    } catch (error: any) {
      console.error("Profile update error:", error);

      if (error.response?.status === 400 && error.response?.data) {
        const backendErrors = error.response.data;
        console.log("Backend validation errors:", backendErrors);

        Object.entries(backendErrors).forEach(([field, messages]) => {
          if (field in form.getValues()) {
            form.setError(field as any, {
              type: "server",
              message: Array.isArray(messages)
                ? messages[0]
                : (messages as string),
            });
          }
        });

        if (backendErrors.non_field_errors || backendErrors.detail) {
          const message =
            backendErrors.non_field_errors?.[0] || backendErrors.detail;
          toast.error("Validation Error", { description: message });
        }
      } else {
        toast.error("Failed to update profile", {
          description: error.message || "Please try again later",
        });
      }
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("logo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <H1 className="text-2xl font-bold text-primary mb-6">Company Profile</H1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Information Section */}
          <div className="space-y-6">
            <H3 className="text-lg font-medium">Company Information</H3>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="w-24 h-24">
                      {logoPreview ? (
                        <AvatarImage src={logoPreview} alt="Company Logo" />
                      ) : (
                        <AvatarFallback className="text-lg">
                          {form.getValues("company_name")?.[0]?.toUpperCase() ||
                            "C"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() =>
                        document.getElementById("logo-upload")?.click()
                      }
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <FormField
                      control={form.control}
                      name="company_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Company Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Company Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Company Description{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief description of your company..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Website field removed due to validation issues */}
                  {/* 
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                */}

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Industry <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Technology, Healthcare"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company Size <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. 1-10, 11-50, 51-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year_founded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Founded</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 2010"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6">
            <H3 className="text-lg font-medium">Contact Information</H3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="contact_person"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Contact Person <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Contact Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Address <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Street Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          City <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          State/Province <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="State/Province" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Country <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postal_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Details Section */}
          <div className="space-y-6">
            <H3 className="text-lg font-medium">Additional Details</H3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="mission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Mission</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What is your company's mission?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="culture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Culture</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your company culture..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Benefits & Perks</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List the benefits and perks your company offers..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* LinkedIn field removed due to validation issues */}
                  {/* 
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/company/example"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  */}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between mt-6">
            <div>
              {form.formState.isDirty && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isLoading}
                >
                  Cancel Changes
                </Button>
              )}
            </div>
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isDirty}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>

          <div className="text-xs text-gray-500 mt-2">
            <span className="text-red-500">*</span> Required fields
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployerProfile;
