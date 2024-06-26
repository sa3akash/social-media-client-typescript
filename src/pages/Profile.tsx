import CardAreaProfile from "@/components/profile/CardAreaProfile";
import ProfileBar from "@/components/profile/ProfileBar";
import ProfilePost from "@/components/profile/ProfilePost";
import ProfileSkeleton from "@/components/profile/skeleton/ProfileSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IFullUserDoc } from "@/interfaces/auth.interface";
import { currentUser } from "@/services/http";
import usePostSocket from "@/services/socket/usePostSocket";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams();
  const navigate = useNavigate();
  usePostSocket()


  const { data, isError } = useQuery({
    queryKey: ["profile", param.authId],
    queryFn: async() => {
      const {data} = await currentUser(param.authId as string);
      return data;
    },
    staleTime: 500,
  });

  if (isError) {
    navigate("/404");
  }

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
