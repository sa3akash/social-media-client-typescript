import { RootState } from "@/store";
import { useSelector } from "react-redux";
import PostInput from "@/components/post/postForm/PostInput";

const CreateInput = () => {
  const { post, bgColor } = useSelector((state: RootState) => state.SinglePost);
 
  // handle functions

  return (
    <div className="mt-4 flex items-center justify-center">
      <PostInput post={post as string} bgColor={bgColor as string} />
    </div>
  );
};

export default CreateInput;
