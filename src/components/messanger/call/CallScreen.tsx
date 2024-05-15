import UserAvater from "@/components/common/UserAvater";
import { Button } from "@/components/ui/button";
import { IUserDoc } from "@/interfaces/auth.interface";
import { MicOff } from "lucide-react";
import { FC, useEffect, useRef } from "react";

interface Props {
  stream: MediaStream | null;
  won: boolean;
  user: IUserDoc | null;
  type: "audio" | "video";
}

const CallScreen: FC<Props> = ({ stream, user,type, won = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      // videoRef.current.autoplay = true;
      videoRef.current.play();
      if (won) {
        videoRef.current.muted = true;
      }
    }
  }, [stream, won]);

  if (!user?.name?.first) return null;

  return (
    <div className="flex-1 rounded-sm relative">
      <video ref={videoRef} className="w-full h-full bg-zinc-950 "></video>
      {type === 'audio' && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <UserAvater name={user?.name} avatarColor={user.avatarColor} 
          className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 border-[3px] lg:border-[5px]"
          src={user.profilePicture}
          style={{borderColor: user.avatarColor}}
          />
        </div>
      )}
      <div className="absolute bottom-4 flex items-center justify-between w-full px-4">
        <span className="tracking-[0.2px] text-sm shadow-sm">
          {user.name.first} {user.name.last} {won && "(you)"}
        </span>
        <Button variant="ghost" disabled>
          <MicOff />
        </Button>
      </div>
    </div>
  );
};

export default CallScreen;
