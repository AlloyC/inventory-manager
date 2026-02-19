import Logo from "../../public/assets/svgs/Logo";

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white text-black z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-gray-700">Welcome to Inventory Manager</p>
        {/* <Logo className="w-32 animate-pulse" mode="light" /> */}
      </div>
    </div>
  );
};

export default Preloader;
