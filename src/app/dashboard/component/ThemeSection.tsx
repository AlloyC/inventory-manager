import { Button } from "@/components/ui/button";
import StickyHeader from "./StickyHeader";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const ThemeSection = () => {
  return (
    <div id="theme">
      <StickyHeader title="Theme" />
      <div>
        <label htmlFor="theme-selection">
          <div>
            {/* <Image src={""} alt="" /> */}
            <Input type="radio" value="light" name="theme-selection" />
            Light mode
          </div>
          <div>
            {/* <Image src={""} alt="" /> */}
            <Input type="radio" value="dark" name="theme-selection" />
            Dark mode
          </div>
          <div>
            {/* <Image src={""} alt="" /> */}
            <Input type="radio" value="system" name="theme-selection" />
            System prefrence
          </div>
        </label>
      </div>
      <div>
        <h3>Accent Colors</h3>
        <div>
          <Button
            type="button"
            className="bg-[#FF5733] w-8 h-8 rounded-full"
          ></Button>
          <Button
            type="button"
            className="bg-[#33FF57] w-8 h-8 rounded-full"
          ></Button>
          <Button
            type="button"
            className="bg-[#3357FF] w-8 h-8 rounded-full"
          ></Button>
          <Button
            type="button"
            className="bg-[#F333FF] w-8 h-8 rounded-full"
          ></Button>
          <Button
            type="button"
            className="bg-[#33FFF5] w-8 h-8 rounded-full"
          ></Button>
          <Button
            type="button"
            className="bg-[#F5FF33] w-8 h-8 rounded-full"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default ThemeSection;
