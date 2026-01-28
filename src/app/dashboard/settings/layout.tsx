import SubNav from "./SubNav";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-cols-[auto_1fr] min-h-full -ml-4 md:-ml-10 -my-4">
      <div className=" h-full border-r">
        <SubNav />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default layout;
