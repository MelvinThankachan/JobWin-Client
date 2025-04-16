import { ArrowRight } from "lucide-react";
import { H3 } from "./ui/typography";
import { Link } from "react-router-dom";

type CategoryCardProps = {
  icon: React.ReactNode;
  title: string;
  jobsAvailable: number;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  jobsAvailable,
}) => {
  return (
    <div className="flex sm:flex-col gap-10 p-10 group hover:bg-primary border cursor-pointer">
      <div className="text-primary group-hover:text-white">{icon}</div>
      <div className="flex flex-col gap-5 group-hover:text-white">
        <H3 className="truncate">{title}</H3>
        <div className="flex gap-2 items-center">
          <span className="text-xl">{jobsAvailable} jobs available</span>
          <Link to="#">
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
