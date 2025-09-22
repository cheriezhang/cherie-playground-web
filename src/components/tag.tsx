interface ITag {
  className?: string;
  children: React.ReactNode;
}

export const Tag = ({ children }: ITag) => {
  return (
    <span className="leading:none w-fit rounded border border-accent px-2 text-label text-accent">
      {children}
    </span>
  );
};
