import React from "react";

const PageTitle = ({ title }: { title: string }) => {
  return <h2 className="text-xl capitalize font-medium">{title}</h2>;
};

export default PageTitle;
