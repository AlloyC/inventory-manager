"use client";
import { Button } from "@/components/ui/button";
import StickyHeader from "./StickyHeader";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSection = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div id="theme">
      <StickyHeader title="Theme" />
      <div className="px-5 mt-2 border-b">
        <label htmlFor="theme-selection">
          <div className="flex flex-col md:flex-row justify-between p-5 gap-8">
            <div className="border w-full rounded-xl flex flex-col justify-between">
              {/* <Image src={""} alt="" /> */}
              <div className="">
                <Image
                  src={"/assets/pngs/light.png"}
                  alt="Light theme preview"
                  width={400}
                  height={300}
                  className="object-cover rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="border-t p-3 flex items-center gap-3">
                <Input
                  type="radio"
                  value="light"
                  onChange={() => setTheme("light")}
                  checked={theme === "light"}
                  name="theme-selection"
                  className="w-5 h-5"
                />
                <span>Light mode</span>
              </div>
            </div>
            <div className="border w-full rounded-xl flex flex-col justify-between">
              {/* <Image src={""} alt="" /> */}
              <div className="">
                <Image
                  src={"/assets/pngs/dark.png"}
                  alt="Dark theme preview"
                  width={400}
                  height={300}
                  className="object-cover rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="border-t p-3 flex items-center gap-3">
                <Input
                  type="radio"
                  value="dark"
                  onChange={() => setTheme("dark")}
                  checked={theme === "dark"}
                  name="theme-selection"
                  className="w-5 h-5"
                />
                <span>Dark mode</span>
              </div>
            </div>
            <div className="border w-full rounded-xl flex flex-col justify-between">
              {/* <Image src={""} alt="" /> */}
              <div className="">
                <Image
                  src={"/assets/pngs/system.png"}
                  alt="System theme preview"
                  width={400}
                  height={300}
                  className="object-cover rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <div className="border-t p-3 flex items-center gap-3">
                <Input
                  type="radio"
                  value="system"
                  onChange={() => setTheme("system")}
                  checked={theme === "system"}
                  name="theme-selection"
                  className="w-5 h-5"
                />
                <span>System preference</span>
              </div>
            </div>
          </div>
        </label>
      </div>
      {/* <div className="border-b flex flex-col items-start md:flex-row gap-3 md:items-center justify-between bg-white dark:bg-sidebar p-5 text-lg font-medium">
        <h3>Accent Colors</h3>
        <div className="flex gap-2 w-fit">
          <Button
            type="button"
            size={"icon"}
            className="border-2 border-[#FF5733] hover:bg-transparent hover:border-[#FF5733]/50  p-1 bg-white w-6 h-6 rounded-full "
          >
            <span className="bg-[#FF5733] w-3 h-3 rounded-full "></span>
          </Button>
          <Button
            type="button"
            size={"icon"}
            className="border-2 p-1 bg-white w-6 h-6 hover:bg-transparent hover:border-[#33FF57]/50  rounded-full "
          >
            <span className="bg-[#33FF57] w-3 h-3 rounded-full "></span>
          </Button>
          <Button
            type="button"
            size={"icon"}
            className="border-2 p-1 bg-white w-6 h-6 hover:bg-transparent hover:border-[#3357FF]/50  rounded-full"
          >
            <span className="bg-[#3357FF] w-3 h-3 rounded-full "></span>
          </Button>
          <Button
            type="button"
            size={"icon"}
            className="border-2 p-1 bg-white w-6 h-6 hover:bg-transparent hover:border-[#F333FF]/50  rounded-full "
          >
            <span className="bg-[#F333FF] w-3 h-3 rounded-full "></span>
          </Button>
          <Button
            type="button"
            size={"icon"}
            className="border-2 p-1 bg-white w-6 h-6 hover:bg-transparent hover:border-[#33FFF5]/50  rounded-full"
          >
            <span className="bg-[#33FFF5] w-3 h-3 rounded-full "></span>
          </Button>
          <Button
            type="button"
            size={"icon"}
            className="border-2 p-1 bg-white w-6 h-6 hover:bg-transparent hover:border-[#F5FF33]/50 rounded-full"
          >
            <span className="bg-[#F5FF33] w-3 h-3 rounded-full "></span>
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default ThemeSection;
