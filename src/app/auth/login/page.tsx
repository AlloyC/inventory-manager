import Logo from "../../../../public/assets/svgs/Logo";
import LoginForm from "./loginForm";

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
        <p className=" text-center italic text-blue-800">
          Log in to your workspace
        </p>
      </div>
      <LoginForm />
    </div>
  );
}

export default login;
