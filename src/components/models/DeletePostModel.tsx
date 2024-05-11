import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { deletePost } from "@/services/http";

interface Props {
  postId: string;
  setOpenModel: (value: boolean) => void;
}

const DeletePostModel: React.FC<Props> = ({ setOpenModel, postId }) => {
  const { toast } = useToast();

  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    // onSuccess: () => {
    //   const testData = queryClient.getQueryData(["posts"]) as MainPostQueryType;
    //   const filteredPages = testData.pages.map((item) => {
    //     const posts = item.posts.filter((item) => item._id !== postId);
    //     return {
    //       ...item,
    //       posts,
    //     };
    //   });
    //   queryClient.setQueryData(["posts"], { ...testData, pages: filteredPages });
    // },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast({
          variant: "destructive",
          title: err.response?.data.message || "Uh oh! Something went wrong.",
        });
      }
    },
  });

  const handleDelete = () => {
    mutation.mutate(postId)
    setOpenModel(false);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full cardBG flex items-center justify-center flex-col py-4 px-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-[16px] font-semibold">Are you absolutely sure?</h2>
        <p className="text-[14px] roboto">
          This will permanently delete your post and remove your data from our
          servers.
        </p>
      </div>
      <div className="mt-4 w-full flex gap-2 justify-end">
        <Button onClick={() => setOpenModel(false)}>Cancle</Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeletePostModel;
