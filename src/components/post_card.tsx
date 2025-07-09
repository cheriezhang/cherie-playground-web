import { CardMedia } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";

type TPost = {
  img?: string;
  title: string;
  brief: string;
  tag: string;
};
export const PostCard = ({ post }: { post: TPost }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="194"
        image={`/static/blog/${post.img}.jpg`}
        alt="1"
      />
      <CardContent>
        <h3>
          <Link href={`/blogs/${post.title}`}>{post.title}</Link>
        </h3>
        <p>{post.brief}</p>
        <p>{post.tag}</p>
      </CardContent>
    </Card>
    // <div className="flex flex-col break-inside-avoid rounded-sm bg-green-200 min-w-64" key={post.title}>

    // </div>
  );
};
