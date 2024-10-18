import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useDeletePostMutation } from "@/store/rtk/post/getPostSlice";

interface Props {
  postId: string;
  setOpenModel: (value: boolean) => void;
}

const DeletePostModel: React.FC<Props> = ({ setOpenModel, postId }) => {
  const { toast } = useToast();

  const [deletePost, { isLoading, data }] = useDeletePostMutation();

  const handleDelete = () => {
    deletePost(postId);
  };

  useEffect(() => {
    if (data) {
      toast({
        title: "Post deleted successfull.",
      });
      setOpenModel(false);
    }
  }, [data, setOpenModel, toast]);

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
        <Button onClick={() => setOpenModel(false)} disabled={isLoading}>
          Cancle
        </Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
          className="disabled:cursor-not-allowed"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeletePostModel;
