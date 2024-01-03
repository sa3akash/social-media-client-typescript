import { ScrollArea } from "@/components/ui/scroll-area";
import AddPost from "@/components/post/AddPost";
import AddStory from "@/components/post/AddStory";
import AllPost from "@/components/post/AllPost";
import { useEffect } from "react";
import { PostSocket } from "@/services/socket/postSocket";

const PostArea = () => {
  useEffect(() => {
    PostSocket.addPostSocket();
  }, []);
  return (
    <div className="w-full h-full md:w-[95%] mx-auto">
      <ScrollArea className="h-full w-full">
        <AddPost />
        <AddStory />
        <AllPost />
      </ScrollArea>
    </div>
  );
};

export default PostArea;
