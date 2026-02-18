import Image from "next/image";
import React from "react";

const steps = [
  {
    title: "Add your components once",
    description: "Name them. Locate them. Qauntity set.",
    image: "/assets/pngs/adding-component.png",
  },
  {
    title: "Create projects with purpose",
    description: "Define steps. Attach images. List what you need",
    image: "/assets/pngs/adding-project.png",
  },
  {
    title: "Use components as you build",
    description: "Pull from inventory. Watch qauntities drop in real-time.",
    image: "/assets/pngs/workspace-2.png",
  },
  {
    title: "Watch your progress unfold",
    description: "See what's left. Know what's next. Stay ahead.",
    image: "/assets/pngs/project-building.png",
  },
];

const ProcessSection = () => {
  return (
    <div id="how-it-works" className="bg-white">
      <div className="max-w-6xl mx-auto text-black flex flex-col justify-center items-center py-12 px-10">
        <span className="font-medium text-center mb-2">Process</span>
        <h2 className="text-4xl font-medium mb-1">Four steps to control</h2>
        <p>Start with what you have. Build what matters. Track it all.</p>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-5 mt-6">
          {steps.map((step, index) => (
            <Step key={index} index={index + 1} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Step = ({
  title,
  description,
  image,
  index,
}: {
  title: string;
  description: string;
  image: string;
  index: number;
}) => {
  return (
    <div className="w-full min-h-56 pt-5 flex flex-col gap-2 rounded-lg border border-gray-400/20">
      <span className="px-3 text-gray-800">Step {index}</span>
      <h3 className="px-3 font-medium text-xl">{title}</h3>
      <p className="px-3 mb-3">{description}</p>
      <Image
        src={image}
        width={50}
        height={40}
        className="w-full h-auto mt-auto self-end"
        alt="Process step image"
      />
    </div>
  );
};

export default ProcessSection;
