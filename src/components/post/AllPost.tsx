import SinglePost from "@/components/post/item/SinglePost";
import { postData } from "@/data/PostData";
import NoPost from "@/components/post/NoPost";


const AllPost = () => {
  return (
      <div className="mt-2 md:mt-4 flex flex-col gap-4">
        {postData.map((item, i) => (
          <SinglePost key={i} item={item} />
          ))}
          <NoPost />
      </div>
  );
};

export default AllPost;
