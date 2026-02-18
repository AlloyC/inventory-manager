import React from "react";
import Logo from "../../public/assets/svgs/Logo";

const Footer = () => {
  return (
    <div className="bg-blue-600">
      <div className="max-w-6xl mx-auto px-10 border-t text-white py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-3 justify-center md:items-baseline md:justify-between px-4">
          <Logo className="hidden md:block md:h-7" />
          <p className="text-end">© 2024 Inventra. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
