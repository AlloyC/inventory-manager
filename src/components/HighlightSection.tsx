import {
  CalendarSync,
  CloudSync,
  IdCardLanyard,
  LocationEdit,
} from "lucide-react";
import Image from "next/image";

const highlights = [
  {
    Icon: CloudSync,
    title: "Auto quantity sync",
    description:
      "Components update instantly when used in projects. No guessing. Just accurate inventory.",
  },
  {
    Icon: IdCardLanyard,
    title: "Stock status badges",
    description:
      "See at a glance what's in stock, running low, or gone. Make decisions faster.",
  },
  {
    Icon: LocationEdit,
    title: "Smart location tracking",
    description:
      "Organize by category, location, or custom tags. Find what you need in seconds.",
  },
  {
    Icon: CalendarSync,
    title: "Real-time updates",
    description:
      "Changes sync across your team instantly. Everyone sees the same truth.",
  },
];

const HighlightSection = () => {
  return (
    <div className="bg-blue-200">
      <div className="mx-auto max-w-6xl py-12 px-10">
        <h2 className="text-black mb-6 font-medium text-xl">Key Features</h2>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 slide-in-from-left-40 animate-in duration-700">
            {highlights.map((highlight) => (
              <Highlight key={highlight.title} {...highlight} />
            ))}
          </div>
          <Image
            src={"/assets/pngs/adding-component.png"}
            alt=""
            width={350}
            height={350}
            priority={true}
            className="rounded-lg slide-in-from-bottom-40 animate-in duration-700 shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const Highlight = ({
  Icon,
  title,
  description,
}: {
  Icon: React.ComponentType;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex fade-in animate-in flex-col gap-2 w-full max-w-md bg-blue-200/50 shadow-lg border border-gray-400/10 rounded-lg backdrop-blur-3xl p-3 text-black">
      <Icon />
      <h3 className="font-medium">{title}</h3>
      <p className="text-balance">{description}</p>
    </div>
  );
};

export default HighlightSection;
