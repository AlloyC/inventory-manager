const StickyHeader = ({ title }: { title: string }) => {
  return (
    <h2 className="top-0 sticky border-b dark:bg-sidebar bg-white p-3 text-xl font-medium">
      {title}
    </h2>
  );
};

export default StickyHeader;
