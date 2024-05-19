import CreatePostModel from "@/components/post/postForm/CreatePostModel";
import CallingModel from "@/components/models/CallingModel";
import MessangerModel from "@/components/models/MessangerModel";

const ModelProviders = () => {
  
  return (
    <>
      <CreatePostModel />
      <CallingModel />
      <MessangerModel/>
    </>
  );
};

export default ModelProviders;
