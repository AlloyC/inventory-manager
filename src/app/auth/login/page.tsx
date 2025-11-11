import SubmitBtn from "@/app/components/submitBtn";
import Input from "../../components/Input";

function login() {
  return (
    <div className="w-96 h-96 shadow-2xl p-5 flex justify-center items-end rounded-2xl bg-white/40 backdrop-blur-md">
      <form className="w-full h-10/12 rounded-2xl flex flex-col gap-7">
        <Input type="text" label="Username" />
        <Input type="password" label="Password" />
        <div className="self-end italic text-sm cursor-pointer">
          forgot password?
        </div>
        <SubmitBtn text="Login" />
        <p className="text-center text-sm">Don't have an account? <span className="text-blue-600 cursor-pointer">Sign up</span></p>
      </form>
    </div>
  );
}

export default login;
