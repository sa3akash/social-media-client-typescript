import CardAreaProfile from "@/components/profile/CardAreaProfile";
import ProfileBar from "@/components/profile/ProfileBar";
import ProfilePost from "@/components/profile/ProfilePost";
import ProfileSkeleton from "@/components/profile/skeleton/ProfileSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { IFullUserDoc } from "@/interfaces/auth.interface";
import { api } from "@/services/http/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<IFullUserDoc>();
  const [loading, setLoading] = useState(true);

  const param = useParams();
  const navigate = useNavigate();

  const { toast } = useToast();

  useEffect(() => {
    api.currentUser(param.authId as string, toast).then((res) => {
      if (res) {
        setUser(res);
      } else {
        return navigate("/404");
      }
      setLoading(false);
    });
  }, [navigate, param.authId, toast]);

  return loading ? (
    <ProfileSkeleton />
  ) : (
    user && (
      <div className="max-w-[1200px] h-[calc(100%-70px)] md:h-full w-full">
        <ScrollArea className="h-full w-full">
          <div className="h-full w-full md:w-[95%] xl:w-full md:mx-auto mt-0 md:mt-6">
            <ProfileBar user={user as IFullUserDoc} />
            <div className="flex flex-col 2xl:flex-row gap-4 md:gap-0 2xl:gap-4 w-full h-full">
              <CardAreaProfile user={user} />
              <ProfilePost />
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  );
};

export default Profile;
