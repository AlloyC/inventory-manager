"use client";
import { useRouter } from "next/navigation";
import Logo from "../../public/assets/svgs/Logo";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="bg-white dark:bg-gray-900">
      <header className="lg:col-span-2 flex items-center justify-between w-full py-4 px-6 shadow-md border-b max-w-6xl mx-auto">
        <div className="flex items-center gap-5">
          <Logo className="w-32" />
          <nav className="hidden md:block">
            <ul className="flex items-center gap-4">
              {navLinks.map((link) => (
                <NavLink name={link} key={link} />
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            onClick={() => router.push("/auth/sign-up")}
            className="hidden md:block"
          >
            Sign up
          </Button>
          <Button onClick={() => router.push("/auth/login")}>Log in</Button>
        </div>
      </header>
    </div>
  );
};

const navLinks = ["Home", "Features", "How it works"];

const NavLink = ({ name }: { name: string }) => {
  return (
    <li>
      <Link
        href={`#${name.toLowerCase().replace(/\s+/g, "-")}`}
        className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
      >
        {name}
      </Link>
    </li>
  );
};

export default Navbar;
