const BlogPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      <div className="flex-1">{children}</div>
      <aside className="hidden w-64 border-l border-gray-100 bg-white md:block">
        Menu
      </aside>
    </div>
  );
};

export default BlogPageLayout;
