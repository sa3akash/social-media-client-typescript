// import CreatePostModel from "@/components/post/postForm/CreatePostModel";
// import CallingModel from "@/components/models/CallingModel";
// import MessangerModel from "@/components/models/MessangerModel";
import { lazy, Suspense } from "react";

const MessangerModel = lazy(() => import("@/components/models/MessangerModel"));
const CallingModel = lazy(() => import("@/components/models/CallingModel"));
const CreatePostModel = lazy(
  () => import("@/components/post/postForm/CreatePostModel")
);

const ModelProviders = () => {
  return (
    <Suspense>
      <>
        <CreatePostModel />
        <CallingModel />
        <MessangerModel />
      </>
    </Suspense>
  );
};

export default ModelProviders;
