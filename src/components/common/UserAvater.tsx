import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NameDoc } from "@/interfaces/auth.interface";
import { cn } from "@/lib/utils";
import { Utils } from "@/services/utils/utils";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface Props {
  src?: string;
  className?: string;
  name: NameDoc;
  avatarColor?: string;
  fallbackClassName?: string;
  authId?: string;
  indicator?: string;
}

const UserAvater: React.FC<Props> = ({
  src,
  className,
  name,
  avatarColor,
  fallbackClassName,
  authId,
  indicator
}) => {
  const { onlineUsers } = useSelector((state: RootState) => state.auth);

  return (
    <div className="relative flex items-center justify-center h-full min-w-[35px]">
      <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
        <AvatarImage src={src} className="object-cover" />
        <AvatarFallback
          className={cn(
            "bg-primary text-primary-foreground font-semibold",
            fallbackClassName
          )}
          style={{
            background: `${avatarColor}`,
            color: `${avatarColor && "white"}`,
          }}
        >
          {Utils.getAvaterName(name?.first, name?.last)}
        </AvatarFallback>
      </Avatar>
      {onlineUsers.some((id) => id === authId) && (
        <div className={cn("absolute bottom-1 right-0 w-2 h-2 rounded-full bg-green-400",
        indicator
        )} />
      )}
    </div>
  );
};

export default UserAvater;
