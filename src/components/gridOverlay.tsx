import React from "react";

const GridOverlay = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      <div className="h-full w-full grid grid-cols-12 max-w-7xl gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="border-l border-red-300 opacity-50"></div>
        ))}
      </div>
    </div>
  );
};

export default GridOverlay;
