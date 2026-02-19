import { ClipboardCheck, LayoutDashboard, Wrench } from "lucide-react";
import Image from "next/image";
import React from "react";

const feautures = [
  {
    Icon: ClipboardCheck,
    title: "Inventory at your fingertips",
    description:
      "Filter by category, location, or status. Low-stock alerts catch problems before they slow you down. Every component visible. Every number true.",
    image: "/assets/pngs/team.png",
  },
  {
    Icon: Wrench,
    title: "Projects that stay organized",
    description:
      "Build with steps and images. Pin what matters most. Track status from start to finish. Your team always knows where things stand.",
    image: "/assets/pngs/programming-esp.png",
  },
  {
    Icon: LayoutDashboard,
    title: "Everything you need in one place",
    description:
      "Stock levels at a glance. Active projects tracked. Trends that show what's working. Recent activity keeps you in the loop.",
    image: "/assets/pngs/gathering-component.png",
  },
];

const Showcase = () => {
  return (
    <div id="features" className="bg-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col gap-10 md:gap-20 px-5 md:pl-10 py-12">
        {feautures.map((feature, index) => (
          <Feature key={feature.title} index={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

const Feature = ({
  Icon,
  title,
  description,
  image,
  index,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image: string;
  index: number;
}) => {
  return (
    <div
      className={`flex flex-col w-full ${index % 2 !== 0 ? "md:flex-row-reverse  md:justify-end" : "md:flex-row md:justify-stretch"} gap-10 items-center text-white`}
    >
      <div
        className={`max-w-sm ${index % 2 !== 0 ? "animate-in slide-in-from-start-20" : "animate-in slide-in-from-end-20"} duration-700`}
      >
        <Icon className="w-8 h-8 md:w-14 md:h-14" />
        <h3 className="md:text-4xl text-2xl mt-2 font-medium mb-3">{title}</h3>
        <p>{description}</p>
      </div>
      <Image
        src={image}
        width={300}
        height={300}
        priority
        className={
          index % 2 !== 0
            ? "w-full animate-in slide-in-from-end-20 duration-700 rounded-xl max-w-lg"
            : "w-full animate-in slide-in-from-start-20 duration-700"
        }
        alt="Feature image"
      />
    </div>
  );
};

export default Showcase;
