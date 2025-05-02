import ExploreCategorySection from "@/components/explore-category-section";
import HeroSection from "@/components/hero-section";

/**
 * Landing page component - displays the public landing page
 * Note: Authentication redirects are now handled by the AuthGuard component
 */
const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 w-full">
      <HeroSection />
      <ExploreCategorySection />
    </main>
  );
};

export default LandingPage;
