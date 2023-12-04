import { ScrollArea } from "@/components/ui/scroll-area";
import AddPost from "@/components/post/AddPost";
import AddStory from "@/components/post/AddStory";
import AllPost from "@/components/post/AllPost";

const PostArea = () => {
  return (
    <div className="w-full md:max-w-[640px] md:w-[95%] mx-auto h-full">
      <ScrollArea className="h-full w-full">
        <AddPost />
        <AddStory />
        <AllPost />
      </ScrollArea>
    </div>
  );
};

export default PostArea;
