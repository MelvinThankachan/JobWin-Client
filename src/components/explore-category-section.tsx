import {
  BriefcaseBusiness,
  ChartColumnStacked,
  Cog,
  Cpu,
  Megaphone,
  PencilRuler,
  Users,
  Wallet,
} from "lucide-react";
import CategoryCard from "./category-card";
import SectionHeading from "./section-title";

const ExploreCategorySection = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="section flex flex-col gap-10">
        <SectionHeading
          titleNormal="Explore by"
          titleInColor="category"
          buttonText="See all jobs"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 px-2">
          <CategoryCard
            icon={<PencilRuler size={50} />}
            title="Design"
            jobsAvailable={235}
          />
          <CategoryCard
            icon={<ChartColumnStacked size={50} />}
            title="Sales"
            jobsAvailable={756}
          />
          <CategoryCard
            icon={<Megaphone size={50} />}
            title="Marketing"
            jobsAvailable={140}
          />
          <CategoryCard
            icon={<Wallet size={50} />}
            title="Finance"
            jobsAvailable={325}
          />
          <CategoryCard
            icon={<Cpu size={50} />}
            title="Tech"
            jobsAvailable={436}
          />
          <CategoryCard
            icon={<Cog size={50} />}
            title="Engineering"
            jobsAvailable={542}
          />
          <CategoryCard
            icon={<BriefcaseBusiness size={50} />}
            title="Business"
            jobsAvailable={542}
          />
          <CategoryCard
            icon={<Users size={50} />}
            title="Human Resources"
            jobsAvailable={346}
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreCategorySection;
