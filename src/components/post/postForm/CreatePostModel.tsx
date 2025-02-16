import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModel } from "@/store/reducers/ModelReducer";
import { Separator } from "@/components/ui/separator";
import CreatePostHeader from "@/components/post/postForm/CreatePostHeader";
import { IUserDoc } from "@/interfaces/auth.interface";
import CreateInput from "@/components/post/postForm/CreateInput";
import SelectBgAndEmoji from "@/components/post/postForm/SelectBgAndEmoji";
import AddToUserPost from "@/components/post/postForm/AddToUserPost";
import { IFeelings, IPrivacy } from "@/interfaces/post.interface";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { clearPost } from "@/store/reducers/SinglePostReducer";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/store/rtk/post/getPostSlice";

const CreatePostModel = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { type, isOpen } = useSelector((store: RootState) => store.model);
  const {
    _id,
    privacy,
    feelings,
    post,
    gifUrl,
    bgColor,
  } = useSelector((store: RootState) => store.SinglePost);
  const dispatch: AppDispatch = useDispatch();
  const { toast } = useToast();


  const [updatePost, { isLoading: loadingUpdate, data: updatedPost }] =
    useUpdatePostMutation();
  const [createPost, { isLoading: loadingCreate, data: createPostRes }] =
    useCreatePostMutation();

  const createPostCall = () => {
    if (!post)
      return toast({
        title: "Post title is required.",
        variant: "destructive",
      });

    const postData = {
      privacy: privacy,
      post: post,
      feelings: feelings,
      gifUrl: gifUrl,
      bgColor: bgColor,
      files: []
    }

    if (type === "createPost") {
      createPost(postData);
    } else {
      updatePost({
        id: _id!,
        post: postData,
      });
    }
  };

  const loading = loadingUpdate || loadingCreate;

  useEffect(() => {
    if (updatedPost) {
      toast({
        title: updatedPost.message,
      });
      dispatch(clearPost());
      dispatch(closeModel());
    }

    if (createPostRes) {
      toast({
        title: createPostRes.message,
      });
      dispatch(clearPost());
      dispatch(closeModel());
    }
  }, [updatedPost, dispatch, toast, createPostRes]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        dispatch(closeModel());
        dispatch(clearPost());
      }}
    >
      <DialogContent className="max-w-[500px] p-0 cardBG">
        <DialogHeader>
          <DialogTitle className="text-center mt-4">
            {type === "createPost" ? "Create post" : "Update Post"}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="relative">
          <CreatePostHeader
            user={user as IUserDoc}
            privacy={privacy as IPrivacy}
            feelings={feelings as IFeelings}
          />
          <CreateInput  />
          <SelectBgAndEmoji />
          <AddToUserPost />
        </div>
        <DialogFooter className="px-4 pb-4">
          <Button
            type="submit"
            className="w-full disabled:cursor-not-allowed"
            onClick={createPostCall}
            disabled={loading}
          >
            {loading ? (
              <span className="flex text-center gap-2">
                {type === "createPost" ? "Post..." : "Updating..."}
                <Loader2 className="animate-spin" size={20} />
              </span>
            ) : type === "createPost" ? (
              "Post"
            ) : (
              "Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModel;
