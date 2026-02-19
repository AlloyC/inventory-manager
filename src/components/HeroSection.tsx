"use client";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div id="home" className="bg-blue-500 fade-in animate-in duration-500 ">
      <Navbar />
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto py-10">
        <div className="lg:col-start-1 lg:pl-5 justify-self-center space-y-3 px-5 slide-in-from-bottom animate-in duration-700">
          <h1 className="text-2xl md:text-3xl max-w-lg lg:text-4xl font-semibold text-white mb-4 text-center lg:text-left lg:text-balance">
            Manage components and projects without friction
          </h1>
          <p className="md:text-lg mb-5 max-w-lg text-white text-center lg:text-left text-pretty md:text-wrap lg:text-balance ">
            Track every part you own. Watch quantities update automatically as
            you build. Keep your inventory honest and your projects moving.
          </p>
          <Button
            variant={"default"}
            onClick={() => router.push("/auth/sign-up")}
            className="relative left-1/2 -translate-x-1/2 bg-white text-black lg:left-0 lg:translate-x-0 w-fit"
          >
            Get Started
          </Button>
        </div>
        <div className="lg:col-start-2 w-full justify-self-start px-5 lg:px-0 lg:pr-10 slide-in-from-top animate-in duration-700">
          <Image
            src="/assets/pngs/workspace.png"
            alt="Hero image"
            width={350}
            height={200}
            priority={true}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
