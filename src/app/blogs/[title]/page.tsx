const BlogPage = async ({ params }: { params: any }) => {
  const { title } = await params;
  return <div className="p-4">{title}</div>;
};

export default BlogPage;
