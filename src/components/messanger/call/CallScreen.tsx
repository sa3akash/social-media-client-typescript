import UserAvater from "@/components/common/UserAvater";
import { Button } from "@/components/ui/button";
import { IUserDoc } from "@/interfaces/auth.interface";
import { cn } from "@/lib/utils";
import { MicOff } from "lucide-react";
import { useEffect, useRef, FC } from "react";

interface Props {
  stream: MediaStream | null;
  won: boolean;
  user: IUserDoc | null;
  type: "audio" | "video";
  talking?: boolean;
}

const CallScreen: FC<Props> = ({ stream, type, user, won, talking }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(error => {
                console.log("Error playing video:", error);
            });
            if (won) {
                videoRef.current.muted = true;
            }
        }
    };

    if (videoRef.current) {
        playVideo();
    }

    return () => {
        if (videoRef.current) {
            videoRef.current.srcObject = null;
            videoRef.current.pause();
        }
    };
}, [stream, won]);

  if (!user?.name?.first) return null;

  return (
    <div
      className={cn(
        "flex-1 rounded-sm relative border-[4px]",
        talking ? "border-green-700" : "border-transparent"
      )}
    >
      <video ref={videoRef} className="w-full h-full bg-zinc-950"></video>
      {type === "audio" && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-zinc-950">
          <UserAvater
            name={user?.name}
            avatarColor={user.avatarColor}
            className="w-16 h-16 md:w-24 md:h-24 lg:w-36 lg:h-36 border-[3px] lg:border-[5px]"
            src={user.profilePicture}
            style={{ borderColor: user.avatarColor }}
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
