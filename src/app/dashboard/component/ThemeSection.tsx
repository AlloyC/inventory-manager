import { Button } from "@/components/ui/button";
import StickyHeader from "./StickyHeader";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const ThemeSection = () => {
  return (
    <div id="theme">
      <StickyHeader title="Theme" />
      <div className="px-5 mt-2">
        <label htmlFor="theme-selection">
          <div className="flex justify-between p-5 gap-8">
            <div className="border w-full rounded-xl flex flex-col justify-between">
              {/* <Image src={""} alt="" /> */}
              <div className="h-56"></div>
              <div className="border-t p-3 flex items-center gap-3">
                <Input
                  type="radio"
                  value="light"
                  name="theme-selection"
                  className="w-5 h-5"
                />
                <span>Light mode</span>
              </div>
            </div>
            <div className="border w-full rounded-xl flex flex-col justify-between">
              {/* <Image src={""} alt="" /> */}
              <div className="h-56"></div>
              <div className="border-t p-3 flex items-center gap-3">
                <Input
                  type="radio"
                  value="dark"
                  name="theme-selection"
                  className="w-5 h-5"
                />
                <span>Dark mode</span>
              </div>
            </div>
            <div className="border w-full rounded-xl flex flex-col justify-between">
              {/* <Image src={""} alt="" /> */}
              <div className="h-56"></div>
              <div className="border-t p-3 flex items-center gap-3">
                <Input
                  type="radio"
                  value="system"
                  name="theme-selection"
                  className="w-5 h-5"
                />
                <span>System prefrence</span>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className="border-b flex items-center justify-between bg-white p-5 text-lg font-medium">
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
      </div>
    </div>
  );
};

export default ThemeSection;
