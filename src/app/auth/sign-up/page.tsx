import Logo from "../../../../public/assets/svgs/Logo";
import SignUpForm from "./signUpForm";

function signUp() {
  return (
    <div className="w-96 shadow-2xl p-5 flex flex-col justify-center rounded-2xl bg-white/40 backdrop-blur-md">
      <div className="self-center pb-7 pt-3">
        <Logo mode="dark" className="w-40" />
      </div>
      <div className="pb-5">
        <h3 className="text-lg text-center font-medium text-blue-800">
          Create your account
        </h3>
        <p className=" text-center italic text-blue-800">
          Start managing your inventory today.
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}

export default signUp;
