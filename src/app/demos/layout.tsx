const DemosLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <aside>Side bar</aside>
      {children}
    </div>
  );
};

export default DemosLayout;
