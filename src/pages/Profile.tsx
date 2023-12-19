import CardAreaProfile from "@/components/profile/CardAreaProfile";
import ProfileBar from "@/components/profile/ProfileBar";
import ProfilePost from "@/components/profile/ProfilePost";
import { ScrollArea } from "@/components/ui/scroll-area";
import useEffectOnce from "@/hooks/useEffectOnece";
import { IFullUserDoc } from "@/interfaces/auth.interface";
import { api } from "@/services/http/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<IFullUserDoc>();
  const [loading, setLoading] = useState(false);

  const param = useParams();
  const navigate = useNavigate()

  useEffectOnce(async () => {
    setLoading(true);
    const userResponse = await api.currentUser(param.authId as string);
    if(!userResponse) return navigate('/404')
    setUser(userResponse);
    setLoading(false);
  });

  console.log(user, loading);

  return (
    <div className="max-w-[1200px] h-full w-full">
      <ScrollArea className="h-[95%] w-full">
        <div className="h-[calc(100%-224px)] w-full md:w-[95%] xl:w-full md:mx-auto mt-0 md:mt-6">
          <ProfileBar />
          <div className="flex flex-col 2xl:flex-row gap-4 md:gap-0 2xl:gap-4 w-full h-full">
            <CardAreaProfile />
            <ProfilePost />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Profile;
