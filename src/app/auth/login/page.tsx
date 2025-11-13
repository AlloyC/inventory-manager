import SubmitBtn from "@/app/components/submitBtn";
import Input from "../../components/Input";
import Link from "next/link";
import Logo from "../../../../public/assets/svgs/Logo";

function login() {
  return (
    <div className="w-96 shadow-2xl p-5 flex flex-col justify-center rounded-2xl bg-white/40 backdrop-blur-md">
      <div className="self-center pb-7 pt-3">
        <Logo mode="dark" className="w-40" />
      </div>
      <div className="pb-5">
        <h3 className="text-lg text-center italic font-medium text-blue-800">
          Welcome back
        </h3>
        <p className=" text-center italic text-blue-800">Log in to your workspace</p>
      </div>
      <form className="w-full h-10/12 rounded-2xl flex flex-col gap-7">
        <Input type="text" label="Username" />
        <Input type="password" label="Password" />
        <div className="self-end italic text-sm cursor-pointer text-[#310076]/90">
          forgot password?
        </div>
        <SubmitBtn text="Login" />
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href={"sign-up"}>
            <span className="text-blue-600 cursor-pointer">Sign up</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default login;
