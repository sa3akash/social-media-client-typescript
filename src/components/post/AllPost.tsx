import SinglePost from "@/components/post/item/SinglePost";
import { postData } from "@/data/PostData";
import NoPost from "@/components/post/NoPost";
import { IPostDoc } from "@/interfaces/post.interface";


const AllPost = () => {
  return (
      <div className="mt-2 md:mt-4 flex flex-col gap-4">
        {postData.map((item:IPostDoc, i:number) => (
          <SinglePost key={i} item={item} />
          ))}
          <NoPost />
      </div>
  );
};

export default AllPost;
