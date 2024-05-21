import { ScrollArea } from "@/components/ui/scroll-area";
import AddPost from "@/components/post/AddPost";
import AllPost from "@/components/post/AllPost";
import usePostSocket from "@/services/socket/usePostSocket";

const PostArea = () => {
  usePostSocket();

  return (
    <section className="w-full h-full md:w-[95%] mx-auto">
      <ScrollArea className="h-full w-full">
        <AddPost />
        {/* <AddStory /> */}
        <AllPost />
      </ScrollArea>
    </section>
  );
};

export default PostArea;
