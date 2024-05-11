import { ScrollArea } from "@/components/ui/scroll-area";
import AddPost from "@/components/post/AddPost";
import AllPost from "@/components/post/AllPost";
import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { MainPostQueryType } from "@/interfaces/reactQueryExtendedType";

const PostArea = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket?.on("delete-post", (postId: string) => {
      const testData = queryClient.getQueryData(["posts"]) as MainPostQueryType;
      const filteredPages = testData.pages.map((item) => {
        const posts = item.posts.filter((item) => item._id !== postId);
        return {
          ...item,
          posts,
        };
      });
      queryClient.setQueryData(["posts"], {
        ...testData,
        pages: filteredPages,
      });
    });
    return () => {
      socket?.off("delete-post");
    };
  }, [queryClient, socket]);

  return (
    <div className="w-full h-full md:w-[95%] mx-auto">
      <ScrollArea className="h-full w-full">
        <AddPost />
        {/* <AddStory /> */}
        <AllPost />
      </ScrollArea>
    </div>
  );
};

export default PostArea;
