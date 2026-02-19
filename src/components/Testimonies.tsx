"use client";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Inventra transformed how we manage our hardware projects. It's a game-changer for our team.",
    name: "Alex Johnson",
    title: "Hardware Engineer at TechCorp",
    image: "/assets/pngs/profile-one.png",
  },
  {
    quote:
      "Finally, a tool that understands the needs of hardware teams. Inventra keeps us organized and efficient.",
    name: "Emily Davis",
    title: "Project Manager at Innovatech",
    image: "/assets/pngs/profile-two.png",
  },
  {
    quote:
      "Inventra's inventory tracking is a lifesaver. No more lost components or last-minute scrambles.",
    name: "Michael Lee",
    title: "Hobbyist Maker",
    image: "/assets/pngs/pofile-three.png",
  },
];

const Testimonies = () => {
  return (
    <div className="bg-white">
      <div className="max-w-6xl text-black  bg-white mx-auto py-12 px-4">
        <h2 className="md:ml-6 text-center md:text-left text-3xl md:text-4xl font-semibold mb-3">
          From builders
        </h2>
        <p className="md:ml-6 text-center md:text-left text-gray-700 mb-8">
          Hear from engineers and makers who trust Inventra
        </p>
        <div className="grid gap-8 md:grid-cols-3 px-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Testimonial = ({
  quote,
  name,
  title,
  image,
}: {
  quote: string;
  name: string;
  title: string;
  image: string;
}) => {
  return (
    <div className="p-4 border animate-in fade-in-60 duration-500 flex flex-col gap-2 border-gray-200 rounded-lg shadow-sm">
      <div className="bg-gray-200 rounded-full w-16 h-16 overflow-hidden">
        <Image
          src={image}
          alt={name}
          priority
          width={20}
          height={20}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-lg italic text-balance lg:text-pretty">"{quote}"</p>
      <div className="mt-auto lg:mt-2">
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
};

export default Testimonies;
