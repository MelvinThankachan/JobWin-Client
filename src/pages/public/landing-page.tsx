import ExploreCategorySection from "@/components/explore-category-section";
import HeroSection from "@/components/hero-section";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 w-full">
      <HeroSection />
      <ExploreCategorySection />
    </main>
  );
};

export default LandingPage;
