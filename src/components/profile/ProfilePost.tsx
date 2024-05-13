import AddPost from "@/components/post/AddPost";
// import AddStory from "@/components/post/AddStory";
import AllPost from "@/components/post/AllPost";

const ProfilePost = () => {
  return (
    <div className="w-full h-full mx-auto">
        <AddPost />
        {/* <AddStory /> */}
        <AllPost />
    </div>
  );
};

export default ProfilePost;