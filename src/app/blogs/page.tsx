import { PostCard } from "@/components/post_card";
// a waterfall with images
const BlogsHome = () => {
  const mockPosts = [
    {
      img: "1",
      title: "Blog1",
      brief: "test for blog 1",
      tag: "react",
    },
    {
      img: "2",
      title: "Blog2",
      brief: "test for blog 2",
      tag: "react",
    },
    {
      title: "Blog3",
      brief: "test for blog 3",
      tag: "react",
    },
  ];
  return (
    <div className="m-12 columns-1 gap-4 space-y-4 md:columns-2 lg:columns-4">
      {mockPosts.map((post) => {
        return <PostCard key={post.title} post={post} />;
      })}
    </div>
  );
};

export default BlogsHome;
