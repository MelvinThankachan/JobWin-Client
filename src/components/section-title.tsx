import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

type SectionTitleProps = {
  titleNormal: string;
  titleInColor: string;
  buttonText?: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({
  titleNormal,
  titleInColor,
  buttonText,
}) => {
  return (
    <div className="flex justify-between items-center py-5">
      <h1 className="text-6xl font-semibold">
        {titleNormal} <span className="text-primary">{titleInColor}</span>
      </h1>
      <div className="flex items-center">
        <Button variant="link" className="text-xl">
          {buttonText}
        </Button>
        <ArrowRight size={24} className="text-primary"/>
      </div>
    </div>
  );
};

export default SectionTitle;
