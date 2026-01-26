const StickyHeader = ({ title }: { title: string }) => {
  return <h2 className="top-0 sticky border-b bg-white">{title}</h2>;
};

export default StickyHeader;
