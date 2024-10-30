import CardAreaProfile from "@/components/profile/CardAreaProfile";
import ProfileBar from "@/components/profile/ProfileBar";
import ProfilePost from "@/components/profile/ProfilePost";
import ProfileSkeleton from "@/components/profile/skeleton/ProfileSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSocket } from "@/hooks/useSocket";
import { IFullUserDoc } from "@/interfaces/auth.interface";
import { IPostDoc } from "@/interfaces/post.interface";
import { AppDispatch } from "@/store";
import { useGetUserQuery } from "@/store/rtk/auth/authSlice";
import { postsUser } from "@/store/rtk/post/helpers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { socket } = useSocket();

  const { data, isError } = useGetUserQuery(param.authId as string);

  const dispatch: AppDispatch = useDispatch();

  if (isError) {
    navigate("/404");
  }

  useEffect(() => {
    socket?.on("updated-post", (newPost: IPostDoc) => {
      dispatch(postsUser.update(newPost._id, newPost));
    });

    socket?.on("update-comment", (newPost: IPostDoc) => {
      dispatch(postsUser.update(newPost._id, newPost));
    });

    return () => {
      socket?.off("updated-post");
      socket?.off("update-comment");
    };
  }, [dispatch, socket]);

  if (!data) {
    return <ProfileSkeleton />;
  }

  return (
    <section className="max-w-[1200px] h-[calc(100%-70px)] md:h-full w-full">
      <ScrollArea className="h-full w-full">
        <div className="h-full w-full md:w-[95%] xl:w-full md:mx-auto mt-0 md:mt-6">
          <ProfileBar user={data as IFullUserDoc} />
          <div className="flex flex-col 2xl:flex-row gap-4 md:gap-0 2xl:gap-4 w-full h-full">
            <CardAreaProfile user={data as IFullUserDoc} />
            <ProfilePost />
          </div>
        </div>
      </ScrollArea>
    </section>
  );
};

export default Profile;
