import SubmitBtn from "@/app/components/submitBtn";
import Input from "../../components/Input";

function signUp() {
  return (
    <div className="w-96 min-h-96 shadow-2xl p-5 flex justify-center items-end rounded-2xl bg-white/40 backdrop-blur-md">
      <form className="w-full h-10/12 rounded-2xl flex flex-col gap-7">
        <Input type="text" label="Username" />
        <Input type="email" label="Email" />
        <Input type="password" label="Password" />
        <Input type="password" label="Confirm Password" />
        <SubmitBtn text="Sign Up" />
        <p className="text-center text-sm">Already have an account? <span className="text-blue-600 cursor-pointer">log in</span></p>
      </form>
    </div>
  );
}

export default signUp;
