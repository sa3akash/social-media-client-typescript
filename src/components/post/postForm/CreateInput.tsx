import { RootState } from "@/store";
import { useSelector } from "react-redux";
import PostInput from "@/components/post/postForm/PostInput";
import { Dispatch, FC, SetStateAction } from "react";
import CreateImageShow from "./CreateImageShow";

interface Props {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

const CreateInput: FC<Props> = ({ files,setFiles }) => {
  const { post, bgColor } = useSelector((state: RootState) => state.SinglePost);

  // handle functions

  return (
    <div className="mt-4 flex items-center justify-center flex-col">
      {!files.length && (
        <PostInput
          post={post as string}
          bgColor={bgColor as string}
          className="h-![60px]"
        />
      )}
      {files.length > 0 && (
        <>
          <PostInput
            post={post as string}
            bgColor={""}
            className2="text-[16px]"
          />
          <CreateImageShow images={files} setFiles={setFiles}/>
        </>
      )}
    </div>
  );
};

export default CreateInput;
