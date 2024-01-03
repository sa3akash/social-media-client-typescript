import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import PostInput from "@/components/post/postForm/PostInput";
import { Dispatch, FC, SetStateAction } from "react";
import CreateImageShow from "@/components/post/postForm/CreateImageShow";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { updatePostItem } from "@/store/reducers/SinglePostReducer";

interface Props {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const CreateInput: FC<Props> = ({ files, setFiles }) => {
  const { post, bgColor, gifUrl } = useSelector(
    (state: RootState) => state.SinglePost
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="mt-4 flex items-center justify-center flex-col">
      {!files.length && !gifUrl && (
        <PostInput
          post={post as string}
          bgColor={bgColor as string}
          className="h-![60px]"
        />
      )}
      {gifUrl && (
        <>
          <PostInput
            post={post as string}
            bgColor={""}
            className2="text-[16px]"
          />
          <div className="w-full max-h-[300px] h-full object-cover relative group flex items-center justify-center">
            <img src={gifUrl} className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 w-full ml-auto h-14 hidden group-hover:block p-2">
              <Button onClick={() => dispatch(updatePostItem({ gifUrl: "" }))}>
                <Trash className="w-5" />
              </Button>
            </div>
          </div>
        </>
      )}
      {files.length > 0 && !gifUrl && (
        <>
          <PostInput
            post={post as string}
            bgColor={""}
            className2="text-[16px]"
          />
          <CreateImageShow images={files} setFiles={setFiles} />
        </>
      )}
    </div>
  );
};

export default CreateInput;
