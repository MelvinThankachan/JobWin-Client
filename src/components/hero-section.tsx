import { cn } from "@/lib/utils";
import { Muted, P } from "./ui/typography";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPin, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="section flex flex-col gap-5">
      <div className="">
        <h1 className="hero-text">Discover </h1>
        <h1 className="hero-text">more than </h1>
        <h1 className="hero-text text-primary">5000+ Jobs </h1>
      </div>
      <Muted className="text-2xl max-w-2xl">
        Great platform for the job seekers that searching for new career hights
        and passionate about startups.
      </Muted>
      <div className="bg-white flex flex-col md:flex-row justify-between gap-5 px-10 py-5 shadow-md max-w-6xl">
        <div className="flex w-full gap-5 items-center justify-center">
          <Search size={30} />
          <Input placeholder="Job title or keyword" />
        </div>
        <div className="flex w-full gap-5 items-center justify-center">
          <MapPin size={30} />
          <Input placeholder="Location" />
        </div>
        <Button size="lg" className="w-full md:w-auto">Search my job</Button>
      </div>
    </section>
  );
};

export default HeroSection;
