import React from "react";

const Trust = () => {
  return (
    <div className="bg-white">
      <div className=" py-12 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-5 mx-auto px-4 text-gray-800">
        <div className="px-4 slide-in-from-start animate-in duration-700">
          <span className="text-blue-500 font-bold">Trusted</span>
          <h2 className="text-3xl font-bold mb-4">
            Built for engineers who know what matters
          </h2>
          <p>
            Inventra powers inventory and project tracking for hardware teams
            across the world. Simple, reliable, built to last. Our users range
            from individual hobbyists to engineering teams at leading hardware
            companies.
          </p>
        </div>
        <div className="justify-self-center flex flex-col md:flex-row gap-6 lg:flex-col border slide-in-from-end animate-in duration-700">
          <ValueComponent
            value="1000+"
            description="Hardware projects tracked"
          />
          <ValueComponent
            value="1000+"
            description="Hardware components tracked"
          />
        </div>
      </div>
    </div>
  );
};

const ValueComponent = ({
  value,
  description,
}: {
  value: string;
  description: string;
}) => {
  return (
    <div className="border border-gray-300 flex flex-col items-center justify-center text-center p-6 rounded-lg mb-4 w-72 mx-auto">
      <h3 className="text-3xl font-semibold">{value}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Trust;
